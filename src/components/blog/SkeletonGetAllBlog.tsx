import {Skeleton} from "@/components/ui/skeleton";

export default function SkeletonGetAllBlog() {
    return (
        <div className={` w-full mt-5`}>
            <div className={` w-full px-5 space-y-5`}>
                <Skeleton className={` w-40 h-10 rounded-md `}/>
                <div className={` w-full flex flex-col gap-5`}>

                    <div className={` flex gap-3`}>
                        <Skeleton className={` w-[150px] h-[100px] rounded-md `}/>
                        <div className={` w-full flex flex-col gap-3 justify-between py-1`}>
                            <div className={`flex w-full gap-2`}>
                                <Skeleton className={` w-full h-8 rounded-md `}/>
                                <Skeleton className={` w-full h-8 rounded-md `}/>
                                <Skeleton className={` w-full h-8 rounded-md `}/>
                            </div>
                            <div className={`flex w-full gap-1 `}>
                                <Skeleton className={` w-10 h-2 rounded-md `}/>
                                <Skeleton className={` w-10 h-2 rounded-md `}/>
                                <Skeleton className={` w-10 h-2 rounded-md `}/>
                                <Skeleton className={` w-10 h-2 rounded-md `}/>
                            </div>
                            <Skeleton className={` w-[150px] h-8 rounded-md `}/>
                        </div>
                    </div>

                    <div className={` flex gap-3`}>
                        <Skeleton className={` w-[150px] h-[100px] rounded-md `}/>
                        <div className={` w-full flex flex-col gap-3 justify-between py-1`}>
                            <div className={`flex w-full gap-2`}>
                                <Skeleton className={` w-full h-8 rounded-md `}/>
                                <Skeleton className={` w-full h-8 rounded-md `}/>
                                <Skeleton className={` w-full h-8 rounded-md `}/>
                            </div>
                            <div className={`flex w-full gap-1 `}>
                                <Skeleton className={` w-10 h-2 rounded-md `}/>
                                <Skeleton className={` w-10 h-2 rounded-md `}/>
                                <Skeleton className={` w-10 h-2 rounded-md `}/>
                                <Skeleton className={` w-10 h-2 rounded-md `}/>
                            </div>
                            <Skeleton className={` w-[150px] h-8 rounded-md `}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}