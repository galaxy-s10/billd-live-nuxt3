import { createI18n } from 'vue-i18n';
import { messages } from '../locales';

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'zh', // set locale
    fallbackLocale: 'zh', // set fallback locale
    messages, // set locale messages
  });

  vueApp.use(i18n);
});
