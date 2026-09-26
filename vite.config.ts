import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";
// mcpPlugin disabled: its pre-transform crashes Rollup's parser and blanks the app.
// The MCP edge function (supabase/functions/mcp/index.ts) is already bundled and deployed.
// To regenerate it after MCP source changes, re-enable this and run the extractor once.
// import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // The prerender bundle includes its dependencies, so CommonJS packages load cleanly in Node.
  ssr: { noExternal: true },
  build: {
    // Code splitting for better caching
    rollupOptions: {
      output: {
        // The build-time prerender bundle (vite build --ssr) needs no chunk splitting.
        manualChunks: isSsrBuild ? undefined : {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-tooltip',
          ],
          'query-vendor': ['@tanstack/react-query'],
          // Split heavy admin-only libs so rotas públicas nunca as baixem
          'charts-vendor': ['recharts'],
          'pdf-vendor': ['jspdf', 'html2canvas'],
          'editor-vendor': [
            '@tiptap/react',
            '@tiptap/starter-kit',
            '@tiptap/extension-image',
            '@tiptap/extension-link',
          ],
        },

      },
    },
    // Minification
    target: 'esnext',
    minify: 'esbuild',
  },
  plugins: [
    react(),
    // mcpPlugin(),
    mode === "development" && componentTagger(),
    !isSsrBuild && VitePWA({
      // The precached index.html kept returning visitors on an old build (its revision never changed
      // between deploys). selfDestroying ships a sw.js that unregisters itself and clears its caches.
      selfDestroying: true,
      registerType: "autoUpdate",
      includeAssets: ["favicon.png", "robots.txt"],
      manifest: {
        name: "ClickOne AI - Recepcionista Virtual",
        short_name: "ClickOne",
        description: "Recepcionista virtual com IA que atende chamadas 24/7",
        theme_color: "#500daa",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
        runtimeCaching: [
          {
            // Cache Supabase API requests for offline mode
            urlPattern: /^https:\/\/ojyzegzdlpjlbdhvqhav\.supabase\.co\/rest\/v1\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "supabase-api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
              networkTimeoutSeconds: 10,
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Cache Google Fonts
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            // Cache font files
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-files",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
