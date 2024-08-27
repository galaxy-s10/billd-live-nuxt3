import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default" | "error"
declare module "../../node_modules/.pnpm/nuxt@3.12.4_@parcel+watcher@2.4.1_@types+node@22.4.1_eslint@8.57.0_ioredis@5.4.1_magicast@0.3_lsg5lcbcqbwmjqzmtbavgzsmqu/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}