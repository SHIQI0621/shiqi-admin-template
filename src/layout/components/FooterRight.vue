<template>
    <!-- 底部版权信息 -->
    <footer class="app-footer">
        <p> Copyright &copy; {{ new Date().getFullYear() }} {{ title }}</p>
    </footer>
</template>
<script setup lang="ts">
import { APP_TITLE } from '@/setting'
const title = ref(APP_TITLE);
</script>
<style scoped lang="scss">
@use 'sass:map';
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;
.app-footer {
    text-align: center;
    padding: 10px 0;
    box-sizing: border-box;
    color: map.get($light-theme, text-secondary);
    font-size: 13px;
}
</style>