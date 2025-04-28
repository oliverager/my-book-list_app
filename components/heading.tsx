import { cn } from "@/lib/utils"
import type * as React from "react"

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

export function Heading({ children, level = 1, className, ...props }: HeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Component
      className={cn(
        "font-bold text-black",
        level === 1 && "text-2xl",
        level === 2 && "text-xl",
        level === 3 && "text-lg",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
