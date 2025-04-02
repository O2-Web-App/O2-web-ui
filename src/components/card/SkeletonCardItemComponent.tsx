import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCardItemComponent() {
    const skeletonItems = Array(6).fill(0);

    return (
        <div className={`w-full flex flex-col gap-4 my-5`}>
            {skeletonItems.map((_, index) => (
                <div key={index} className={`w-full flex gap-5`}>
                    <Skeleton className={`h-[100px] w-[150px]`} />
                    <div className={`w-full flex flex-col gap-2 py-1`}>
                        <Skeleton className={`h-5 w-[200px]`} />
                        <Skeleton className={`h-5 w-[200px]`} />
                        <div className={`w-full flex gap-3`}>
                            <Skeleton className={`h-3 w-[80px]`} />
                            <Skeleton className={`h-3 w-[80px]`} />
                        </div>
                        <div className={`w-full flex gap-1`}>
                            <Skeleton className={`h-5 w-5 rounded-full`} />
                            <Skeleton className={`h-5 w-7`} />
                            <Skeleton className={`h-5 w-5 rounded-full`} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}