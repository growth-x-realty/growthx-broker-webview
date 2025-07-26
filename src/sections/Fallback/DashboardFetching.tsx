const DashboardFetching = () => {
    return (
        <div className="py-4 px-3 space-y-4 animate-pulse">
            {/* Title Skeleton */}
            <div className="space-y-1">
                <div className="h-6 w-2/3 bg-slate-300 rounded" />
                <div className="h-4 w-1/2 bg-slate-200 rounded" />
            </div>

            {/* Filter/Search Skeleton */}
            <div className="h-10 w-full bg-slate-200 rounded-md" />

            {/* Tab Skeleton */}
            <div className="flex gap-2">
                <div className="h-10 w-1/3 bg-slate-200 rounded-md" />
                <div className="h-10 w-1/3 bg-slate-200 rounded-md" />
            </div>

            {/* Property Cards Skeleton */}
            {[1, 2, 3].map((_, i) => (
                <div key={i} className="p-3 border shadow-sm bg-slate-100 rounded-md space-y-2">
                    <div className="flex gap-3">
                        <div className="w-[9rem] h-[6rem] bg-slate-300 rounded-md" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-3/4 bg-slate-300 rounded" />
                            <div className="h-3 w-2/3 bg-slate-200 rounded" />
                            <div className="h-3 w-1/3 bg-slate-200 rounded" />
                        </div>
                    </div>
                    <div className="h-3 w-1/2 bg-slate-300 rounded" />

                    <div className="flex justify-between items-center pt-1.5">
                        <div className="space-y-1">
                            <div className="h-3 w-24 bg-slate-300 rounded" />
                            <div className="h-3 w-20 bg-slate-300 rounded" />
                        </div>
                        <div className="h-8 w-18 bg-slate-200 rounded-full" />
                    </div>

                    <div className="flex justify-around pt-2 gap-2">
                        <div className="h-8 w-28 bg-slate-300 rounded-md" />
                        <div className="h-8 w-36 bg-slate-300 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardFetching;