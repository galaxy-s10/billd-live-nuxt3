<template>
  <div>
    <div class="tab-list">
      <div
        v-for="(item, index) in appStore.areaList"
        :key="index"
        class="tab"
        :class="{
          active: router.currentRoute.value.params.id === item.id + '',
        }"
        @click.prevent="changeArea(item)"
      >
        {{ item.name }}
      </div>
    </div>

    <NuxtPage></NuxtPage>
  </div>
</template>

<script lang="ts" setup>
import { IArea } from '@/interface';
import { useAppStore } from '~/stores/app';

const router = useRouter();
const appStore = useAppStore();

function changeArea(item: IArea) {
  router.push({ name: 'area-id', params: { id: item.id } });
}

await appStore.getAreaList();
onMounted(() => {
  const item = appStore.areaList[0];
  if (item) {
    changeArea(item);
  }
});
</script>

<style lang="scss" scoped>
.tab-list {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  height: 40px;
  font-size: 14px;
  padding: 0 30px;

  user-select: none;
  .tab {
    position: relative;
    margin-right: 20px;
    cursor: pointer;
    &.active {
      color: $theme-color-gold;
      font-size: 16px;

      &::after {
        position: absolute;
        bottom: -6px;
        left: 50%;
        width: 20px;
        height: 2px;
        border-radius: 10px;
        background-color: $theme-color-gold;
        content: '';
        transform: translateX(-50%);
      }
    }
  }
}
</style>
