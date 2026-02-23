"use client";

import { useEffect } from 'react';

type UserbackInitApi = {
  init?: (token: string, options?: Record<string, unknown>) => void;
};

type UserbackWindow = Window & {
  Userback?: UserbackInitApi;
  __userbackInitialized?: boolean;
};

const USERBACK_TOKEN = process.env.NEXT_PUBLIC_USERBACK_TOKEN ?? 'A-HoZrXnPGvJoEmiC0zM7LtT2iN';
const USERBACK_SCRIPT_ID = 'userback-widget-script';

function initUserback() {
  const userbackWindow = window as UserbackWindow;
  if (userbackWindow.__userbackInitialized) return;
  if (!userbackWindow.Userback?.init || !USERBACK_TOKEN) return;

  userbackWindow.Userback.init(USERBACK_TOKEN, {
    is_live: true,
    widget_settings: {
      trigger_type: 'page_load',
      style: 'text',
      position: 'left'
    },
    user_data: {
      id: 'nextpay-public-visitor',
      info: {
        name: 'Website Visitor',
        email: 'visitor@nextpaypos.com'
      }
    }
  });

  userbackWindow.__userbackInitialized = true;
}

export default function UserbackBootstrap() {
  useEffect(() => {
    if (!USERBACK_TOKEN) return;

    const existingScript = document.getElementById(USERBACK_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      if ((window as UserbackWindow).Userback?.init) {
        initUserback();
      } else {
        existingScript.addEventListener('load', initUserback, { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    script.id = USERBACK_SCRIPT_ID;
    script.src = 'https://static.userback.io/widget/v1.js';
    script.async = false;
    script.defer = false;
    script.onload = initUserback;
    script.onerror = () => {
      console.error('[userback] failed to load script');
    };
    (document.head || document.body).appendChild(script);
  }, []);

  return null;
}
