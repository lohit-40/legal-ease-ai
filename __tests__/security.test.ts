import { sanitizeHtml, isAllowedFileType } from '../src/lib/security';

describe('Security Library', () => {
  describe('sanitizeHtml', () => {
    it('removes malicious script tags', () => {
      const dirty = '<p>Hello <script>alert("xss")</script></p>';
      const clean = sanitizeHtml(dirty);
      expect(clean).not.toContain('<script>');
      expect(clean).toContain('<p>Hello </p>');
    });

    it('allows safe HTML tags', () => {
      const safe = '<strong>Safe</strong>';
      const clean = sanitizeHtml(safe);
      expect(clean).toBe(safe);
    });
  });

  describe('isAllowedFileType', () => {
    it('returns true for pdf', () => {
      expect(isAllowedFileType('application/pdf')).toBe(true);
    });

    it('returns true for txt', () => {
      expect(isAllowedFileType('text/plain')).toBe(true);
    });

    it('returns false for executable', () => {
      expect(isAllowedFileType('application/x-msdownload')).toBe(false);
    });
  });
});
