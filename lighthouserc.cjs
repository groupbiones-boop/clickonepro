/**
 * Lighthouse CI config.
 * Roda o build de produção, sobe um preview local e falha se as metas
 * de performance/SEO ficarem abaixo do limite.
 */
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'bunx vite preview --port 4173 --host',
      startServerReadyPattern: 'Local:',
      url: [
        'http://localhost:4173/',
        'http://localhost:4173/contato',
        'http://localhost:4173/sobre',
      ],
      numberOfRuns: 1,
      settings: {
        preset: 'desktop',
        chromeFlags: '--no-sandbox --headless=new',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
