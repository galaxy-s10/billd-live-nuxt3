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
      :status="status"
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
  </div>
</template>

<script lang="ts" setup>
import { openToTarget } from 'billd-utils';
import { onMounted, ref } from 'vue';

import { fetchLiveRoomList } from '@/api/area';
import LongList from '@/components/LongList/index.vue';
import {
  ILiveRoom,
  LiveRoomIsShowEnum,
  LiveRoomPullIsShouldAuthEnum,
  LiveRoomUseCDNEnum,
} from '@/types/ILiveRoom';
import { LiveRoomTypeEnum } from '~/enum';

const router = useRouter();
const route = useRoute();

const longListRef = ref<InstanceType<typeof LongList>>();
const topRef = ref<HTMLDivElement>();
const height = ref(-1);
const status = ref<'loading' | 'nonedata' | 'allLoaded' | 'normal'>('loading');

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

const { data } = await useAsyncData(async () => {
  let loading = true;
  let hasMore = true;
  const liveRoomList = [];
  const pageParams = {
    nowPage: 1,
    pageSize: 50,
  };
  try {
    status.value = 'loading';
    loading = true;
    const res = await fetchLiveRoomList({
      id: Number(route.params.id),
      live_room_is_show: LiveRoomIsShowEnum.yes,
      nowPage: pageParams.nowPage,
      pageSize: pageParams.pageSize,
    });
    if (res.code === 200) {
      hasMore = res.data.hasMore;
      liveRoomList.push(...res.data.rows);
    }
    loading = false;
    return { liveRoomList: res.data.rows, pageParams, hasMore, loading };
  } catch (error: any) {
    status.value = 'normal';
    loading = false;
    console.log(error);
    return { errorMsg: error.message, pageParams, loading };
  }
});

onMounted(() => {
  handleHeight();
  window.addEventListener('resize', handleHeight);
  handleStatus();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleHeight);
});

function handleStatus() {
  if (data.value && longListRef.value) {
    if (data.value.loading) {
      status.value = 'loading';
    } else if (data.value.hasMore) {
      status.value = 'normal';
    } else {
      status.value = 'allLoaded';
    }
    if (!data.value.liveRoomList?.length) {
      status.value = 'nonedata';
    }
  }
}

function handleHeight() {
  if (topRef.value) {
    height.value =
      document.documentElement.clientHeight -
      topRef.value.getBoundingClientRect().top;
  }
}

function getListData() {
  if (data.value?.loading) return;
  if (!data.value?.hasMore) return;
  data.value.pageParams.nowPage += 1;
  getData();
}

async function getData() {
  if (!data.value) return;
  try {
    if (data.value.loading) return;
    data.value.loading = true;
    if (longListRef.value) {
      status.value = 'loading';
    }
    const res = await fetchLiveRoomList({
      id: Number(route.params.id),
      live_room_is_show: LiveRoomIsShowEnum.yes,
      nowPage: data.value.pageParams.nowPage,
      pageSize: data.value.pageParams.pageSize,
    });
    if (res.code === 200) {
      data.value?.liveRoomList?.push(...res.data.rows);
      data.value.hasMore = res.data.hasMore;
    }
  } catch (error) {
    data.value.pageParams.nowPage -= 1;
    console.log(error);
  }
  data.value.loading = false;
  handleStatus();
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
