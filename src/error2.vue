<template>
  <NuxtLayout name="error">
    <div class="error-wrap">
      <span>遇到了错误~，</span>
      <span
        class="link"
        @click="$router.push('/')"
        >点我</span
      >
      <span>返回首页</span>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.error-wrap {
  padding: 30px;
  .link {
    color: red;
    cursor: pointer;
  }
}
</style>
