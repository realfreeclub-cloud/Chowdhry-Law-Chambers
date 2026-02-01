export function Skeleton({ className }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-slate-200 rounded ${className}`} />
    );
}

export function AdminStatsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-32 flex flex-col justify-between">
                    <div className="flex justify-between">
                        <Skeleton className="w-10 h-10 rounded-lg" />
                        <Skeleton className="w-20 h-4" />
                    </div>
                    <Skeleton className="w-16 h-8" />
                </div>
            ))}
        </div>
    );
}

export function AdminTableSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between">
                <Skeleton className="w-32 h-6" />
                <Skeleton className="w-24 h-8" />
            </div>
            <div className="divide-y divide-slate-100">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Skeleton className="w-10 h-10 rounded-lg" />
                            <div className="space-y-2">
                                <Skeleton className="w-48 h-4" />
                                <Skeleton className="w-24 h-3" />
                            </div>
                        </div>
                        <Skeleton className="w-20 h-6 rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}
