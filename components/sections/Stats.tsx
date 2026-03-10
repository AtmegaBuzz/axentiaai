const stats = [
    { value: 500, suffix: '+', label: 'Consultants Trained' },
    { value: 30, suffix: '+', label: 'Years Experience' },
    { value: 10, suffix: '+', label: 'Countries' },
    { value: 100, suffix: '+', label: 'Enterprise Projects' },
];

export function Stats() {
    return (
        <section className="py-16 md:py-24 bg-white border-b border-slate-200">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="text-center"
                        >
                            <div className="text-6xl md:text-7xl font-black text-brand-500 tracking-tight">
                                {stat.value}{stat.suffix}
                            </div>
                            <p className="text-slate-600 font-medium mt-3 text-lg">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
