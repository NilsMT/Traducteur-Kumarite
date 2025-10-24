<template>
    <div id="container">
        <header>
            <router-link class="btn btn-normal" to="/">
                Retour à l'accueil
                <span class="material-symbols-outlined"> home </span>
            </router-link>

            <router-link
                v-for="doc in navDocs"
                :key="doc.filename"
                class="btn btn-normal"
                :to="`/reader/${doc.filename}`"
            >
                {{ doc.label }}
            </router-link>

            <ThemeButtonComp />
        </header>

        <iframe :src="pdfUrl" class="pdf-frame"></iframe>
    </div>
</template>

<style scoped>
/* Make container full viewport */
#container {
    display: flex;
    flex-direction: column;
    height: 100vh; /* total viewport height */
    margin: 0;
    padding: 0;
}

/* Header takes its natural height */
header {
    z-index: 10;
    padding: var(--padding);
    gap: var(--gap);
    display: flex;
    justify-content: center;
    align-items: center;

    overflow-x: auto;
    white-space: nowrap;
}

/* iframe fills remaining space */
.pdf-frame {
    flex: 1; /* take all remaining space */
    border: none;
    width: 100%;
}
</style>

<script setup>
import ThemeButtonComp from "@/components/ThemeButtonComp.vue";
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";

const route = useRoute();

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
const pdfUrl = computed(() =>
    route.params.filename ? `/pdf/${route.params.filename}.pdf` : ""
);
</script>
