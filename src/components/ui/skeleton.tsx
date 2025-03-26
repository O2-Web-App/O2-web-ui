import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
<<<<<<< HEAD
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
=======
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
>>>>>>> 7110895f826f0e6575c3021ee4ce2270cf3e9aef
      {...props}
    />
  )
}

export { Skeleton }
