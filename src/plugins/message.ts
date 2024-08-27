import Message from '~/components/Message/index.vue';

export default defineNuxtPlugin((nuxtApp: any) => {
  if (process.client) {
    // @ts-ignore
    const message = createApp(Message);
    const messageEle = document?.createElement('div');
    // @ts-ignore
    message.mount(messageEle);
  }
});
