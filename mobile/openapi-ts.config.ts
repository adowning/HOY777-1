import { defaultPlugins } from '@hey-api/openapi-ts';

export default {
  input: {
    path: 'http://localhost:9999/doc',
    watch: true,
  },
  output: 'src/plugins/api/gen',
  plugins: [
    // ...other plugins
    ...defaultPlugins,
    // '@hey-api/transformers',

    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: './src/plugins/api/runtime.client.ts',
    },
    {
      asClass: false, // default 
      name: '@hey-api/sdk',
      // transformer: true,

    },
    // 'zod', 

  ],
};