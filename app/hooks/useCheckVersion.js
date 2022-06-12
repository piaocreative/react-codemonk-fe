import { useEffect } from 'react';
import StorageService from 'utils/StorageService';
import packageJson from '../../package.json';

const useCheckVersion = url => {
  useEffect(() => {
    const checkAppVersion = () => {
      const currentVersion = packageJson.version;
      const browserVersion = StorageService.get('appVersion');
      if (currentVersion !== browserVersion) {
        if (caches) {
          caches.keys().then(names => {
            // eslint-disable-next-line no-restricted-syntax
            for (const name of names) caches.delete(name);
          });
        }
        window.location.reload(true);
        StorageService.set('appVersion', currentVersion, { hash: true });
      }
    };

    checkAppVersion();
  }, [url]);
};

export default useCheckVersion;
