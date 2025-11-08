import Link from 'next/link';

// Define the five sequences with descriptions
const sequences = [
  {
    id: 'recognition',
    title: 'Recognition',
    description: 'The fundamental shift from identification to awareness.',
  },
  {
    id: 'mechanism',
    title: 'Mechanism',
    description: 'Understanding the construction and operation of the self.',
  },
  {
    id: 'instrument',
    title: 'Instrument',
    description: 'Tools and practices for direct observation.',
  },
  {
    id: 'context',
    title: 'Context',
    description: 'The field in which all experience arises.',
  },
  {
    id: 'possibility',
    title: 'Possibility',
    description: 'What becomes available when the mechanism is seen.',
  },
];

export default function MirrorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Mirror</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          A systematic exploration of awareness, construction, and what remains when identification dissolves.
          Each sequence builds on direct observation rather than belief.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sequences.map((sequence) => (
          <Link
            key={sequence.id}
            href={`/mirror/${sequence.id}`}
            className="group block"
          >
            <article className="border rounded-lg p-6 hover:shadow-lg transition-shadow h-full">
              <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-600">
                {sequence.title}
              </h2>
              <p className="text-gray-700">
                {sequence.description}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
