'use client';

import { Display, H1, H2, H3, H4, Body } from '@/components/typography';

export default function TypographyTestPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="border-b border-gray-200 pb-8">
        <H1 className="text-gray-900">Typography System Test</H1>
        <Body className="mt-2 text-gray-600">
          Complete showcase of the OpenAI-inspired typography system using Inter font
        </Body>
      </div>

      {/* Display Sizes */}
      <section className="space-y-8">
        <div>
          <H2 className="text-gray-900 mb-2">Display Sizes</H2>
          <Body size="sm" className="text-gray-500">
            Large, impactful text for hero sections and major headlines
          </Body>
        </div>

        <div className="space-y-6 bg-gray-50 p-8 rounded-lg">
          <div className="space-y-2">
            <Body size="xs" className="text-gray-500 uppercase tracking-wide">
              Display 2XL (72px/90px, weight: 600)
            </Body>
            <Display size="2xl" className="text-gray-900">
              The quick brown fox jumps
            </Display>
          </div>

          <div className="space-y-2">
            <Body size="xs" className="text-gray-500 uppercase tracking-wide">
              Display XL (60px/72px, weight: 600)
            </Body>
            <Display size="xl" className="text-gray-900">
              The quick brown fox jumps over
            </Display>
          </div>

          <div className="space-y-2">
            <Body size="xs" className="text-gray-500 uppercase tracking-wide">
              Display LG (48px/60px, weight: 600)
            </Body>
            <Display size="lg" className="text-gray-900">
              The quick brown fox jumps over the lazy dog
            </Display>
          </div>

          <div className="space-y-2">
            <Body size="xs" className="text-gray-500 uppercase tracking-wide">
              Display MD (36px/44px, weight: 600)
            </Body>
            <Display size="md" className="text-gray-900">
              The quick brown fox jumps over the lazy dog and beyond
            </Display>
          </div>
        </div>
      </section>

      {/* Headings */}
      <section className="space-y-8">
        <div>
          <H2 className="text-gray-900 mb-2">Headings</H2>
          <Body size="sm" className="text-gray-500">
            Semantic heading styles for document structure
          </Body>
        </div>

        <div className="space-y-6 bg-gray-50 p-8 rounded-lg">
          <div className="space-y-2">
            <Body size="xs" className="text-gray-500 uppercase tracking-wide">
              H1 (30px/38px, weight: 600)
            </Body>
            <H1 className="text-gray-900">
              Main Page Title: The quick brown fox jumps over the lazy dog
            </H1>
          </div>

          <div className="space-y-2">
            <Body size="xs" className="text-gray-500 uppercase tracking-wide">
              H2 (24px/32px, weight: 600)
            </Body>
            <H2 className="text-gray-900">
              Section Heading: The quick brown fox jumps over the lazy dog
            </H2>
          </div>

          <div className="space-y-2">
            <Body size="xs" className="text-gray-500 uppercase tracking-wide">
              H3 (20px/28px, weight: 600)
            </Body>
            <H3 className="text-gray-900">
              Subsection Heading: The quick brown fox jumps over the lazy dog
            </H3>
          </div>

          <div className="space-y-2">
            <Body size="xs" className="text-gray-500 uppercase tracking-wide">
              H4 (18px/26px, weight: 600)
            </Body>
            <H4 className="text-gray-900">
              Minor Heading: The quick brown fox jumps over the lazy dog
            </H4>
          </div>
        </div>
      </section>

      {/* Body Text */}
      <section className="space-y-8">
        <div>
          <H2 className="text-gray-900 mb-2">Body Text</H2>
          <Body size="sm" className="text-gray-500">
            Content and interface text in various sizes
          </Body>
        </div>

        <div className="space-y-6 bg-gray-50 p-8 rounded-lg">
          <div className="space-y-2">
            <Body size="xs" className="text-gray-500 uppercase tracking-wide">
              Body XL (20px/32px, weight: 400)
            </Body>
            <Body size="xl" className="text-gray-700">
              The quick brown fox jumps over the lazy dog. This is large body text,
              perfect for introductory paragraphs or emphasized content that needs to
              stand out while remaining readable.
            </Body>
          </div>

          <div className="space-y-2">
            <Body size="xs" className="text-gray-500 uppercase tracking-wide">
              Body LG (18px/28px, weight: 400)
            </Body>
            <Body size="lg" className="text-gray-700">
              The quick brown fox jumps over the lazy dog. This is slightly larger
              body text, suitable for featured content or sections that need more
              emphasis than default text.
            </Body>
          </div>

          <div className="space-y-2">
            <Body size="xs" className="text-gray-500 uppercase tracking-wide">
              Body Default (16px/24px, weight: 400)
            </Body>
            <Body className="text-gray-700">
              The quick brown fox jumps over the lazy dog. This is the default body
              text size, ideal for main content, articles, and general reading. It
              provides optimal readability for extended content.
            </Body>
          </div>

          <div className="space-y-2">
            <Body size="xs" className="text-gray-500 uppercase tracking-wide">
              Body SM (14px/20px, weight: 400)
            </Body>
            <Body size="sm" className="text-gray-700">
              The quick brown fox jumps over the lazy dog. This is small body text,
              perfect for captions, metadata, supporting information, or UI elements
              that need compact text.
            </Body>
          </div>

          <div className="space-y-2">
            <Body size="xs" className="text-gray-500 uppercase tracking-wide">
              Body XS (12px/16px, weight: 400)
            </Body>
            <Body size="xs" className="text-gray-700">
              The quick brown fox jumps over the lazy dog. This is extra small text,
              used for fine print, legal text, timestamps, or dense UI elements where
              space is limited.
            </Body>
          </div>
        </div>
      </section>

      {/* Real-world Example */}
      <section className="space-y-8">
        <div>
          <H2 className="text-gray-900 mb-2">Real-World Example</H2>
          <Body size="sm" className="text-gray-500">
            How the typography system works together in a typical layout
          </Body>
        </div>

        <div className="bg-white border border-gray-200 p-12 rounded-lg space-y-8">
          <div>
            <Display size="lg" className="text-gray-900">
              Welcome to ZIGGY BENT
            </Display>
            <Body size="xl" className="mt-4 text-gray-600">
              A modern platform for creative expression and innovation
            </Body>
          </div>

          <div className="space-y-6">
            <H2 className="text-gray-900">About Our Platform</H2>
            <Body className="text-gray-700">
              ZIGGY BENT is designed to help creative professionals and teams build
              amazing digital experiences. Our platform combines powerful tools with
              an intuitive interface to make your work easier and more enjoyable.
            </Body>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Fast & Reliable',
                  description: 'Built with performance in mind, our platform handles any workload',
                },
                {
                  title: 'Easy to Use',
                  description: 'Intuitive interface designed for professionals of all levels',
                },
                {
                  title: 'Fully Featured',
                  description: 'Everything you need to create, collaborate, and deliver',
                },
              ].map((feature, idx) => (
                <div key={idx} className="p-6 bg-gray-50 rounded-lg">
                  <H4 className="text-gray-900">{feature.title}</H4>
                  <Body size="sm" className="mt-2 text-gray-600">
                    {feature.description}
                  </Body>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <H3 className="text-gray-900">Getting Started</H3>
            <Body className="text-gray-700">
              Follow these simple steps to begin your journey with ZIGGY BENT:
            </Body>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <Body as="li" className="text-gray-700">
                Create your account and verify your email
              </Body>
              <Body as="li" className="text-gray-700">
                Set up your workspace and invite team members
              </Body>
              <Body as="li" className="text-gray-700">
                Start creating with our powerful tools
              </Body>
            </ol>
            <Body size="sm" className="text-gray-500 mt-4">
              Need help? Check out our documentation or contact support.
            </Body>
          </div>
        </div>
      </section>

      {/* Typography Scale Reference */}
      <section className="space-y-8">
        <div>
          <H2 className="text-gray-900 mb-2">Typography Scale Reference</H2>
          <Body size="sm" className="text-gray-500">
            Quick reference for all available sizes
          </Body>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <Body as="th" size="sm" className="text-left py-3 px-4 text-gray-900 font-semibold">
                    Category
                  </Body>
                  <Body as="th" size="sm" className="text-left py-3 px-4 text-gray-900 font-semibold">
                    Size
                  </Body>
                  <Body as="th" size="sm" className="text-left py-3 px-4 text-gray-900 font-semibold">
                    Font Size
                  </Body>
                  <Body as="th" size="sm" className="text-left py-3 px-4 text-gray-900 font-semibold">
                    Line Height
                  </Body>
                  <Body as="th" size="sm" className="text-left py-3 px-4 text-gray-900 font-semibold">
                    Weight
                  </Body>
                </tr>
              </thead>
              <tbody>
                {[
                  { category: 'Display', size: '2XL', fontSize: '72px', lineHeight: '90px', weight: '600' },
                  { category: 'Display', size: 'XL', fontSize: '60px', lineHeight: '72px', weight: '600' },
                  { category: 'Display', size: 'LG', fontSize: '48px', lineHeight: '60px', weight: '600' },
                  { category: 'Display', size: 'MD', fontSize: '36px', lineHeight: '44px', weight: '600' },
                  { category: 'Heading', size: 'H1', fontSize: '30px', lineHeight: '38px', weight: '600' },
                  { category: 'Heading', size: 'H2', fontSize: '24px', lineHeight: '32px', weight: '600' },
                  { category: 'Heading', size: 'H3', fontSize: '20px', lineHeight: '28px', weight: '600' },
                  { category: 'Heading', size: 'H4', fontSize: '18px', lineHeight: '26px', weight: '600' },
                  { category: 'Body', size: 'XL', fontSize: '20px', lineHeight: '32px', weight: '400' },
                  { category: 'Body', size: 'LG', fontSize: '18px', lineHeight: '28px', weight: '400' },
                  { category: 'Body', size: 'Default', fontSize: '16px', lineHeight: '24px', weight: '400' },
                  { category: 'Body', size: 'SM', fontSize: '14px', lineHeight: '20px', weight: '400' },
                  { category: 'Body', size: 'XS', fontSize: '12px', lineHeight: '16px', weight: '400' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <Body as="td" size="sm" className="py-3 px-4 text-gray-700">
                      {row.category}
                    </Body>
                    <Body as="td" size="sm" className="py-3 px-4 text-gray-900 font-medium">
                      {row.size}
                    </Body>
                    <Body as="td" size="sm" className="py-3 px-4 text-gray-700">
                      {row.fontSize}
                    </Body>
                    <Body as="td" size="sm" className="py-3 px-4 text-gray-700">
                      {row.lineHeight}
                    </Body>
                    <Body as="td" size="sm" className="py-3 px-4 text-gray-700">
                      {row.weight}
                    </Body>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-8 pb-16">
        <Body size="sm" className="text-gray-500 text-center">
          Typography system based on OpenAI design principles
        </Body>
      </div>
    </div>
  );
}
