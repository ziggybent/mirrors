import React from 'react';

export type BackgroundType = 'gradient' | 'solid' | 'image' | 'video';

export interface BackgroundProps {
  type?: BackgroundType;
  // Gradient props
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  gradientDirection?: 'to-b' | 'to-t' | 'to-r' | 'to-l' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl';
  // Solid color props
  solidColor?: string;
  // Image props
  imageUrl?: string;
  imagePosition?: string;
  // Video props
  videoUrl?: string;
  // Overlay (for image/video)
  overlay?: boolean;
  overlayOpacity?: number;
  overlayColor?: string;
}

export const Background: React.FC<BackgroundProps> = ({
  type = 'gradient',
  // Gradient defaults - peach → pink → magenta
  gradientFrom = '#FFD4C4',
  gradientVia = '#FFB3D9',
  gradientTo = '#FF1493',
  gradientDirection = 'to-b',
  // Solid color default
  solidColor = '#ffffff',
  // Image defaults
  imageUrl,
  imagePosition = 'center',
  // Video defaults
  videoUrl,
  // Overlay defaults
  overlay = false,
  overlayOpacity = 0.5,
  overlayColor = '#000000',
}) => {
  // Render gradient background
  if (type === 'gradient') {
    return (
      <div
        className={`fixed inset-0 -z-10 bg-gradient-${gradientDirection} from-[${gradientFrom}] via-[${gradientVia}] to-[${gradientTo}]`}
      />
    );
  }

  // Render solid color background
  if (type === 'solid') {
    return (
      <div
        className={`fixed inset-0 -z-10 bg-[${solidColor}]`}
      />
    );
  }

  // Render image background
  if (type === 'image' && imageUrl) {
    return (
      <div className="fixed inset-0 -z-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: imagePosition,
            backgroundRepeat: 'no-repeat',
          }}
        />
        {overlay && (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: overlayColor,
              opacity: overlayOpacity,
            }}
          />
        )}
      </div>
    );
  }

  // Render video background
  if (type === 'video' && videoUrl) {
    return (
      <div className="fixed inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {overlay && (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: overlayColor,
              opacity: overlayOpacity,
            }}
          />
        )}
      </div>
    );
  }

  // Fallback to gradient if invalid type or missing required props
  return (
    <div
      className={`fixed inset-0 -z-10 bg-gradient-${gradientDirection} from-[${gradientFrom}] via-[${gradientVia}] to-[${gradientTo}]`}
    />
  );
};

export default Background;
