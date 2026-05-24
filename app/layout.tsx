import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import ChatWidget from '@/components/ai/ChatWidget';


export const metadata: Metadata = {
  metadataBase: new URL('https://guidesoftitsolutions.com'),
  title: {
    default: 'Guide Soft IT Solutions — Enterprise Software Development Company',
    template: '%s | Guide Soft IT Solutions',
  },
  description: 'Expert software development, AI/ML solutions, UX/UI design, mobile apps, and comprehensive LMS platform. Enterprise-grade technology partner for growing businesses.',
  keywords: 'software development, AI ML development, UX UI design, LMS platform, IT solutions, mobile app development, Cloudflare AI, enterprise software',
  authors: [{ name: 'Guide Soft IT Solutions', url: 'https://guidesoftitsolutions.com' }],
  creator: 'Guide Soft IT Solutions',
  publisher: 'Guide Soft IT Solutions',

  // ── Favicon & App Icons (all platforms) ─────────────────────────────────
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96x96.png',    sizes: '96x96',  type: 'image/png' },
      { url: '/icon-192x192.png',  sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png',  sizes: '512x512', type: 'image/png' },
    ],
    // iOS Safari — home screen icon
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/icon-152x152.png',     sizes: '152x152', type: 'image/png' },
      { url: '/icon-144x144.png',     sizes: '144x144', type: 'image/png' },
    ],
    // Legacy shortcut icon
    shortcut: '/favicon-32x32.png',
  },

  // ── PWA Manifest ──────────────────────────────────────────────────────────
  manifest: '/manifest.json',

  // ── Theme colour (mobile browser UI chrome) ───────────────────────────────
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#10b981' },
    { media: '(prefers-color-scheme: dark)',  color: '#111827' },
  ],

  // ── Open Graph (WhatsApp, Facebook, Slack previews) ──────────────────────
  openGraph: {
    title: 'Guide Soft IT Solutions',
    description: 'Leading software development company specializing in AI/ML, UX/UI, and LMS solutions.',
    url: 'https://guidesoftitsolutions.com',
    siteName: 'Guide Soft IT Solutions',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Guide Soft IT Solutions' }],
    locale: 'en_US',
    type: 'website',
  },

  // ── Twitter / X card ──────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Guide Soft IT Solutions',
    description: 'Leading software development company specializing in AI/ML, UX/UI, and LMS solutions.',
    images: ['/og-image.jpg'],
    creator: '@guidesoft_it',
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
  },

  // ── App-capable (iOS full-screen PWA) ─────────────────────────────────────
  appleWebApp: {
    capable: true,
    title: 'Guide Soft',
    statusBarStyle: 'black-translucent',
  },

  // ── Viewport (responsive, no zooming on mobile inputs) ────────────────────
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
            }}
          />
        )}
        {/* Meta Pixel */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');fbq('track','PageView');`,
            }}
          />
        )}
      </head>
      <body className="font-sans antialiased">
        {/* GTM noscript */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <AuthProvider>
            {children}
            <ChatWidget />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}