<script setup>
import { RouterView } from "vue-router";
</script>

<template>
    <div id="app_cont">
        <RouterView />
    </div>
</template>

<style scoped>
#app_cont {
    position: relative;
    min-height: 100vh;
    z-index: 1;
    color: var(--text);
}

:global(body) {
    margin: 0;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: var(--bg);
}
</style>
