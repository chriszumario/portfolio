import { describe, expect, it } from 'vitest';
import { parseHero, parsePostSummary, safeExternalUrl } from '../../src/lib/api-contracts';
import { heroFixture, postFixture } from '../support/fixtures';

describe('API contracts', () => {
  it('accepts a valid hero response', () => {
    expect(parseHero(heroFixture)).toEqual(heroFixture);
  });

  it('rejects incomplete external data', () => {
    expect(() => parseHero({ name: 'Ada' })).toThrow(TypeError);
  });

  it('rejects unsafe URLs', () => {
    expect(safeExternalUrl('javascript:alert(1)')).toBeNull();
    expect(safeExternalUrl('data:text/html,unsafe')).toBeNull();
    expect(safeExternalUrl('https://example.com/path')).toBe('https://example.com/path');
  });

  it('rejects slugs that can escape the blog route', () => {
    expect(() => parsePostSummary({ ...postFixture, slug: '../admin' })).toThrow(/slug/);
  });
});
