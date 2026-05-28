export default function manifest() {
  return {
    name: 'HookSignals',
    short_name: 'HookSignals',
    description: 'AI creator intelligence tools for hooks, titles, thumbnails and retention.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070a18',
    theme_color: '#0ea5e9',
    icons: [
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
