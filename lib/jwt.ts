// We use Web Crypto API for JWT to avoid external dependencies like 'jose' or 'jsonwebtoken'
const secretKey = process.env.JWT_SECRET || (() => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET environment variable must be set in production');
  }
  return 'dev-secret-key-do-not-use-in-production';
})();

function base64UrlEncode(str: string | Uint8Array) {
  let base64;
  if (typeof str === 'string') {
    base64 = btoa(unescape(encodeURIComponent(str)));
  } else {
    base64 = btoa(String.fromCharCode.apply(null, Array.from(str)));
  }
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return decodeURIComponent(escape(atob(str)));
}

async function getCryptoKey() {
  const encoder = new TextEncoder();
  return await crypto.subtle.importKey(
    'raw',
    encoder.encode(secretKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function signJWT(payload: any) {
  const header = { alg: 'HS256', typ: 'JWT' };
  
  // Add iat and exp
  const now = Math.floor(Date.now() / 1000);
  const payloadWithClaims = {
    ...payload,
    iat: now,
    exp: now + 7 * 24 * 60 * 60 // 7 days
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payloadWithClaims));
  const data = `${encodedHeader}.${encodedPayload}`;

  const key = await getCryptoKey();
  const encoder = new TextEncoder();
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(data)
  );

  const encodedSignature = base64UrlEncode(new Uint8Array(signature));
  return `${data}.${encodedSignature}`;
}

export async function verifyJWT(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Invalid token format');

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const data = `${encodedHeader}.${encodedPayload}`;

    // Verify signature
    const key = await getCryptoKey();
    const encoder = new TextEncoder();
    
    // Convert base64url signature back to Uint8Array
    let sigStr = encodedSignature.replace(/-/g, '+').replace(/_/g, '/');
    while (sigStr.length % 4) sigStr += '=';
    const sigBytes = new Uint8Array(
      atob(sigStr).split('').map(c => c.charCodeAt(0))
    );

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes,
      encoder.encode(data)
    );

    if (!isValid) throw new Error('Invalid signature');

    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    
    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expired');
    }

    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
