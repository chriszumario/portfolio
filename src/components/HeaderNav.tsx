import { createMemo, createSignal, onCleanup, onMount, For } from 'solid-js';

interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly sectionId: string;
}

interface Props {
  brandName?: string;
  email?: string | null;
  initialPath: string;
}

const HOME_LINKS = [
  { label: 'Inicio', href: '/#hero', sectionId: 'hero' },
  { label: 'Experiencia', href: '/#experience', sectionId: 'experience' },
  { label: 'Proyectos', href: '/#projects', sectionId: 'projects' },
  { label: 'Skills', href: '/#skills', sectionId: 'skills' },
  { label: 'Educación', href: '/#education', sectionId: 'education' },
  { label: 'Blog', href: '/blog', sectionId: 'blog-preview' },
  { label: 'Sobre mí', href: '/#about', sectionId: 'about' },
] as const satisfies readonly NavLink[];

export default function HeaderNav(props: Props) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [currentPath, setCurrentPath] = createSignal(props.initialPath);
  const [activeSection, setActiveSection] = createSignal('hero');

  const brandName = () => props.brandName || 'Portfolio';
  const navLinks = createMemo<readonly NavLink[]>(() => props.email
    ? [...HOME_LINKS, { label: 'Contacto', href: `mailto:${props.email}`, sectionId: '' }]
    : HOME_LINKS);

  function isLinkActive(link: NavLink): boolean {
    const path = currentPath();

    if (link.href === '/blog') {
      return path.startsWith('/blog') || (path === '/' && activeSection() === link.sectionId);
    }

    if (path === '/') {
      if (link.sectionId) {
        return activeSection() === link.sectionId;
      }
      return false;
    }

    return false;
  }

  let scrollObserver: IntersectionObserver | undefined;

  const setupScrollObserver = () => {
    scrollObserver?.disconnect();
    scrollObserver = undefined;

    if (window.location.pathname !== '/') return;

    const sections: HTMLElement[] = [];
    navLinks().forEach((link) => {
      if (link.sectionId) {
        const el = document.getElementById(link.sectionId);
        if (el) sections.push(el);
      }
    });

    if (sections.length > 0) {
      scrollObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.2, rootMargin: '-80px 0px -30% 0px' }
      );

      sections.forEach((sec) => scrollObserver?.observe(sec));
    }
  };

  onMount(() => {
    const syncNavigationState = () => {
      setCurrentPath(window.location.pathname);
      setIsOpen(false);
      setupScrollObserver();
    };

    syncNavigationState();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('astro:page-load', syncNavigationState);
    window.addEventListener('popstate', syncNavigationState);
    document.addEventListener('keydown', handleKeyDown);

    onCleanup(() => {
      document.removeEventListener('astro:page-load', syncNavigationState);
      window.removeEventListener('popstate', syncNavigationState);
      document.removeEventListener('keydown', handleKeyDown);
      scrollObserver?.disconnect();
      scrollObserver = undefined;
    });
  });

  return (
    <header id="main-header" class="fixed inset-x-0 top-0 z-50 w-full border-b border-white/10 bg-[#070b0d]/90 backdrop-blur-xl transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">

        {/* Brand Logo */}
        <a href="/" class="group flex items-center gap-2.5 rounded-xl font-heading text-lg font-extrabold text-white transition-colors hover:text-emerald-200 focus-visible:outline-2 focus-visible:outline-emerald-300 focus-visible:outline-offset-4 sm:text-xl">
          <span class="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-emerald-300/25 bg-emerald-300/8 text-emerald-200 shadow-lg shadow-emerald-950/20 transition duration-300 group-hover:-rotate-3 group-hover:border-emerald-300/50 group-hover:bg-emerald-300/[0.14] motion-reduce:transform-none">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.5 7-4 5 4 5M15.5 7l4 5-4 5M13.5 5.5l-3 13" />
            </svg>
            <span class="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.9)]" aria-hidden="true"></span>
          </span>
          <span class="font-extrabold tracking-tight text-white transition-colors group-hover:text-emerald-100">{brandName()}</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav class="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          <For each={navLinks()}>
            {(link) => {
              const active = () => isLinkActive(link);
              return (
                <a
                  href={link.href}
                  class={`nav-link-item rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-emerald-300 ${
                    active()
                      ? 'border border-emerald-300/20 bg-emerald-300/10 text-emerald-200'
                      : 'border border-transparent text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                  aria-current={active() ? 'page' : undefined}
                >
                  {link.label}
                </a>
              );
            }}
          </For>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div class="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            class="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl border border-white/10 p-2.5 text-slate-300 transition-colors hover:border-emerald-300/20 hover:bg-emerald-300/8 hover:text-emerald-200 focus-visible:outline-2 focus-visible:outline-emerald-300"
            aria-expanded={isOpen()}
            aria-controls="mobile-navigation"
            aria-label={isOpen() ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            onClick={() => setIsOpen(!isOpen())}
          >
            {isOpen() ? (
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen() && (
        <nav id="mobile-navigation" aria-label="Navegación móvil" class="border-t border-slate-800 bg-slate-950/95 px-4 pb-6 pt-3 backdrop-blur-2xl lg:hidden">
          <For each={navLinks()}>
            {(link) => {
              const active = () => isLinkActive(link);
              return (
                <a
                  href={link.href}
                  class={`block px-4 py-3 text-base font-semibold rounded-xl transition-colors ${
                    active()
                      ? 'border border-emerald-300/20 bg-emerald-300/10 text-emerald-200'
                      : 'text-slate-200 hover:bg-white/5 hover:text-emerald-200'
                  }`}
                  aria-current={active() ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              );
            }}
          </For>
        </nav>
      )}
    </header>
  );
}
