"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Play, Newspaper, FileText, Share2, Globe } from "lucide-react"
import type { ContentIdea } from "@/lib/types"

interface IdeaCardProps {
  idea: ContentIdea
  index: number
}

export function IdeaCard({ idea, index }: IdeaCardProps) {
  const formatBadge = (format: string) => {
    const badges: Record<string, string> = {
      "YouTube video": "bg-red-500/10 text-red-700 dark:text-red-400",
      "Short video/Reel": "bg-pink-500/10 text-pink-700 dark:text-pink-400",
      "Blog post": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      "Podcast episode": "bg-purple-500/10 text-purple-700 dark:text-purple-400",
      Newsletter: "bg-green-500/10 text-green-700 dark:text-green-400",
    }
    return badges[format] || "bg-accent/10 text-accent-foreground"
  }

  const getSourceIcon = (sourceType: string) => {
    switch (sourceType) {
      case "video":
        return <Play className="w-4 h-4" />
      case "news":
        return <Newspaper className="w-4 h-4" />
      case "blog":
        return <FileText className="w-4 h-4" />
      case "social":
        return <Share2 className="w-4 h-4" />
      default:
        return <Globe className="w-4 h-4" />
    }
  }

  const getSourceLabel = (sourceType: string) => {
    const labels: Record<string, string> = {
      video: "Video",
      news: "News",
      blog: "Blog",
      social: "Social",
      other: "Source",
    }
    return labels[sourceType] || "Source"
  }

  return (
    <Card
      className="flex flex-col h-full hover:shadow-lg transition-all duration-300 overflow-hidden group animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Card Header with Index */}
      <div className="px-6 pt-6 pb-4 border-b border-border/40">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="text-xs font-semibold text-muted-foreground mb-2">IDEA #{index + 1}</div>
            <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-200">
              {idea.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-6 py-4 flex-1 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{idea.description}</p>

        {/* Format Badge */}
        <div>
          <Badge className={`${formatBadge(idea.format)} border-0`}>{idea.format}</Badge>
        </div>

        {/* Keywords */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Keywords</p>
          <div className="flex flex-wrap gap-2">
            {idea.keywords.map((keyword) => (
              <span
                key={keyword}
                className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Fact/Stat */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 space-y-2">
          <p className="text-xs font-semibold text-primary uppercase tracking-wide">Key Insight</p>
          <p className="text-sm text-foreground leading-relaxed">{idea.fact}</p>
        </div>
      </div>

      {/* Card Footer with Enhanced Citation */}
      <div className="px-6 py-4 border-t border-border/40 bg-muted/30 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-background border border-border/50">
              {getSourceIcon(idea.sourceType)}
              <span className="text-xs font-semibold text-foreground">{getSourceLabel(idea.sourceType)}</span>
            </div>
            {idea.sourceTitle && <span className="text-xs text-muted-foreground font-medium">{idea.sourceTitle}</span>}
          </div>
        </div>

        {/* Citation Link */}
        <a
          href={idea.citation}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-all duration-200 font-medium group/link w-full justify-between"
        >
          <span className="truncate">View Source</span>
          <ExternalLink className="w-3 h-3 flex-shrink-0 group-hover/link:translate-x-0.5 transition-transform duration-200" />
        </a>
      </div>
    </Card>
  )
}
