// hooks/useCurrentUrl.ts
"use client";

import { useState, useEffect } from 'react';

export function useCurrentUrl(providedUrl?: string) {
  const [currentUrl, setCurrentUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (providedUrl) {
        setCurrentUrl(providedUrl);
      } else {
        setCurrentUrl(window.location.href);
      }
    }
  }, [providedUrl]);

  return currentUrl;
}