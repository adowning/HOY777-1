import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
        tailwindcss(),

 AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
       
      ],
      
      dts: 'src/types/auto/components.d.ts',
      // dirs: ['src/composables', 'src/stores'],
      eslintrc: {
        enabled: true,
        globalsPropValue: true,
      },
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      // dirs: ['composables', 'stores'],
      dirs: [
      './composables', // only root modules
      './composables/**', // all nested modules
      // ...
   'stores',
      // {
      //   glob: './hooks',
      //   types: true // enable import the types
      // },
      {
        glob: './composables',
        types: false // If top level dirsScanOptions.types importing enabled, just only disable this directory
      }
      // ...
    ],
    }),
    // AppLoading('loading.html'),

    // 自动按需导入组件
    Components({
      dts: 'src/types/auto/components.d.ts',
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      resolvers: [
        // RekaResolver({
        //   prefix: '' // use the prefix option to add Prefix to the imported components
        // })
      ],
    }),

  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#': path.resolve(__dirname, '../'),
    },
  },
});
