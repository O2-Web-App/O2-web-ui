import {Skeleton} from "@/components/ui/skeleton";

export default function SkeletonBlogDetail(){

    return(
        <div className={` w-full mt-3`}>
            <div className={` w-full flex flex-col gap-5`}>
                <div className={` w-full flex justify-between `}>
                    <div className={` flex gap-3 pl-4`}>
                        <Skeleton className={` w-[70px] h-8 rounded-md `}/>
                        <Skeleton className={` w-[70px] h-8 rounded-md `}/>
                    </div>
                    <div>
                        <Skeleton className={` w-40 h-4 rounded-md `}/>
                    </div>
                </div>
                <Skeleton className={` w-full h-60  `}/>
                <div className={` flex gap-3 `}>
                    <Skeleton className={` w-[100px] h-[100px] rounded-md `}/>
                    <Skeleton className={` w-[100px] h-[100px] rounded-md `}/>
                    <Skeleton className={` w-[100px] h-[100px] rounded-md `}/>
                    <Skeleton className={` w-[100px] h-[100px] rounded-md `}/>
                </div>
                <div className={` w-full px-5 space-y-1`}>
                    <Skeleton className={` w-full h-10 rounded-md `}/>
                    <Skeleton className={` w-full h-10 rounded-md `}/>
                </div>
                <div className={`flex w-full px-5 gap-3 justify-between items-center`}>
                    <div className={` flex gap-3`}>
                        <Skeleton className={` w-12 h-12 rounded-md `}/>
                        <div className={` flex flex-col justify-between py-1`}>
                            <Skeleton className={` w-12 h-4 rounded-md `}/>
                            <Skeleton className={` w-20 h-4 rounded-md `}/>
                        </div>
                    </div>

                    <div className={` flex gap-3`}>
                        <Skeleton className={` w-7 h-7 rounded-md `}/>
                        <Skeleton className={` w-7 h-7 rounded-md `}/>
                        <Skeleton className={` w-7 h-7 rounded-md `}/>
                    </div>

                </div>
                <div className={` w-full px-5 space-y-1`}>
                    <Skeleton className={` w-full h-4 rounded-md `}/>
                    <Skeleton className={` w-full h-4 rounded-md `}/>
                    <Skeleton className={` w-full h-4 rounded-md `}/>
                    <Skeleton className={` w-full h-4 rounded-md `}/>
                    <Skeleton className={` w-full h-4 rounded-md `}/>
                    <Skeleton className={` w-full h-4 rounded-md `}/>
                    <Skeleton className={` w-full h-4 rounded-md `}/>
                    <Skeleton className={` w-full h-4 rounded-md `}/>
                </div>

            </div>

        </div>
    )
}