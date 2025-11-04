# Typography System

A complete typography system based on OpenAI's design principles using the Inter font family.

## Overview

This typography system provides a locked, consistent set of text styles that prevent deviation from the design standards. All components are built with TypeScript and React, and use Tailwind CSS for styling.

## Font Family

The system uses **Inter** as the primary typeface, loaded from Google Fonts with the following configuration:

```typescript
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
```

## Typography Scale

### Display Sizes

Large, attention-grabbing text for hero sections and major headings.

| Size | Font Size | Line Height | Font Weight | Class |
|------|-----------|-------------|-------------|-------|
| Display 2XL | 72px | 90px | 600 | `text-display-2xl` |
| Display XL | 60px | 72px | 600 | `text-display-xl` |
| Display LG | 48px | 60px | 600 | `text-display-lg` |
| Display MD | 36px | 44px | 600 | `text-display-md` |

### Headings

Semantic heading styles for document structure.

| Size | Font Size | Line Height | Font Weight | Class |
|------|-----------|-------------|-------------|-------|
| H1 | 30px | 38px | 600 | `text-h1` |
| H2 | 24px | 32px | 600 | `text-h2` |
| H3 | 20px | 28px | 600 | `text-h3` |
| H4 | 18px | 26px | 600 | `text-h4` |

### Body Text

Content and interface text in various sizes.

| Size | Font Size | Line Height | Font Weight | Class |
|------|-----------|-------------|-------------|-------|
| Body XL | 20px | 32px | 400 | `text-body-xl` |
| Body LG | 18px | 28px | 400 | `text-body-lg` |
| Body (Default) | 16px | 24px | 400 | `text-body` |
| Body SM | 14px | 20px | 400 | `text-body-sm` |
| Body XS | 12px | 16px | 400 | `text-body-xs` |

## Components

### Display Component

Used for large, impactful text like hero headlines.

```tsx
import { Display } from '@/components/typography';

// Usage
<Display size="2xl">Welcome to ZIGGY BENT</Display>
<Display size="xl" as="h1">Large Headline</Display>
<Display size="lg">Medium Headline</Display>
<Display size="md">Small Headline</Display>
```

**Props:**
- `size`: `'2xl' | 'xl' | 'lg' | 'md'` (required)
- `children`: React.ReactNode (required)
- `className`: string (optional)
- `as`: `'h1' | 'h2' | 'h3' | 'div' | 'p'` (optional, default: 'h1')

### Heading Components

Semantic heading elements with predefined styles.

```tsx
import { H1, H2, H3, H4 } from '@/components/typography';

// Usage
<H1>Main Page Title</H1>
<H2>Section Heading</H2>
<H3>Subsection Heading</H3>
<H4>Minor Heading</H4>
```

**Props (all heading components):**
- `children`: React.ReactNode (required)
- `className`: string (optional)

### Body Component

Flexible text component for all body content.

```tsx
import { Body } from '@/components/typography';

// Usage
<Body size="xl">Large introductory text</Body>
<Body size="lg">Slightly larger text</Body>
<Body>Default body text (16px)</Body>
<Body size="sm">Small text for captions</Body>
<Body size="xs">Extra small text for fine print</Body>

// With custom element
<Body size="lg" as="span">Inline text</Body>
```

**Props:**
- `size`: `'xl' | 'lg' | 'default' | 'sm' | 'xs'` (optional, default: 'default')
- `children`: React.ReactNode (required)
- `className`: string (optional)
- `as`: `'p' | 'span' | 'div'` (optional, default: 'p')

## Usage Examples

### Hero Section

```tsx
import { Display, Body } from '@/components/typography';

export default function Hero() {
  return (
    <section className="py-20">
      <Display size="2xl" className="text-gray-900">
        Build amazing products
      </Display>
      <Body size="xl" className="mt-4 text-gray-600">
        A complete design system for modern web applications
      </Body>
    </section>
  );
}
```

### Article Layout

```tsx
import { H1, H2, H3, Body } from '@/components/typography';

export default function Article() {
  return (
    <article>
      <H1 className="text-gray-900">Article Title</H1>
      <Body size="sm" className="text-gray-500 mt-2">
        Published on January 1, 2025
      </Body>

      <Body className="mt-6 text-gray-700">
        This is the introduction paragraph with default body text.
      </Body>

      <H2 className="mt-12 text-gray-900">Section Heading</H2>
      <Body className="mt-4 text-gray-700">
        Section content goes here...
      </Body>

      <H3 className="mt-8 text-gray-900">Subsection</H3>
      <Body className="mt-4 text-gray-700">
        More detailed content...
      </Body>
    </article>
  );
}
```

### Card Component

```tsx
import { H3, Body } from '@/components/typography';

export default function Card() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <H3 className="text-gray-900">Card Title</H3>
      <Body size="sm" className="mt-2 text-gray-600">
        Card description text goes here
      </Body>
    </div>
  );
}
```

## Direct Tailwind Usage

You can also use the typography classes directly in your markup:

```tsx
<h1 className="text-h1 font-inter">Heading</h1>
<p className="text-body font-inter">Body text</p>
<span className="text-body-sm font-inter">Small text</span>
```

## Design Principles

### Locked System

This typography system is intentionally locked to prevent deviation from design standards:

1. **Fixed Sizes**: All font sizes, line heights, and weights are predefined
2. **No Arbitrary Values**: Use components or predefined classes only
3. **Consistent Spacing**: Line heights are optimized for readability
4. **Semantic HTML**: Components use appropriate HTML elements

### Accessibility

- Semantic HTML elements ensure proper document structure
- Line heights are optimized for readability (1.25-1.6 ratio)
- Font weights provide sufficient contrast between headings and body text
- Minimum body text size is 12px for legibility

### Responsive Behavior

While the base sizes are fixed, you can combine with Tailwind's responsive prefixes:

```tsx
<Display size="md" className="lg:text-display-xl">
  Responsive headline
</Display>
```

**Note**: Use responsive overrides sparingly to maintain consistency.

## Configuration

### Tailwind Config

The typography system is defined in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // All sizes defined here
      },
    },
  },
}
```

### Font Loading

Inter is loaded in `app/layout.tsx` and exposed as a CSS variable:

```typescript
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
```

## Best Practices

1. **Use Components**: Prefer typography components over direct Tailwind classes
2. **Semantic HTML**: Let components render appropriate HTML elements
3. **Consistent Hierarchy**: Follow h1 → h2 → h3 → h4 order
4. **Color Separation**: Apply colors via className, not in components
5. **Line Length**: Keep body text lines between 50-75 characters
6. **Spacing**: Use consistent margin/padding with typography

## Testing

Visit `/typography-test` to see all typography styles rendered with examples.

## Support

For issues or questions about the typography system, refer to:
- Component source code in `/components/typography/`
- Configuration in `tailwind.config.js`
- Test page at `/typography-test`
