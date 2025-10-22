interface TripItemSkeletonProps {
    count?: number;
}

const TripItemSkeleton = ({ count = 3 }: TripItemSkeletonProps) => {
    return (
        <>
            {Array.from({ length: count }).map((_, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-300 p-4 shadow-lg animate-pulse mb-4">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <div className="h-5 bg-slate-200 rounded w-3/4 mb-2" />
                            <div className="h-4 bg-slate-200 rounded w-1/2" />
                        </div>
                        <div className="h-8 w-20 bg-slate-300 rounded" />
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-slate-200 my-3" />

                    {/* Content */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-slate-300" />
                        <div className="flex-1">
                            <div className="h-4 bg-slate-200 rounded w-2/3 mb-2" />
                            <div className="h-3 bg-slate-200 rounded w-1/3" />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center">
                        <div className="h-6 bg-slate-200 rounded w-32" />
                        <div className="h-9 w-20 bg-slate-300 rounded-lg" />
                    </div>
                </div>
            ))}
        </>
    );
};

export default TripItemSkeleton;