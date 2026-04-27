import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
}

const blogDir = path.join(process.cwd(), 'content/blog');

function getLocaleDir(locale: string) {
  const dir = path.join(blogDir, locale);
  if (fs.existsSync(dir)) return dir;
  return path.join(blogDir, 'en');
}

export function getAllPosts(locale: string): BlogPost[] {
  const dir = getLocaleDir(locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug: data.slug || filename.replace('.mdx', ''),
        title: data.title,
        description: data.description || '',
        date: data.date,
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(locale: string, slug: string): BlogPost | null {
  const posts = getAllPosts(locale);
  return posts.find((p) => p.slug === slug) || null;
}

export function getAllSlugs(locale: string): string[] {
  return getAllPosts(locale).map((p) => p.slug);
}
