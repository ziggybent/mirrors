import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Type definitions
export interface ContentMetadata {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  downloadable?: boolean;
}

export interface ContentItem extends ContentMetadata {
  slug: string;
  content: string;
}

// Base directory for content
const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Get all content items of a specific type
 * @param type - The content type (mirrors, field-notes, vanitas, resources, news)
 * @returns Array of content items with metadata and HTML content
 */
export async function getContentByType(type: string): Promise<ContentItem[]> {
  const typeDirectory = path.join(contentDirectory, type);

  // Check if directory exists
  if (!fs.existsSync(typeDirectory)) {
    return [];
  }

  // Get all markdown files
  const fileNames = fs.readdirSync(typeDirectory).filter(
    (fileName) => fileName.endsWith('.md')
  );

  // Parse each file
  const allContent = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      return getContentItem(type, slug);
    })
  );

  // Sort by date (newest first)
  return allContent
    .filter((item): item is ContentItem => item !== null)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
}

/**
 * Get a single content item by type and slug
 * @param type - The content type (mirrors, field-notes, vanitas, resources, news)
 * @param slug - The slug of the content item
 * @returns Content item with metadata and HTML content, or null if not found
 */
export async function getContentItem(
  type: string,
  slug: string
): Promise<ContentItem | null> {
  try {
    const typeDirectory = path.join(contentDirectory, type);
    const fullPath = path.join(typeDirectory, `${slug}.md`);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    // Read the file
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse frontmatter
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    // Return structured data
    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      image: data.image || '',
      downloadable: data.downloadable,
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error reading content item ${type}/${slug}:`, error);
    return null;
  }
}

/**
 * Get all slugs for a specific content type (for dynamic routes)
 * @param type - The content type (mirrors, field-notes, vanitas, resources, news)
 * @returns Array of slugs
 */
export function getAllSlugs(type: string): string[] {
  const typeDirectory = path.join(contentDirectory, type);

  // Check if directory exists
  if (!fs.existsSync(typeDirectory)) {
    return [];
  }

  // Get all markdown files
  const fileNames = fs.readdirSync(typeDirectory).filter(
    (fileName) => fileName.endsWith('.md')
  );

  // Return slugs (filenames without .md extension)
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
}

/**
 * Get metadata only (without content) for all items of a type
 * Useful for listing pages where full content is not needed
 * @param type - The content type (mirrors, field-notes, vanitas, resources, news)
 * @returns Array of content metadata
 */
export function getContentMetadata(type: string): (ContentMetadata & { slug: string })[] {
  const typeDirectory = path.join(contentDirectory, type);

  // Check if directory exists
  if (!fs.existsSync(typeDirectory)) {
    return [];
  }

  // Get all markdown files
  const fileNames = fs.readdirSync(typeDirectory).filter(
    (fileName) => fileName.endsWith('.md')
  );

  // Parse frontmatter only
  const allMetadata = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(typeDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      image: data.image || '',
      downloadable: data.downloadable,
    };
  });

  // Sort by date (newest first)
  return allMetadata.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}
