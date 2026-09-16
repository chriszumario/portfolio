import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';
import ProjectCard from '../../../src/features/projects/ProjectCard.astro';
import { projectFixture } from '../../support/fixtures';

let container: AstroContainer;

beforeAll(async () => {
  container = await AstroContainer.create();
});

describe('ProjectCard', () => {
  it('renders project metadata and secure external links', async () => {
    const html = await container.renderToString(ProjectCard, { props: { project: projectFixture } });

    expect(html).toContain('Compiler');
    expect(html).toContain('Destacado');
    expect(html).toContain('TypeScript');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it('drops unsafe project links', async () => {
    const html = await container.renderToString(ProjectCard, {
      props: {
        project: { ...projectFixture, demo_url: 'javascript:alert(1)', github_url: 'data:text/html,test' },
      },
    });

    expect(html).not.toContain('javascript:');
    expect(html).not.toContain('data:text/html');
    expect(html).not.toContain('>Preview<');
  });
});
