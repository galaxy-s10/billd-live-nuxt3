export { useConsentScriptTrigger, useAnalyticsPageEvent, useElementScriptTrigger, useScript, useScriptGoogleAnalytics, useScriptPlausibleAnalytics, useScriptClarity, useScriptCloudflareWebAnalytics, useScriptFathomAnalytics, useScriptMatomoAnalytics, useScriptGoogleTagManager, useScriptGoogleAdsense, useScriptSegment, useScriptMetaPixel, useScriptXPixel, useScriptIntercom, useScriptHotjar, useScriptStripe, useScriptLemonSqueezy, useScriptVimeoPlayer, useScriptYouTubePlayer, useScriptGoogleMaps, useScriptNpm, useScriptCrisp } from '#app/composables/script-stubs';
export { isVue2, isVue3 } from 'vue-demi';
export { defineNuxtLink } from '#app/components/nuxt-link';
export { useNuxtApp, tryUseNuxtApp, defineNuxtPlugin, definePayloadPlugin, useRuntimeConfig, defineAppConfig } from '#app/nuxt';
export { requestIdleCallback, cancelIdleCallback } from '#app/compat/idle-callback';
export { setInterval } from '#app/compat/interval';
export { useAppConfig, updateAppConfig } from '#app/config';
export { defineNuxtComponent } from '#app/composables/component';
export { useAsyncData, useLazyAsyncData, useNuxtData, refreshNuxtData, clearNuxtData } from '#app/composables/asyncData';
export { useHydration } from '#app/composables/hydrate';
export { callOnce } from '#app/composables/once';
export { useState, clearNuxtState } from '#app/composables/state';
export { clearError, createError, isNuxtError, showError, useError } from '#app/composables/error';
export { useFetch, useLazyFetch } from '#app/composables/fetch';
export { useCookie, refreshCookie } from '#app/composables/cookie';
export { onPrehydrate, prerenderRoutes, useRequestHeader, useRequestHeaders, useRequestEvent, useRequestFetch, setResponseStatus } from '#app/composables/ssr';
export { onNuxtReady } from '#app/composables/ready';
export { preloadComponents, prefetchComponents, preloadRouteComponents } from '#app/composables/preload';
export { abortNavigation, addRouteMiddleware, defineNuxtRouteMiddleware, setPageLayout, navigateTo, useRoute, useRouter } from '#app/composables/router';
export { isPrerendered, loadPayload, preloadPayload, definePayloadReducer, definePayloadReviver } from '#app/composables/payload';
export { useLoadingIndicator } from '#app/composables/loading-indicator';
export { getAppManifest, getRouteRules } from '#app/composables/manifest';
export { reloadNuxtApp } from '#app/composables/chunk';
export { useRequestURL } from '#app/composables/url';
export { usePreviewMode } from '#app/composables/preview';
export { useId } from '#app/composables/id';
export { useRouteAnnouncer } from '#app/composables/route-announcer';
export { onBeforeRouteLeave, onBeforeRouteUpdate, useLink } from 'vue-router';
export { withCtx, withDirectives, withKeys, withMemo, withModifiers, withScopeId, onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onRenderTracked, onRenderTriggered, onServerPrefetch, onUnmounted, onUpdated, computed, customRef, isProxy, isReactive, isReadonly, isRef, markRaw, proxyRefs, reactive, readonly, ref, shallowReactive, shallowReadonly, shallowRef, toRaw, toRef, toRefs, triggerRef, unref, watch, watchEffect, watchPostEffect, watchSyncEffect, isShallow, effect, effectScope, getCurrentScope, onScopeDispose, defineComponent, defineAsyncComponent, resolveComponent, getCurrentInstance, h, inject, hasInjectionContext, nextTick, provide, defineModel, defineOptions, defineSlots, mergeModels, toValue, useModel, useAttrs, useCssModule, useCssVars, useSlots, useTransitionState, Component, ComponentPublicInstance, ComputedRef, ExtractPropTypes, ExtractPublicPropTypes, InjectionKey, PropType, Ref, MaybeRef, MaybeRefOrGetter, VNode } from 'vue';
export { injectHead, useHead, useSeoMeta, useHeadSafe, useServerHead, useServerSeoMeta, useServerHeadSafe } from '@unhead/vue';
export { default as cache } from '../src/utils/cache';
export { initAdsbygoogle } from '../src/utils/google-ad';
export { googleAd, setVideoTrackContentHints, setAudioTrackContentHints, base64ToFile, stringToArrayBuffer, createNullVideo, handleUserMedia, formatMoney, formatTimeHour, formatTime, getLiveRoomPageUrl, getHostnameUrl, getHash, splitFile, formatDownTime, formatDownTime2, saveFile, readFile, generateBase64, getRandomEnglishString, createVideo, videoFullBox, videoToCanvas } from '../src/utils/index';
export { default as request, MyAxiosPromise } from '../src/utils/request';
export { default as stores } from '../src/stores/index';
export { getLastBuildDate, setLastBuildDate } from '../src/utils/localStorage/app';
export { getToken, setToken, clearToken } from '../src/utils/localStorage/user';
export { useImage } from '../node_modules/.pnpm/@nuxt+image@1.7.0_ioredis@5.4.1_magicast@0.3.4_rollup@4.21.0/node_modules/@nuxt/image/dist/runtime/composables';
export { defineStore, acceptHMRUpdate, usePinia, storeToRefs } from '../node_modules/.pnpm/@pinia+nuxt@0.5.3_magicast@0.3.4_rollup@4.21.0_typescript@5.5.4_vue@3.4.38_typescript@5.5.4_/node_modules/@pinia/nuxt/dist/runtime/composables';
export { definePageMeta } from '../node_modules/.pnpm/nuxt@3.12.4_@parcel+watcher@2.4.1_@types+node@22.4.1_eslint@8.57.0_ioredis@5.4.1_magicast@0.3_lsg5lcbcqbwmjqzmtbavgzsmqu/node_modules/nuxt/dist/pages/runtime/composables';