export async function POST(request: Request) {
  try {
    const { niche } = await request.json()

    if (!niche || typeof niche !== "string") {
      return Response.json({ error: "Niche is required" }, { status: 400 })
    }

    const apiKey = process.env.PERPLEXITY_API_KEY
    if (!apiKey) {
      return Response.json({ error: "Perplexity API key not configured" }, { status: 500 })
    }

    const systemPrompt = `You are an advanced AI-powered content strategist and research analyst.
Your goal is to help content creators discover credible, trending, and actionable content ideas tailored to any niche.

For the given niche, generate 5 content idea cards with these fields:
- title: A catchy, creative headline for the idea
- description: One line explaining why this idea is interesting, timely, or valuable
- format: The most suitable content type (choose one: "YouTube video", "Short video/Reel", "Blog post", "Podcast episode", "Newsletter")
- keywords: A list of 3 hashtags or keywords for discoverability
- fact: A current, specific data point, quote, or stat backing up the idea
- citation: A direct, recent, and trustworthy URL or reference for the fact
- sourceType: The type of source (choose one: "video" for viral videos/YouTube, "news" for news articles/press releases, "blog" for blog posts, "social" for social media posts/TikTok/Instagram, "other" for other sources)
- sourceTitle: The title or name of the source (e.g., "TikTok", "YouTube", "CNN", "Forbes", "Twitter/X")
- sourceOrigin: The domain or platform name (e.g., "tiktok.com", "youtube.com", "cnn.com")

CRITICAL REQUIREMENTS:
1. PRIORITIZE MULTIMEDIA SOURCES: When searching for inspiration and supporting sources, include viral videos, popular social posts, news clips, and trending content—don't limit citations to blogs/articles. If a video is the source of a trend, link to it. If a social media post went viral, cite it.
2. ENSURE UNIQUE SOURCES: Each of the 5 ideas MUST have a DIFFERENT source URL and origin. Do NOT repeat any URLs or platforms across the 5 cards. Vary the sources across different platforms and media types.
3. DEDUPLICATE: Filter out duplicate sources before generating ideas. Each card should reference a distinct, non-overlapping source.

Return ONLY a valid JSON array with exactly 5 objects. No markdown, no extra text.
Example format:
[
  {
    "title": "...",
    "description": "...",
    "format": "...",
    "keywords": ["...", "...", "..."],
    "fact": "...",
    "citation": "...",
    "sourceType": "video",
    "sourceTitle": "YouTube",
    "sourceOrigin": "youtube.com"
  }
]`

    const userPrompt = `Generate 5 trending content ideas for the niche: "${niche}". 
Focus on current trends, recent news, viral videos, popular social posts, and what's being discussed online right now.

IMPORTANT: 
- PRIORITIZE multimedia sources: viral videos, TikTok trends, Instagram Reels, YouTube shorts, news clips, and social media posts over traditional blogs.
- ENSURE each of the 5 ideas references a DIFFERENT source. No duplicate URLs or platforms across the cards.
- Vary sources across different platforms: mix videos, social posts, news articles, and other media types.
- Include the sourceTitle (platform name) and sourceOrigin (domain) for each citation.

Ensure all facts and citations are realistic and based on current information.
Return ONLY the JSON array, nothing else.`

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Perplexity API error:", errorData)
      throw new Error(`Perplexity API error: ${errorData.error?.message || response.statusText}`)
    }

    const data = await response.json()
    const text = data.choices[0].message.content

    // Parse the JSON response
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      throw new Error("Invalid response format from Perplexity")
    }

    const ideas = JSON.parse(jsonMatch[0])

    // Validate the response structure
    if (!Array.isArray(ideas) || ideas.length !== 5) {
      throw new Error("Expected 5 ideas")
    }

    const citationUrls = ideas.map((idea) => idea.citation)
    const uniqueCitations = new Set(citationUrls)
    if (uniqueCitations.size !== 5) {
      console.warn("Warning: Not all sources are unique, but proceeding with response")
    }

    return Response.json({ ideas })
  } catch (error) {
    console.error("Error generating ideas:", error)
    return Response.json({ error: "Failed to generate ideas" }, { status: 500 })
  }
}
