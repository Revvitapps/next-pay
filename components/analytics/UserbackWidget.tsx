"use client";

import { useEffect, useRef } from 'react';
import Userback from '@userback/widget';

const USERBACK_TOKEN = process.env.NEXT_PUBLIC_USERBACK_TOKEN ?? 'A-HoZrXnPGvJoEmiC0zM7LtT2iN';

export default function UserbackWidget() {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !USERBACK_TOKEN) {
      return;
    }

    initializedRef.current = true;

    Userback(USERBACK_TOKEN, {
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
      },
      on_init_error: () => {
        console.error('[userback] initialization failed');
      }
    })
      .then((widget) => {
        widget.showLauncher();
        widget.show();
      })
      .catch((error) => {
        console.error('[userback] failed to load widget', error);
      });
  }, []);

  return null;
}
