"use client";

import { useCallback } from 'react';

type UserbackApi = {
  open?: (feedbackType?: string, destination?: string) => void;
  openForm?: (feedbackType?: string, destination?: string) => void;
  isLoaded?: () => boolean;
  refresh?: () => void;
};

type UserbackWindow = Window & {
  Userback?: UserbackApi;
};

export default function UserbackEdgeButton() {
  const openFeedback = useCallback(async () => {
    const launcherSelectors = [
      'iframe[src*="userback"]',
      'iframe[id*="userback"]',
      '[class*="userback-launcher"]',
      '[id*="userback-launcher"]',
      '[data-testid*="userback"]'
    ];

    for (const selector of launcherSelectors) {
      const launcher = document.querySelector(selector) as HTMLElement | null;
      if (launcher) {
        launcher.click();
        return;
      }
    }

    const waitForUserback = async () => {
      const maxWaitMs = 8000;
      const pollMs = 180;
      const start = Date.now();

      while (Date.now() - start < maxWaitMs) {
        const userback = (window as UserbackWindow).Userback;
        const canOpen = userback && typeof userback.open === 'function';
        const loaded = !userback?.isLoaded || userback.isLoaded();

        if (canOpen && loaded) {
          return userback;
        }

        userback?.refresh?.();
        await new Promise((resolve) => setTimeout(resolve, pollMs));
      }

      return null;
    };

    const userback = await waitForUserback();
    if (!userback) {
      console.warn('[userback] Widget not ready. Verify domain targeting and active widget state in Userback.');
      return;
    }

    userback.open?.();
  }, []);

  return (
    <button
      type="button"
      aria-label="Open feedback"
      onClick={openFeedback}
      className="fixed left-0 top-1/2 z-[9999] -translate-y-1/2 rounded-r-xl border border-cyan-200/60 bg-cyan-300 px-2 py-3 text-xs font-bold tracking-wide text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.35)] [writing-mode:vertical-rl]"
    >
      Feedback
    </button>
  );
}
