<template>
    <div id="main_cont">
        <HeaderComp />

        <TraducteurComp class="section" />
    </div>
</template>

<style scoped>
#main_cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

.section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>

<script setup>
import HeaderComp from "@/components/HeaderComp.vue";
import TraducteurComp from "@/components/TraducteurComp.vue";
</script>
