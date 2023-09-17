import type { NextRouter } from 'next/router';
import { useEffect } from 'react';

// https://github.com/vercel/next.js/issues/2694#issuecomment-934429427
export default function usePreventNavigation(
  router: NextRouter,
  shouldPrevent: boolean,
  warning: string,
) {
  useEffect(() => {
    const warningText = warning;

    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!shouldPrevent) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };

    const handleBrowseAway = () => {
      if (!shouldPrevent) return;
      if (window.confirm(warningText)) return;
      router.events.emit('routeChangeError');
      if (router.asPath !== window.location.pathname) {
        window.history.pushState('', '', router.asPath);
      }
      throw 'routeChange aborted.';
    };

    window.addEventListener('beforeunload', handleWindowClose);
    router.events.on('routeChangeStart', handleBrowseAway);

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      router.events.off('routeChangeStart', handleBrowseAway);
    };
  }, [shouldPrevent, router, warning]);
}
