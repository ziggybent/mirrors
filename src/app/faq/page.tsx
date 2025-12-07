export const metadata = {
    title: 'FAQ | Ziggy Bent',
    description: 'Frequently asked questions about the project.',
};

export default function FAQPage() {
    return (
        <div className="max-w-2xl">
            <header className="mb-16">
                <h1 className="text-3xl font-serif mb-4">FAQ</h1>
                <p className="text-lg text-muted">Questions and answers.</p>
            </header>

            <div className="space-y-12">
                <div className="space-y-3">
                    <h2 className="text-xl font-serif">What is Ziggy Bent?</h2>
                    <p className="text-muted leading-relaxed">
                        Ziggy Bent is a platform for consciousness exploration. It uses various forms of media—text, image, and structure—to create &quot;mirrors&quot; in which we can see our own mental patterns.
                    </p>
                </div>

                <div className="space-y-3">
                    <h2 className="text-xl font-serif">What is a Mirror?</h2>
                    <p className="text-muted leading-relaxed">
                        A mirror is a piece of reflective content. It is designed not to teach you something new, but to show you something you already know but have forgotten or overlooked.
                    </p>
                </div>

                <div className="space-y-3">
                    <h2 className="text-xl font-serif">What is a Surface?</h2>
                    <p className="text-gray-600 mb-4">
                        &quot;Mirrors&quot; are reflective essays. &quot;Findings&quot; are discoveries. &quot;Surfaces&quot; are visual explorations. &quot;Artifacts&quot; are tools and guides.
                    </p>
                </div>

                <div className="space-y-3">
                    <h2 className="text-xl font-serif">Who is behind this?</h2>
                    <p className="text-muted leading-relaxed">
                        Ziggy Bent is an open collective of explorers. The work is unsigned to emphasize the content over the creator.
                    </p>
                </div>
            </div>
        </div>
    );
}
