"use client"

import { IdeaCard } from "./idea-card"
import type { ContentIdea } from "@/lib/types"

interface IdeaCardsGridProps {
  ideas: ContentIdea[]
}

export function IdeaCardsGrid({ ideas }: IdeaCardsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ideas.map((idea, index) => (
        <IdeaCard key={index} idea={idea} index={index} />
      ))}
    </div>
  )
}
