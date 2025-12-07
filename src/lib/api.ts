import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const contentDirectory = join(process.cwd(), 'content');

export function getPostSlugs(type: string) {
  const dir = join(contentDirectory, type);
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir);
}

export function getPostBySlug(type: string, slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(contentDirectory, type, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${type}/${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(type: string, fields: string[] = []) {
  const slugs = getPostSlugs(type);
  const posts = slugs
    .map((slug) => getPostBySlug(type, slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
