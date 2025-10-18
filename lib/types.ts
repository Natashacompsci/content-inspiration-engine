export interface ContentIdea {
  title: string
  description: string
  format: string
  keywords: string[]
  fact: string
  citation: string
  sourceType: "video" | "news" | "blog" | "social" | "other"
  sourceTitle?: string
  sourceOrigin?: string
}
