import React from 'react';

export default function EmailSignup() {
    return (
        <div className="w-full max-w-xl mx-auto p-12 text-center my-20">
            <h3 className="text-2xl font-medium mb-8 text-gray-900">Get notified of new mirrors</h3>
            <form className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-md text-sm text-gray-600 focus:outline-none focus:border-gray-400"
                    required
                />
                <button
                    type="submit"
                    className="px-6 py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors whitespace-nowrap"
                >
                    Sign up for Mirrors
                </button>
            </form>
            <p className="text-sm text-gray-500">No spam. Unsubscribe anytime.</p>
        </div>
    );
}
