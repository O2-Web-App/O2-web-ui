import {Skeleton} from "@/components/ui/skeleton";

export default function SkeletonRecommendationBlog() {

    return (
        <div className={` w-full `}>
            <div className={` w-full px-5 space-y-5`}>
                <Skeleton className={` w-60 h-10 rounded-md `}/>
                <div className={` flex flex-col gap-3`}>
                    <Skeleton className={` w-full h-[250px] rounded-md `}/>
                    <div className={` w-full space-y-3 pl-3`}>
                        <Skeleton className={` w-full h-8 rounded-md `}/>
                        <div className={`flex w-full gap-3`}>
                            <Skeleton className={` w-16 h-14 rounded-md `}/>
                            <div className={`flex flex-col w-full justify-between py-1`}>
                                <Skeleton className={` w-16 h-6 rounded-md `}/>
                                <div className={` flex gap-2 `}>
                                    <Skeleton className={` w-10 h-4 rounded-md `}/>
                                    <Skeleton className={` w-10 h-4 rounded-md `}/>
                                    <Skeleton className={` w-10 h-4 rounded-md `}/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}