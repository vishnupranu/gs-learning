import Image from 'next/image';
import Link from 'next/link';

interface BrandLogoProps {
  /** Where to show the logo: 'header' | 'footer' | 'admin' | 'auth' */
  variant?: 'header' | 'footer' | 'admin' | 'auth';
  /** Whether to show the text beside the logo */
  showText?: boolean;
  /** Whether to wrap in a Link to homepage */
  asLink?: boolean;
  /** Extra className on the wrapper */
  className?: string;
}

const LOGO_SRC = '/gslogo.png';

export default function BrandLogo({
  variant = 'header',
  showText = true,
  asLink = true,
  className = '',
}: BrandLogoProps) {
  const sizes = {
    header: { w: 36, h: 36 },
    footer: { w: 44, h: 44 },
    admin:  { w: 32, h: 32 },
    auth:   { w: 56, h: 56 },
  };

  const { w, h } = sizes[variant];

  const content = (
    <span
      className={`inline-flex items-center gap-2.5 group select-none ${className}`}
      aria-label="Guide Soft IT Solutions — Home"
    >
      {/* Logo image with hover animation */}
      <span className="relative flex-shrink-0">
        <Image
          src={LOGO_SRC}
          alt="Guide Soft IT Solutions logo"
          width={w}
          height={h}
          priority
          className={[
            'object-contain',
            'transition-all duration-300',
            'group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]',
            variant === 'header' ? 'rounded-lg' : '',
            variant === 'auth' ? 'rounded-2xl' : '',
          ].join(' ')}
        />
        {/* Live pulse dot — only in header */}
        {variant === 'header' && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
        )}
      </span>

      {/* Brand text */}
      {showText && (
        <span className="flex flex-col leading-none">
          {variant === 'header' && (
            <>
              <span className="text-base font-black text-gray-900 dark:text-white tracking-tight">
                GuideSoft
              </span>
              <span className="text-[9px] font-bold text-green-600 dark:text-green-400 tracking-wider uppercase">
                IT & AI Solutions
              </span>
            </>
          )}
          {variant === 'footer' && (
            <>
              <span className="text-xl font-black text-white tracking-tight">GuideSoft</span>
              <span className="text-xs font-semibold text-green-400 tracking-wider">IT & AI Solutions</span>
            </>
          )}
          {variant === 'admin' && (
            <>
              <span className="text-sm font-black text-gray-900 dark:text-white tracking-tight">GuideSoft</span>
              <span className="text-[9px] font-bold text-green-500 tracking-wider uppercase">IT & AI Admin</span>
            </>
          )}
          {variant === 'auth' && (
            <>
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">GuideSoft</span>
              <span className="text-xs font-bold text-green-600 dark:text-green-400 tracking-wider uppercase">IT & AI Solutions</span>
            </>
          )}
        </span>
      )}
    </span>
  );

  if (asLink) {
    return (
      <Link href="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-xl">
        {content}
      </Link>
    );
  }

  return content;
}
