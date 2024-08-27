import { fetchTypeList } from '~/api/type';
import { useAppStore } from '~/stores/app';
export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.server) {
    // @ts-ignore
    const appStore = useAppStore(nuxtApp.$pinia);
    // const res = await fetchTypeList({});
    // appStore.setTypeList(res.data.rows);
  }
});
