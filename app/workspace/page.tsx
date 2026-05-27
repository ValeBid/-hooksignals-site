import WorkspacePreview from "../components/workspace-preview";
import UpgradePrompt from "../components/upgrade-prompt";
import SiteFooter from "../components/site-footer";

export const metadata = {
  title: "Workspace | HookSignals",
  description:
    "Explore the future creator workspace direction for HookSignals workflows and saved systems.",
};

export default function WorkspacePage() {
  return (
    <main className="min-h-screen bg-[#030507] text-white">
      <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8 md:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
            Creator workspace
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] md:text-7xl">
            Build repeatable publishing systems.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/55">
            HookSignals is preparing for saved workflows, creator memory and connected publishing systems.
          </p>
        </div>

        <WorkspacePreview />

        <UpgradePrompt
          title="Advanced creator workflows are coming."
          description="Future premium layers will include saved analyses, connected workflow memory and deeper creator intelligence systems."
        />
      </div>

      <SiteFooter />
    </main>
  );
}
