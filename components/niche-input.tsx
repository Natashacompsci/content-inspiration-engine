"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles } from "lucide-react"

interface NicheInputProps {
  onSearch: (niche: string) => void
  isLoading: boolean
}

export function NicheInput({ onSearch, isLoading }: NicheInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input.trim())
    }
  }

  const suggestedNiches = [
    "AI tools for productivity",
    "Sustainable fashion",
    "Plant-based recipes",
    "Web3 for beginners",
    "Mental health & wellness",
  ]

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-2">
          <Input
            placeholder="Enter your content niche (e.g., 'AI art', 'sustainable travel', 'FinTech')"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="text-base h-12"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="gap-2 h-12 px-6 transition-all duration-200"
          >
            <Sparkles className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Generating..." : "Generate Ideas"}
          </Button>
        </div>
      </form>

      {/* Suggested Niches */}
      <div className="mt-8">
        <p className="text-sm text-muted-foreground mb-3">Try a niche:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedNiches.map((niche) => (
            <button
              key={niche}
              onClick={() => {
                setInput(niche)
                onSearch(niche)
              }}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg border border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-sm text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {niche}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
