import { useState, useEffect } from 'react';

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

export const OfflineBanner = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50">
      <div className="rounded-lg border border-orange-500/20 bg-orange-500/10 backdrop-blur-sm p-4 flex items-start gap-3">
        <div className="h-2 w-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
        <div>
          <h4 className="text-sm font-semibold text-orange-900 dark:text-orange-100">You're Offline</h4>
          <p className="text-xs text-orange-800 dark:text-orange-200 mt-1">
            Check your internet connection. Changes will sync when you're back online.
          </p>
        </div>
      </div>
    </div>
  );
};
