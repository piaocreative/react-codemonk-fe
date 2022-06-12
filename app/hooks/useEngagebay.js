import { useEffect } from 'react';

const useEngagebay = url => {
  useEffect(() => {
    let script = '';

    if (!window.EhAPI) {
      window.EhAPI = {};
    }
    const EhAPI = window.EhAPI || {};
    EhAPI.after_load = function() {
      EhAPI.set_account('gt439ai8bgke4d4o2n14dr7ci9', 'codemonk');
      EhAPI.execute('rules');
    };
    (function(d, s, f) {
      script = document.createElement(s);
      script.type = 'text/javascript';
      script.async = true;
      script.src = f;
      const m = document.getElementsByTagName(s)[0];
      m.parentNode.insertBefore(script, m);
    })(document, 'script', '//d2p078bqz5urf7.cloudfront.net/jsapi/ehform.js');

    return () => {
      try {
        document.body.removeChild(script);
      } catch {}
    };
  }, [url]);
};

export default useEngagebay;
