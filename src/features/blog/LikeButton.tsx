import { createSignal, Show } from 'solid-js';
import { likePost } from './api';

interface Props {
  slug: string;
  initialLikes?: number;
  viewsCount?: number;
}

export default function LikeButton(props: Props) {
  const [likes, setLikes] = createSignal(props.initialLikes ?? 0);
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal<string | null>(null);

  const handleLike = async () => {
    if (isSubmitting()) return;

    const previousLikes = likes();
    setIsSubmitting(true);
    setErrorMessage(null);
    setLikes(previousLikes + 1);

    try {
      const updatedPost = await likePost(props.slug);
      setLikes(updatedPost.likes_count);
    } catch {
      setLikes(previousLikes);
      setErrorMessage('No se pudo registrar. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div class="flex flex-col items-end gap-2 text-sm">
      <div class="flex items-center gap-3">
        <div
          class="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-3 py-2 text-slate-400"
          title="Lecturas totales acumuladas"
        >
          <svg class="h-4 w-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>{props.viewsCount ?? 0} vistas</span>
        </div>

        <button
          type="button"
          onClick={handleLike}
          class="flex min-h-11 items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-rose-100 transition hover:border-rose-400/50 hover:bg-rose-500/20 active:scale-95 focus-visible:outline-2 focus-visible:outline-rose-300 disabled:cursor-wait disabled:opacity-70 motion-reduce:transform-none"
          aria-label={`Me gusta. ${likes()} actuales`}
          disabled={isSubmitting()}
        >
          <svg class="h-4 w-4 fill-rose-400 text-rose-400" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <span class="min-w-4 font-bold tabular-nums" aria-live="polite">{likes()}</span>
        </button>
      </div>
      <Show when={errorMessage()}>{(message) => <p class="text-xs text-rose-300" role="alert">{message()}</p>}</Show>
    </div>
  );
}
