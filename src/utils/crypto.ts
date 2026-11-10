/**
 * Client-Side SHA-256 Password Hashing Utility using Web Crypto API
 * ปลอดภัย ไม่เก็บรหัสผ่านเป็นข้อความธรรมดา (Plaintext)
 */

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Synchronous fast fallback hash for immediate seed initialization
export function syncHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'sh256_' + Math.abs(hash).toString(16).padStart(8, '0') + '_stem';
}
