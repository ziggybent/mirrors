import React from 'react';

interface PlaceholderProps {
    height?: string;
    text?: string;
    className?: string;
    aspectRatio?: 'video' | 'portrait' | 'square' | 'auto';
}

export default function Placeholder({
    height = 'h-64',
    text = 'Image Placeholder',
    className = '',
    aspectRatio = 'auto'
}: PlaceholderProps) {

    let aspectClass = '';
    switch (aspectRatio) {
        case 'video': aspectClass = 'aspect-video'; break;
        case 'portrait': aspectClass = 'aspect-[3/4]'; break;
        case 'square': aspectClass = 'aspect-square'; break;
        default: aspectClass = '';
    }

    return (
        <div
            className={`w-full bg-placeholder flex items-center justify-center text-muted font-sans text-sm uppercase tracking-widest ${height} ${aspectClass} ${className}`}
        >
            {text}
        </div>
    );
}
