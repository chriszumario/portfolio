/**
 * Shared date formatting utilities.
 * Single source of truth for all date formatting across the portfolio.
 */

type DateFormatVariant = 'short' | 'long';

const FORMAT_OPTIONS: Record<DateFormatVariant, Intl.DateTimeFormatOptions> = {
  short: { day: 'numeric', month: 'short', year: 'numeric' },
  long: { day: 'numeric', month: 'long', year: 'numeric' },
};

/**
 * Formats an ISO date string into a human-readable Spanish locale string.
 * Returns `fallback` when `dateStr` is null/undefined/invalid.
 */
export function formatDate(
  dateStr: string | null | undefined,
  variant: DateFormatVariant = 'short',
  fallback = '',
): string {
  if (!dateStr) return fallback;

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return fallback;

  return new Intl.DateTimeFormat('es-ES', FORMAT_OPTIONS[variant]).format(date);
}

/**
 * Formats a date range (start — end) for timeline items.
 * Shows `currentLabel` instead of end date when `isCurrent` is true.
 */
export function formatDateRange(
  startDate: string,
  endDate: string | null,
  isCurrent: boolean,
  currentLabel = 'Presente',
): string {
  const start = formatDate(startDate);
  const end = isCurrent ? currentLabel : formatDate(endDate);
  return `${start} — ${end}`;
}
