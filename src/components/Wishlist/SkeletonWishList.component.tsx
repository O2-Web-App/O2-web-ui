import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonWishListComponent() {
    const skeletonItems = [1, 2 , 3 ,4 ,5]; // Array to map over

    return (
        <div className={`w-full flex flex-col gap-5 my-5`}>
            {skeletonItems.map((item, index) => (
                <div key={index} className={`w-full bg-white p-2`}>
                    <div className={`w-full flex justify-end gap-3`}>
                        <Skeleton className={`h-7 w-7 rounded-full`} />
                        <Skeleton className={`h-7 w-7 rounded-full`} />
                    </div>
                    <div className={`w-full flex justify-end gap-3`}>
                        <Skeleton className={`h-[80px] w-[100px]`} />
                        <div className={`w-full flex flex-col gap-2`}>
                            <Skeleton className={`h-5 w-[200px]`} />
                            <Skeleton className={`h-5 w-[230px]`} />
                            <div className={`w-full flex justify-between`}>
                                <div className={`w-full flex gap-2`}>
                                    <Skeleton className={`h-5 w-10`} />
                                    <Skeleton className={`h-5 w-10`} />
                                </div>
                                <Skeleton className={`h-7 w-7 rounded-full`} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}