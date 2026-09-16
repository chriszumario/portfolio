/**
 * Serializes structured data for embedding in an HTML script element.
 * Escaping `<` prevents user-controlled values from closing the script tag.
 */
export function serializeJsonForHtml(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
