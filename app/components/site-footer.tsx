export default function SiteFooter() {
  return (
    <footer className="mx-auto max-w-7xl px-6 pb-10 pt-16 text-sm text-white/40">
      <div className="border-t border-white/10 pt-8">
        <div className="flex flex-wrap gap-4">
          <a href="/tools">All Tools</a>
          <a href="/hook-analyzer">Hook Analyzer</a>
          <a href="/hook-improver">Hook Improver</a>
          <a href="/youtube-hook-generator">YouTube Hook Generator</a>
          <a href="/youtube-title-generator">YouTube Title Generator</a>
          <a href="/shorts-script-generator">Shorts Script Generator</a>
          <a href="/thumbnail-text-checker">Thumbnail Text Checker</a>
          <a href="/viewer-retention-tips">Retention Tips</a>
          <a href="/sitemap.xml">Sitemap</a>
        </div>

        <p className="mt-6">
          HookSignals helps creators test hooks, titles, thumbnails, scripts and
          retention signals before publishing.
        </p>
      </div>
    </footer>
  );
}