import { AXIOS_BASEURL } from '~/constant';

const handleRequestInterceptors = () => {};

const handleResponseInterceptors = async () => {};

const fetch = async (url: string, opt: any) => {
  const baseURL = AXIOS_BASEURL;
  const res = await $fetch(baseURL + url, {
    ...opt,
    onRequest: handleRequestInterceptors,
    onResponse: handleResponseInterceptors,
  });
  return res;
};

export default fetch;
