import GhostContentAPI from '@tryghost/content-api';
import getConfig from 'next/config';

// Get runtime config (works with Coolify ENV variables)
const { serverRuntimeConfig } = getConfig() || { serverRuntimeConfig: {} };

// Initialize Ghost API client with fallback to process.env
const ghostUrl = serverRuntimeConfig.ghostUrl || process.env.GHOST_URL || '';
const ghostKey = serverRuntimeConfig.ghostApiKey || process.env.GHOST_CONTENT_API_KEY || '';

// Log configuration status (helpful for debugging in Coolify)
if (typeof window === 'undefined') {
  if (!ghostUrl || !ghostKey) {
    console.warn('[Ghost CMS] Credentials not configured. URL:', ghostUrl ? 'set' : 'missing', 'Key:', ghostKey ? 'set' : 'missing');
  } else {
    console.log('[Ghost CMS] Initialized with URL:', ghostUrl);
  }
}

// Create client only if credentials are available
export const ghostClient = ghostUrl && ghostKey 
  ? new GhostContentAPI({
      url: ghostUrl,
      key: ghostKey,
      version: 'v5.0',
    })
  : null;

// Types
export interface GhostPost {
  id: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  published_at: string;
  updated_at: string;
  tags: GhostTag[];
  authors: GhostAuthor[];
  reading_time: number;
}

export interface GhostTag {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface GhostAuthor {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  profile_image: string | null;
}

// Helper to check if Ghost is configured
export function isGhostConfigured(): boolean {
  return !!ghostClient;
}

// Fetch posts
export async function getPosts(options?: {
  limit?: number;
  page?: number;
  tag?: string;
  include?: string[];
}): Promise<GhostPost[]> {
  if (!ghostClient) {
    console.warn('[Ghost CMS] Client not initialized, returning empty array');
    return [];
  }
  
  try {
    const posts = await ghostClient.posts.browse({
      limit: options?.limit || 10,
      page: options?.page || 1,
      filter: options?.tag ? `tag:${options.tag}` : undefined,
      include: ['tags', 'authors'],
    });
    return posts as GhostPost[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  if (!ghostClient) {
    console.warn('[Ghost CMS] Client not initialized, returning null');
    return null;
  }
  
  try {
    const post = await ghostClient.posts.read(
      { slug },
      { include: ['tags', 'authors'] }
    );
    return post as GhostPost;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Fetch tags
export async function getTags(): Promise<GhostTag[]> {
  if (!ghostClient) {
    return [];
  }
  
  try {
    const tags = await ghostClient.tags.browse({ limit: 'all' });
    return tags as GhostTag[];
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

// Fetch authors
export async function getAuthors(): Promise<GhostAuthor[]> {
  if (!ghostClient) {
    return [];
  }
  
  try {
    const authors = await ghostClient.authors.browse({ limit: 'all' });
    return authors as GhostAuthor[];
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
}
