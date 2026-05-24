import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock Next.js image component — strip Next.js-only props so DOM img doesn't throw
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className, style, id }) => {
    // Only pass standard HTML img attributes to avoid React DOM warnings
    return <img src={src} alt={alt || ''} width={width} height={height} className={className} style={style} id={id} />
  },
}))

// Mock environment variables
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
process.env.JWT_SECRET = 'test-secret-key-min-32-chars-xxxx'
