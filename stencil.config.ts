import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil-ssr',
  outputTargets: [
    {
      type: 'www',
      baseUrl: 'http://localhost:3030',
      serviceWorker: null
    }
  ]
};
