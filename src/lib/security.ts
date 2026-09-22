import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

/**
 * Sanitizes an HTML string to prevent XSS attacks.
 * Uses DOMPurify backed by JSDOM for server-side sanitization.
 * 
 * @param dirty The untrusted HTML string.
 * @returns The sanitized, safe HTML string.
 */
export function sanitizeHtml(dirty: string): string {
  const window = new JSDOM('').window;
  const purify = DOMPurify(window);
  return purify.sanitize(dirty);
}

/**
 * Validates a file type based on predefined allowed MIME types.
 * 
 * @param mimeType The MIME type of the file.
 * @returns true if allowed, false otherwise.
 */
export function isAllowedFileType(mimeType: string): boolean {
  const allowed = ['application/pdf', 'text/plain'];
  return allowed.includes(mimeType);
}
