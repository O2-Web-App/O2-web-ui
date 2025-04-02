import {Skeleton} from "@/components/ui/skeleton";

export default function SkeletonPurchaseHistory() {
    const skeletonSections = Array(3).fill(null);

    return (
        <div className={`w-full flex flex-col  space-y-5`}>
            {skeletonSections.map((_, index) => (
                <div key={index} className={`w-full flex flex-col gap-3`}>
                    <Skeleton className={`w-40 h-8 rounded-md`}/>

                    <div className={`flex flex-col p-5 bg-white rounded-2xl gap-3`}>
                        <div className={`flex justify-between`}>
                            <div className={`flex gap-3`}>
                                <Skeleton className={`w-20 h-8 rounded-md`}/>
                                <Skeleton className={`w-20 h-8 rounded-md`}/>
                            </div>
                            <Skeleton className={`w-20 h-8 rounded-md`}/>
                        </div>
                        <div className={`flex justify-between`}>
                            <div className={`flex gap-3`}>
                                <Skeleton className={`w-10 h-4 rounded-md`}/>
                                <Skeleton className={`w-40 h-4 rounded-md`}/>
                            </div>
                            <Skeleton className={`w-10 h-4 rounded-md`}/>
                        </div>
                    </div>
                    <div className={`flex flex-col p-5 bg-white rounded-2xl gap-3`}>
                        <div className={`flex justify-between`}>
                            <div className={`flex gap-3`}>
                                <Skeleton className={`w-20 h-8 rounded-md`}/>
                                <Skeleton className={`w-20 h-8 rounded-md`}/>
                            </div>
                            <Skeleton className={`w-20 h-8 rounded-md`}/>
                        </div>
                        <div className={`flex justify-between`}>
                            <div className={`flex gap-3`}>
                                <Skeleton className={`w-10 h-4 rounded-md`}/>
                                <Skeleton className={`w-40 h-4 rounded-md`}/>
                            </div>
                            <Skeleton className={`w-10 h-4 rounded-md`}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}