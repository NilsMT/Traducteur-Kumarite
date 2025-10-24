import { createRouter, createWebHistory } from "vue-router";

import Error404View from "@/views/Error404View.vue";
import WIPView from "@/views/WIPView.vue";
import TraducteurView from "@/views/TraducteurView.vue";
import PDFReaderView from "@/views/PDFReaderView.vue";

const WIPPath = [
    // "UnfinishedView",
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/reader/:filename",
            name: "PDFReader",
            component: PDFReaderView,
        },
        // Traducteur
        {
            path: "/",
            name: "Traducteur Kumarite",
            component: TraducteurView,
        },

        // WIP
        {
            path: "/wip",
            name: "Page en construction",
            component: WIPView,
        },

        // Error 404 (it last)
        {
            path: "/:pathMatch(.*)*",
            name: "Erreur 404",
            component: Error404View,
        },
    ],
    /* scroll to anchor */
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
            };
        }
        return {
            x: 0,
            y: 0,
        };
    },
});

router.beforeEach((to, from, next) => {
    window.scrollTo({ top: 0 });

    document.title = `${to.name}`;

    if (WIPPath.includes(to.path)) {
        next({ path: "/WIP" });
    } else {
        next();
    }
});

export default router;
