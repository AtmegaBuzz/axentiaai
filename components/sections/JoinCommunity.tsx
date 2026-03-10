import { Button } from '../ui/Button';
import { Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function JoinCommunity() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8"
                    >
                        <Users className="w-5 h-5 text-accent-300" />
                        <span className="text-white/90 font-medium text-sm">Join 500+ consultants</span>
                    </div>

                    <h2
                        className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6"
                    >
                        Join our community
                    </h2>
                    <p
                        className="text-xl text-white/70 mb-10 max-w-xl mx-auto"
                    >
                        Connect with fellow consultants, share knowledge, and grow together in our forum.
                    </p>

                    <div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/forum">
                            <Button size="lg" className="bg-white text-brand-700 hover:bg-slate-100 font-bold shadow-lg gap-2">
                                Visit Forum <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                            Subscribe to Newsletter
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
