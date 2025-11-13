<template>
    <header>
        <!-- Thème -->
        <!-- Home link if withHome is true -->
        <router-link
            v-if="withHome"
            to="/"
            class="material-symbols-outlined btn btn-normal"
        >
            home
        </router-link>

        <router-link
            v-for="doc in navDocs"
            :key="doc.filename"
            class="btn btn-normal"
            :to="`/reader/${doc.filename}`"
        >
            {{ doc.label }}
        </router-link>

        <ThemeButtonComp id="theme" />
    </header>
</template>

<script setup>
import ThemeButtonComp from "./ThemeButtonComp.vue";
import { defineProps, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";

const route = useRoute();

const props = defineProps({
    withHome: {
        type: Boolean,
        default: false,
    },
});

const docs = [
    { filename: "Texte", label: "Texte" },
    { filename: "Monolithe", label: "Monolithe" },
    { filename: "Vérité", label: "Vérité" },
    { filename: "Brainstorming", label: "Brainstorming" },
];

const navDocs = computed(() => {
    // if route param undefined, return all docs
    if (!route.params?.filename) return docs;
    return docs.filter((doc) => doc.filename !== route.params.filename);
});
</script>

<style scoped>
header {
    margin-top: var(--padding);
    padding: var(--padding);
    background-color: var(--bg);
    box-shadow: 0px 0px 20px #0005;
    border-radius: var(--radius);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--gap);
}

#theme {
    padding: var(--small-padding);
    cursor: pointer;
}

.home-link {
    padding: var(--small-padding);
    cursor: pointer;
    text-decoration: none;
    color: inherit;
}
</style>
