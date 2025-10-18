import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Import the route handler
import { POST } from '../app/api/generate-ideas/route'

const mockResponseText = JSON.stringify([
  { title: 'A', description: 'd', format: 'Blog post', keywords: ['a','b','c'], fact: 'x', citation: 'https://example.com/1', sourceType: 'news', sourceTitle: 'Example', sourceOrigin: 'example.com' },
  { title: 'B', description: 'd', format: 'YouTube video', keywords: ['a','b','c'], fact: 'x', citation: 'https://example.com/2', sourceType: 'video', sourceTitle: 'YouTube', sourceOrigin: 'youtube.com' },
  { title: 'C', description: 'd', format: 'Short video/Reel', keywords: ['a','b','c'], fact: 'x', citation: 'https://example.com/3', sourceType: 'social', sourceTitle: 'TikTok', sourceOrigin: 'tiktok.com' },
  { title: 'D', description: 'd', format: 'Podcast episode', keywords: ['a','b','c'], fact: 'x', citation: 'https://example.com/4', sourceType: 'blog', sourceTitle: 'Medium', sourceOrigin: 'medium.com' },
  { title: 'E', description: 'd', format: 'Newsletter', keywords: ['a','b','c'], fact: 'x', citation: 'https://example.com/5', sourceType: 'other', sourceTitle: 'Other', sourceOrigin: 'other.com' }
])

const mockPerplexityPayload = {
  choices: [
    {
      message: {
        content: mockResponseText,
      },
    },
  ],
}

describe('generate-ideas route', () => {
  let origFetch: any

  beforeEach(() => {
    origFetch = globalThis.fetch
    globalThis.fetch = vi.fn(async () => ({ ok: true, json: async () => mockPerplexityPayload }))
    process.env.PERPLEXITY_API_KEY = 'test-key'
    // Mock static Response.json helper used in Next's server runtime
    if (!globalThis.Response.json) {
      // preserve original Response if present
      const NativeResponse = globalThis.Response
      globalThis.Response = class extends (NativeResponse || class {}) {
        static json(body: unknown, init?: Record<string, any>) {
          return new (NativeResponse || globalThis.Response)(JSON.stringify(body), init)
        }
      }
    }
  })

  afterEach(() => {
    globalThis.fetch = origFetch
    delete process.env.PERPLEXITY_API_KEY
  })

  it('returns 5 ideas when given a valid niche', async () => {
    const request = new Request('https://example.com', { method: 'POST', body: JSON.stringify({ niche: 'vegan baking' }) })
    const res = await POST(request)
    const data = await res.json()
    expect(data.ideas).toBeDefined()
    expect(Array.isArray(data.ideas)).toBe(true)
    expect(data.ideas.length).toBe(5)
    expect(data.ideas[0].title).toBe('A')
  })
})
