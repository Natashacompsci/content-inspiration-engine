"use client"

import { useState } from "react"
import { NicheInput } from "./niche-input"
import { IdeaCardsGrid } from "./idea-cards-grid"
import { LoadingState } from "./loading-state"
import type { ContentIdea } from "@/lib/types"

export function ContentInspirationEngine() {
  const [ideas, setIdeas] = useState<ContentIdea[]>([])
  const [loading, setLoading] = useState(false)
  const [niche, setNiche] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (selectedNiche: string) => {
    setNiche(selectedNiche)
    setLoading(true)
    setIdeas([])
    setError(null)

    try {
      const response = await fetch("/api/generate-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: selectedNiche }),
      })

      if (!response.ok) throw new Error("Failed to generate ideas")

      const data = await response.json()
      setIdeas(data.ideas)
    } catch (error) {
      console.error("Error generating ideas:", error)
      setError("Failed to generate ideas. Please try again.")
      setIdeas([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-foreground">Content Inspiration Engine</h1>
            <p className="text-muted-foreground">Discover trending topics and creative angles for your niche</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <NicheInput onSearch={handleSearch} isLoading={loading} />

        {loading && <LoadingState />}

        {error && (
          <div className="mt-12 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {!loading && ideas.length > 0 && (
          <div className="mt-12 animate-in fade-in duration-300">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Trending Ideas for <span className="text-primary">{niche}</span>
              </h2>
              <p className="text-muted-foreground">5 fresh content angles based on current trends and discussions</p>
            </div>
            <IdeaCardsGrid ideas={ideas} />
          </div>
        )}

        {!loading && ideas.length === 0 && niche && !error && (
          <div className="mt-12 text-center py-12">
            <p className="text-muted-foreground text-lg">Enter a niche to discover trending content ideas</p>
          </div>
        )}
      </div>
    </div>
  )
}
