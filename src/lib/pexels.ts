export async function getPexelsImage(keyword: string): Promise<string> {
  const key = process.env.PEXELS_API_KEY?.trim();
  if (!key) return "/placeholder.jpg";
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=1&orientation=square`,
      { headers: { Authorization: key }, signal: AbortSignal.timeout(4000) }
    );
    if (!res.ok) return "/placeholder.jpg";
    const data = await res.json();
    const photo = data.photos?.[0];
    return photo?.src?.large || photo?.src?.medium || "/placeholder.jpg";
  } catch {
    return "/placeholder.jpg";
  }
}
