export const metadata = {
    title: 'Privacy Policy | Ziggy Bent',
    description: 'Our commitment to your privacy.',
};

export default function PrivacyPage() {
    return (
        <div className="max-w-2xl">
            <header className="mb-16">
                <h1 className="text-3xl font-serif mb-4">Privacy Policy</h1>
                <div className="text-sm font-sans text-muted">Last Updated: November 2023</div>
            </header>

            <div className="prose prose-lg prose-neutral prose-headings:font-sans prose-headings:font-medium prose-p:font-serif prose-p:text-muted">
                <p>
                    Ziggy Bent is designed to be a private experience. We believe that consciousness exploration requires a safe container, free from surveillance.
                </p>

                <h3>Data Collection</h3>
                <p>
                    We do not collect personal data. We do not use cookies for tracking purposes. We do not have a newsletter or a login system.
                </p>

                <h3>Analytics</h3>
                <p>
                    We use minimal, privacy-focused analytics to understand basic site usage (e.g., which pages are visited). This data is anonymized and does not identify you personally.
                </p>

                <h3>Contact</h3>
                <p>
                    If you have questions about this policy, please reach out through the appropriate channels.
                </p>
            </div>
        </div>
    );
}
