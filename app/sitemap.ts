import { MetadataRoute } from 'next';

const base = 'https://guidesoftitsolutions.com';

const staticPages: MetadataRoute.Sitemap = [
  { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${base}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${base}/features`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${base}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${base}/testimonials`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${base}/booking`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${base}/partner`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${base}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${base}/lms`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${base}/technology`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${base}/process`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${base}/ai-tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Try to fetch dynamic blog posts
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${base}/api/sitemap-data`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      blogEntries = (data.posts || []).map((post: { slug: string; updatedAt: string }) => ({
        url: `${base}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch {
    // Sitemap still works without dynamic data
  }

  return [...staticPages, ...blogEntries];
}
