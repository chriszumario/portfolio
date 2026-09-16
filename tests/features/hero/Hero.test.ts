import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';
import Hero from '../../../src/features/hero/Hero.astro';
import { heroFixture } from '../../support/fixtures';

let container: AstroContainer;

beforeAll(async () => {
  container = await AstroContainer.create();
});

describe('Hero', () => {
  it('renders nothing without data', async () => {
    expect(await container.renderToString(Hero, { props: { data: null } })).toBe('');
  });

  it('renders portfolio data and a safe external resume link', async () => {
    const html = await container.renderToString(Hero, { props: { data: heroFixture } });

    expect(html).toContain('Ada Lovelace');
    expect(html).toContain('Disponible para proyectos');
    expect(html).toContain('href="https://example.com/resume.pdf"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it('does not render an unsafe resume URL', async () => {
    const html = await container.renderToString(Hero, {
      props: { data: { ...heroFixture, resume_url: 'javascript:alert(1)' } },
    });

    expect(html).not.toContain('javascript:');
    expect(html).not.toContain('>Descargar CV<');
  });
});
