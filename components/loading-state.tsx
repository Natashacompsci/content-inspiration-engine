"use client"

import { Card } from "@/components/ui/card"

export function LoadingState() {
  return (
    <div className="mt-12 animate-in fade-in duration-300">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mb-2" />
        <div className="h-4 w-96 bg-muted rounded-lg animate-pulse" />
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="flex flex-col h-full overflow-hidden">
            {/* Card Header Skeleton */}
            <div className="px-6 pt-6 pb-4 border-b border-border/40 space-y-3">
              <div className="h-3 w-16 bg-muted rounded animate-pulse" />
              <div className="h-6 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
            </div>

            {/* Card Body Skeleton */}
            <div className="px-6 py-4 flex-1 space-y-4">
              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
              </div>

              {/* Format Badge */}
              <div className="h-8 w-28 bg-muted rounded-full animate-pulse" />

              {/* Keywords */}
              <div className="space-y-2">
                <div className="h-3 w-20 bg-muted rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
                  <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
                  <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
                </div>
              </div>

              {/* Fact Box */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 space-y-2">
                <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Card Footer Skeleton */}
            <div className="px-6 py-4 border-t border-border/40 bg-muted/30">
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
