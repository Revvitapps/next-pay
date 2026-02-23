"use client";

import { useCallback } from 'react';

type UserbackApi = {
  open?: (feedbackType?: string, destination?: string) => void;
  openForm?: (feedbackType?: string, destination?: string) => void;
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

    if (typeof userback.open === 'function') {
      userback.open();
      return;
    }

    if (typeof userback.openForm === 'function') {
      userback.openForm('general', 'form');
      return;
    }

    console.warn('[userback] open methods unavailable');
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
