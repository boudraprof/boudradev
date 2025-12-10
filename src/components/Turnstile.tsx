'use client';

import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

declare global {
  interface Window {
    turnstile: {
      render: (element: HTMLElement, options: {
        sitekey: string;
        callback?: (token: string) => void;
        'error-callback'?: () => void;
        'expired-callback'?: () => void;
        theme?: 'light' | 'dark' | 'auto';
        language?: string;
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
}

export interface TurnstileRef {
  reset: () => void;
}

const Turnstile = forwardRef<TurnstileRef, TurnstileProps>(({ 
  siteKey, 
  onVerify, 
  onError,
  theme = 'auto',
  language 
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const scriptLoadedRef = useRef<boolean>(false);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    }
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if script is already in the DOM
    const existingScript = document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]');
    
    if (existingScript) {
      // Script already exists, wait for it to load if needed
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            onVerify(token);
          },
          'error-callback': () => {
            if (onError) onError();
          },
          'expired-callback': () => {
            if (onError) onError();
          },
          theme: theme,
          language: language,
        });
      } else if (!window.turnstile) {
        // Script exists but not loaded yet
        existingScript.addEventListener('load', () => {
          if (containerRef.current && window.turnstile && !widgetIdRef.current) {
            widgetIdRef.current = window.turnstile.render(containerRef.current, {
              sitekey: siteKey,
              callback: (token: string) => {
                onVerify(token);
              },
              'error-callback': () => {
                if (onError) onError();
              },
              'expired-callback': () => {
                if (onError) onError();
              },
              theme: theme,
              language: language,
            });
          }
        });
      }
      return;
    }

    // Load Turnstile script if not already loaded
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      scriptLoadedRef.current = true;
      if (containerRef.current && window.turnstile && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            onVerify(token);
          },
          'error-callback': () => {
            if (onError) onError();
          },
          'expired-callback': () => {
            if (onError) onError();
          },
          theme: theme,
          language: language,
        });
      }
    };

    document.body.appendChild(script);
    scriptLoadedRef.current = true;

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onVerify, onError, theme, language]);

  return <div ref={containerRef} />;
});

Turnstile.displayName = 'Turnstile';

export default Turnstile;

