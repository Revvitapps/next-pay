"use client";

import { useEffect, useRef } from 'react';
import Userback from '@userback/widget';

const USERBACK_TOKEN = 'A-HoZrXnPGvJoEmiC0zM7LtT2iN';

export default function UserbackWidget() {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }

    initializedRef.current = true;

    Userback(USERBACK_TOKEN, {
      user_data: {
        id: 'nextpay-public-visitor',
        info: {
          name: 'Website Visitor',
          email: 'visitor@nextpaypos.com'
        }
      }
    });
  }, []);

  return null;
}
