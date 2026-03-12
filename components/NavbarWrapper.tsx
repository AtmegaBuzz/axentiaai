'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { MingersFooter } from './MingersFooter';

export function NavbarWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith('/admin');

    return (
        <>
            {!isAdmin && <Navbar />}
            {children}
            {!isAdmin && <MingersFooter />}
        </>
    );
}
