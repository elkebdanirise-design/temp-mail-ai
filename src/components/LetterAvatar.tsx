import { memo } from 'react';

// Premium color palette for letter avatars
const AVATAR_COLORS = [
  { bg: 'hsl(270 60% 50%)', text: 'hsl(0 0% 100%)' },  // Purple
  { bg: 'hsl(200 70% 50%)', text: 'hsl(0 0% 100%)' },  // Cyan
  { bg: 'hsl(340 75% 55%)', text: 'hsl(0 0% 100%)' },  // Magenta
  { bg: 'hsl(160 60% 45%)', text: 'hsl(0 0% 100%)' },  // Teal
  { bg: 'hsl(25 85% 55%)', text: 'hsl(0 0% 100%)' },   // Orange
  { bg: 'hsl(45 80% 50%)', text: 'hsl(0 0% 15%)' },    // Gold
  { bg: 'hsl(220 70% 55%)', text: 'hsl(0 0% 100%)' },  // Blue
  { bg: 'hsl(300 50% 50%)', text: 'hsl(0 0% 100%)' },  // Violet
];

interface LetterAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  interactive?: boolean;
}

const getInitial = (name: string): string => {
  if (!name) return '?';
  const cleaned = name.trim();
  if (cleaned.includes('@')) {
    return cleaned.charAt(0).toUpperCase();
  }
  return cleaned.charAt(0).toUpperCase();
};

const getColorFromName = (name: string) => {
  if (!name) return AVATAR_COLORS[0];
  const charCode = name.charCodeAt(0) + (name.length > 1 ? name.charCodeAt(1) : 0);
  return AVATAR_COLORS[charCode % AVATAR_COLORS.length];
};

const sizeClasses = {
  sm: 'w-5 h-5 text-xs',
  md: 'w-7 h-7 text-sm',
  lg: 'w-24 h-24 text-4xl sm:w-28 sm:h-28 sm:text-5xl',
  xl: 'w-28 h-28 text-5xl sm:w-36 sm:h-36 sm:text-6xl',
};

export const LetterAvatar = memo(({ name, size = 'md', className = '', interactive = true }: LetterAvatarProps) => {
  const initial = getInitial(name);
  const color = getColorFromName(name);

  return (
    <div
      className={`
        letter-avatar
        rounded-full flex items-center justify-center font-bold 
        ${sizeClasses[size]} 
        ${interactive ? 'letter-avatar-interactive' : ''} 
        ${className}
      `}
      style={{
        background: `linear-gradient(135deg, ${color.bg}, ${color.bg.replace('50%', '40%')})`,
        color: color.text,
        '--avatar-glow-color': color.bg.replace(')', ' / 0.5)'),
      } as React.CSSProperties}
    >
      <span className="letter-avatar-initial">{initial}</span>
    </div>
  );
});

LetterAvatar.displayName = 'LetterAvatar';
