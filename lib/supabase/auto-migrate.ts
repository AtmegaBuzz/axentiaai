import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/prisma';

/**
 * Verifies database connectivity and ensures the admin user exists.
 * Called automatically on app startup via the instrumentation hook.
 */
export async function runMigrations() {
  // 1. Verify DB connection via Prisma
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('[db-setup] Database connected.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[db-setup] Database connection failed: ${message}`);
  }

  // 2. Ensure admin auth user exists (Supabase Auth)
  await ensureAdminUser();
}

async function ensureAdminUser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!url || !serviceRoleKey || !adminEmail) {
    console.log('[db-setup] Skipping admin user check (missing SUPABASE_SERVICE_ROLE_KEY or ADMIN_EMAIL).');
    return;
  }

  const adminClient = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: { users } } = await adminClient.auth.admin.listUsers();
  const exists = users?.some((u) => u.email === adminEmail);

  if (exists) {
    console.log(`[db-setup] Admin user ${adminEmail} ready.`);
    return;
  }

  if (!adminPassword) {
    console.warn('[db-setup] ADMIN_PASSWORD not set, cannot create admin user.');
    return;
  }

  const { error } = await adminClient.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,
  });

  if (error) {
    console.error(`[db-setup] Failed to create admin user: ${error.message}`);
  } else {
    console.log(`[db-setup] Admin user ${adminEmail} created.`);
  }
}
