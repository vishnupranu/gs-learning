/**
 * Password hashing using the native Web Crypto API.
 * Replaces bcryptjs to eliminate external dependency requirements.
 * Uses PBKDF2 with SHA-256, 100,000 iterations.
 */

async function generateSalt(): Promise<string> {
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(saltBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function pbkdf2Hash(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: enc.encode(salt),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );

  const hashArray = Array.from(new Uint8Array(bits));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Hash a plaintext password. Returns a string in format: salt:hash
 */
export async function hash(password: string): Promise<string> {
  const salt = await generateSalt();
  const hashHex = await pbkdf2Hash(password, salt);
  return `${salt}:${hashHex}`;
}

/**
 * Compare a plaintext password against a stored hash (format: salt:hash)
 */
export async function compare(password: string, stored: string): Promise<boolean> {
  try {
    const [salt, expectedHash] = stored.split(':');
    if (!salt || !expectedHash) return false;
    const actualHash = await pbkdf2Hash(password, salt);
    // Constant-time comparison
    if (actualHash.length !== expectedHash.length) return false;
    let diff = 0;
    for (let i = 0; i < actualHash.length; i++) {
      diff |= actualHash.charCodeAt(i) ^ expectedHash.charCodeAt(i);
    }
    return diff === 0;
  } catch {
    return false;
  }
}
