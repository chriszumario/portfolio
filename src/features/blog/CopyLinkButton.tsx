import { createSignal, onCleanup } from 'solid-js';

type CopyState = 'idle' | 'copied' | 'error';

export default function CopyLinkButton() {
  const [state, setState] = createSignal<CopyState>('idle');
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  onCleanup(() => {
    if (resetTimer) clearTimeout(resetTimer);
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setState('copied');
    } catch {
      setState('error');
    }

    if (resetTimer) clearTimeout(resetTimer);
    resetTimer = setTimeout(() => setState('idle'), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      class="flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/7 px-4 py-2 text-xs font-semibold text-emerald-200 transition-colors hover:bg-emerald-300/12 focus-visible:outline-2 focus-visible:outline-emerald-300"
      aria-live="polite"
    >
      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
      <span>{state() === 'copied' ? 'Enlace copiado' : state() === 'error' ? 'No se pudo copiar' : 'Copiar enlace'}</span>
    </button>
  );
}
