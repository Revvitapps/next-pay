"use client";

import { useCallback } from 'react';

type UserbackApi = {
  open?: (feedbackType?: string, destination?: string) => void;
  openForm?: (feedbackType?: string, destination?: string) => void;
  openPortal?: () => void;
  show?: () => void;
  showLauncher?: () => void;
  refresh?: () => void;
};

type UserbackWindow = Window & {
  Userback?: UserbackApi;
};

export default function UserbackEdgeButton() {
  const openFeedback = useCallback(() => {
    const userback = (window as UserbackWindow).Userback;
    if (!userback) {
      console.error('[userback] widget not available');
      return;
    }

    userback.refresh?.();
    userback.showLauncher?.();
    userback.show?.();

    try {
      if (typeof userback.open === 'function') {
        userback.open('general', 'form');
        return;
      }
    } catch (error) {
      console.warn('[userback] open general form failed', error);
    }

    try {
      if (typeof userback.openForm === 'function') {
        userback.openForm('general', 'form');
        return;
      }
    } catch (error) {
      console.warn('[userback] openForm failed', error);
    }

    try {
      if (typeof userback.open === 'function') {
        userback.open('bug', 'screenshot');
        return;
      }
    } catch (error) {
      console.warn('[userback] fallback open bug screenshot failed', error);
    }

    if (typeof userback.openPortal === 'function') {
      userback.openPortal();
      return;
    }

    const launchers = [
      '#userback-button',
      '[class*="userback"] button',
      '[id*="userback"] button',
      '[class*="userback-launcher"]'
    ];

    for (const selector of launchers) {
      const element = document.querySelector(selector) as HTMLElement | null;
      if (element) {
        element.click();
        return;
      }
    }

    console.warn('[userback] no callable open method found');
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
