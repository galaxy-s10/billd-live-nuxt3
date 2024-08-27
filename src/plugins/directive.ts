import { directiveLoading } from '~/directives/loading';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('loading', directiveLoading);
});
