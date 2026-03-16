import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Only run auth middleware on admin and API routes.
     * All other routes skip the Supabase auth.getUser() network call.
     */
    '/admin/:path*',
    '/api/:path*',
  ],
};
