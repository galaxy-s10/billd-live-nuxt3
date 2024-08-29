<template>
  <div
    ref="topRef"
    class="area-wrap"
    :style="{ height: height + 'px' }"
  >
    <LongList
      ref="longListRef"
      class="list"
      :root-margin="{
        top: 0,
        bottom: 200,
        left: 0,
        right: 0,
      }"
      @get-list-data="getListData"
    >
      <div
        v-for="(item, index) in data.liveRoomList"
        :key="index"
        class="item"
        @click="goRoom(item)"
      >
        <div
          v-lazy:background-image="item?.cover_img || item?.users?.[0]?.avatar"
          class="cover"
        >
          <PullAuthTip
            v-if="
              item?.pull_is_should_auth === LiveRoomPullIsShouldAuthEnum.yes
            "
          ></PullAuthTip>
          <div
            v-if="item?.live"
            class="living-ico"
          >
            直播中
          </div>
          <div
            v-if="
              item?.cdn === LiveRoomUseCDNEnum.yes ||
              [
                LiveRoomTypeEnum.tencent_css,
                LiveRoomTypeEnum.tencent_css_pk,
              ].includes(item.type!)
            "
            class="cdn-ico"
          >
            <div class="txt">CDN</div>
          </div>
          <div class="txt">{{ item?.users?.[0]?.username }}</div>
        </div>
        <div class="desc">{{ item?.name }}</div>
      </div>
    </LongList>
    <div v-if="loading"></div>
    <div
      v-else-if="!data.liveRoomList.length"
      class="null"
    >
      {{ t('common.nonedata') }}
    </div>
    <div
      v-else-if="!hasMore"
      class="done"
    >
      {{ hasMore }}
      {{ t('common.allLoaded') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { openToTarget } from 'billd-utils';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { fetchLiveRoomList } from '@/api/area';
import LongList from '@/components/LongList/index.vue';
import {
  ILiveRoom,
  LiveRoomIsShowEnum,
  LiveRoomPullIsShouldAuthEnum,
  LiveRoomUseCDNEnum,
} from '@/types/ILiveRoom';
import { LiveRoomTypeEnum } from '~/enum';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const longListRef = ref<InstanceType<typeof LongList>>();
const topRef = ref<HTMLDivElement>();
const height = ref(-1);
const loading = ref(false);
const hasMore = ref(true);

watch(
  () => route.params.id,
  (newVal) => {
    if (!newVal) return;
    if (!data.value) return;
    if (data.value.liveRoomList) {
      data.value.liveRoomList = [];
    }
    data.value.pageParams.nowPage = 0;
    getData();
  }
);

function goRoom(item: ILiveRoom) {
  if (!item.live) {
    window.$message.info('该直播间没在直播~');
    return;
  }
  const url = router.resolve({
    name: 'pull',
    params: { roomId: item.id },
  });
  openToTarget(url.href);
}

// await getData();
const { data } = await useAsyncData(async () => {
  const liveRoomList = [];
  const pageParams = {
    nowPage: 1,
    pageSize: 50,
  };
  try {
    const res = await fetchLiveRoomList({
      id: Number(route.params.id),
      live_room_is_show: LiveRoomIsShowEnum.yes,
      nowPage: pageParams.nowPage,
      pageSize: pageParams.pageSize,
    });
    if (res.code === 200) {
      liveRoomList.push(...res.data.rows);
    }
    return { liveRoomList: res.data.rows, pageParams };
  } catch (error: any) {
    console.log(error);
    return { errorMsg: error.message, pageParams };
  }
});

onMounted(() => {
  handleHeight();
  window.addEventListener('resize', handleHeight);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleHeight);
});

function handleHeight() {
  if (topRef.value) {
    height.value =
      document.documentElement.clientHeight -
      topRef.value.getBoundingClientRect().top;
  }
}

function getListData() {
  if (!hasMore.value) return;
  getData();
}

async function getData() {
  if (!data.value) return;
  try {
    if (loading.value) return;
    loading.value = true;
    data.value.pageParams.nowPage += 1;
    if (longListRef.value) {
      longListRef.value.loading = true;
    }
    const res = await fetchLiveRoomList({
      id: Number(route.params.id),
      live_room_is_show: LiveRoomIsShowEnum.yes,
      nowPage: data.value.pageParams.nowPage,
      pageSize: data.value.pageParams.pageSize,
    });
    if (res.code === 200) {
      data.value?.liveRoomList?.push(...res.data.rows);
      hasMore.value = res.data.hasMore;
    }
  } catch (error) {
    data.value.pageParams.nowPage -= 1;
    console.log(error);
  }
  loading.value = false;
  if (longListRef.value) {
    longListRef.value.loading = false;
  }
}
</script>

<style lang="scss" scoped>
.area-wrap {
  padding: 0 20px;

  .list {
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      display: inline-block;
      margin-right: 25px;
      margin-bottom: 12px;
      width: 300px;
      cursor: pointer;
      .cover {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 150px;
        border-radius: 8px;
        background-position: center center;
        background-size: cover;
        .living-ico {
          position: absolute;
          top: 0px;
          left: 0px;
          z-index: 10;
          padding: 0 10px;
          height: 20px;
          border-radius: 8px 0 10px;
          background-color: $theme-color-gold;
          color: white;
          text-align: center;
          font-size: 12px;
          line-height: 20px;
        }
        .cdn-ico {
          position: absolute;
          top: -10px;
          right: -10px;
          z-index: 2;
          width: 70px;
          height: 28px;
          background-color: #f87c48;
          color: white;
          transform: rotate(45deg);
          transform-origin: bottom;
          .txt {
            margin-left: 18px;
            background-image: initial !important;
            font-size: 13px;
          }
        }

        .txt {
          position: absolute;
          bottom: 0;
          left: 0;
          box-sizing: border-box;
          padding: 4px 8px;
          width: 100%;
          border-radius: 0 0 4px 4px;
          background-image: linear-gradient(
            -180deg,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.6)
          );
          color: white;
          text-align: initial;
          font-size: 13px;

          @extend %singleEllipsis;
        }
      }
      .desc {
        margin-top: 4px;
        font-size: 14px;

        @extend %singleEllipsis;
      }
    }
  }
  .null,
  .none {
    width: 100%;
    text-align: center;
  }
  .paging-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
}
</style>
