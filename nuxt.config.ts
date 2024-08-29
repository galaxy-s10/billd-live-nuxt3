// import BilldHtmlWebpackPlugin from 'billd-html-webpack-plugin';

import AutoImport from 'unplugin-auto-import/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

import pkg from './package.json';

const buildDir = 'nuxt-build'; // 不要使用dist作为构建目录，否则又会有之前的standard-version问题（拼接路径错误），导致一些ts提示出错
const env = 'prod';
const baseURL = '/';
const port = 3400;
const cdnPath = `https://resource.hsslive.cn/${pkg.name}/${pkg.version}/public`;

console.log('当前环境', env);
console.log('当前端口', port);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  imports: {
    dirs: ['stores', 'utils/localStorage'],
  },

  vite: {
    plugins: [
      // @ts-ignore
      // new BilldHtmlWebpackPlugin({
      //   env: 'nuxt3-6',
      //   log: {
      //     pkgRepository: env !== 'prod',
      //     commitSubject: env !== 'prod',
      //   },
      // }).config,
      AutoImport({
        imports: [
          'vue',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "billd-scss/src/index.scss" as *;@import "~/assets/css/global.scss";',
        },
      },
    },
    // https://www.naiveui.com/zh-CN/os-theme/docs/ssr
    // optimizeDeps: {
    //   include:
    //     process.env.NODE_ENV === 'development'
    //       ? ['naive-ui', 'vueuc', 'date-fns-tz/formatInTimeZone']
    //       : [],
    // },
  },

  alias: {
    // '~': fileURLToPath(new URL('./src', import.meta.url)),
    // '@': fileURLToPath(new URL('./src', import.meta.url)),
    // utils: fileURLToPath(new URL('./src', import.meta.url)),
  },

  // scss: { additionalData: '@use "~/assets/css/global.scss";' },
  // scss: ['~/assets/css/billd-scss.scss'],
  css: ['~/assets/css/normalize.css'],

  // buildDir,

  // https://www.naiveui.com/zh-CN/os-theme/docs/ssr
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer',
          ]
        : ['@juggle/resize-observer'],
  },

  devServer: {
    port,
    host: '0.0.0.0',
  },

  nitro: {
    devProxy: {
      '/prod-api': {
        target: 'http://live-api.hsslive.cn', // 这里是接口地址
        changeOrigin: true,
        // prependPath: true,
      },
      '/api': {
        target: 'http://localhost:4300', // 这里是接口地址
        changeOrigin: true,
        // prependPath: true,
      },
    },
    // routeRules: {
    //   '/ccc/*': {
    //     proxy: 'https://live-api.hsslive.cn/*',
    //     cors: true,
    //     // proxy: 'http://api.hsslive.cn/*',
    //   },
    // },
  },

  modules: [
    // '@nuxtjs/eslint-module',
    '@nuxt/image',
    '@pinia/nuxt',
    'nuxtjs-naive-ui',
  ],

  srcDir: 'src/',

  image: {
    ipx: {
      // 不管正式还是测试环境，nuxt-img都使用/_ipx/前缀
      // https://github.com/nuxt/image/issues/665
      // @ts-ignore
      baseURL: '/_ipx/', // <= Add this config
    },
  },

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: env === 'prod' ? `${cdnPath}/favicon.ico` : '/favicon.ico',
        },
      ],
    },
    baseURL,
    cdnURL: cdnPath,
  },

  compatibilityDate: '2024-08-22',
});
