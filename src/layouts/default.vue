<template>
  <div class="layout">
    <!-- <div class="fixed-mask"></div> -->
    <LayoutHead></LayoutHead>
    <NuxtPage></NuxtPage>
    <LayoutSidebar></LayoutSidebar>
    <!-- <LoginModal v-if="appStore.showLoginModal"></LoginModal> -->
    <!-- <img
      class="pay-course"
      src="@/assets/img/pay-course.webp"
      alt=""
      @click="openToTarget(COMMON_URL.payCoursesArticle)" /> -->
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.layout {
  box-sizing: border-box;
  padding-top: $header-height;
  min-height: 100vh;

  .fixed-mask {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 50;
    width: 400px;
    height: 300px;
    background-color: #ffd700;
    background-image: linear-gradient(239deg, #ffd700 0%, #ffffff 100%);
    opacity: 0.2;
    filter: blur(70px);
    pointer-events: none;
  }
  .pay-course {
    position: fixed;
    right: 10px;
    bottom: 10px;
    z-index: 999;
    width: 300px;
    border-radius: 10px;
    cursor: pointer;
  }
}
</style>
