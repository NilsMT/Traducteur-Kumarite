<template>
    <h1>Traducteur</h1>
    <h1 class="kuma">Traducteur</h1>
    <div id="main" class="translator">
        <div class="textzone">
            <textarea
                v-model="txt"
                :readonly="arrowDirection === 'left'"
                :style="{ height: textHeight + 'px' }"
                @input="syncHeight($event)"
            ></textarea>
            <div class="com first-com">La zone de saisie s'adapte</div>
        </div>

        <button class="switch-btn btn btn-normal" @click="toggleDirection">
            <div>
                {{ arrowDirection === "right" ? "➡️" : "⬅️" }}
            </div>
        </button>

        <div class="textzone">
            <textarea
                v-model="txt"
                :readonly="arrowDirection === 'right'"
                class="kuma"
                :style="{ height: textHeight + 'px' }"
                @input="syncHeight($event)"
            ></textarea>
            <div class="com">à la longueur de votre texte !</div>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";

const txt = ref("");
const arrowDirection = ref("right");
const textHeight = ref(0);

function toggleDirection() {
    arrowDirection.value = arrowDirection.value === "right" ? "left" : "right";
}

function syncHeight(e) {
    const el = e.target;
    el.style.height = "auto";
    textHeight.value = el.scrollHeight; // read actual content height
    el.style.height = textHeight.value + "px"; // apply it
}

// Initialize height once after mount
onMounted(() => {
    nextTick(() => {
        const firstTextarea = document.querySelector("textarea");
        if (firstTextarea) {
            firstTextarea.style.height = "auto";
            textHeight.value = firstTextarea.scrollHeight;
            firstTextarea.style.height = textHeight.value + "px";
        }
    });
});
</script>

<style scoped>
.translator {
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: row;
    gap: var(--gap);
    padding: var(--padding);
}

.translator > * {
    border: solid 4px var(bg--dark);
}

textarea {
    width: calc(100% - (var(--padding) * 2));
    min-height: calc(var(--text-size));
    resize: vertical;
}

.textzone {
    width: 45%;
}

.switch-btn {
    font-size: 1.5em;
    background: none;
    border: none;
    cursor: pointer;

    display: flex;
    align-items: start;
    justify-content: center;

    position: sticky;
    top: var(--padding);
    left: 0;
}

h1.kuma {
    margin: 0;
    padding: 0;
}

textarea:read-only {
    filter: brightness(0.5);
}

textarea.kuma {
    font-size: calc(var(--text-size) * 2);
    font-weight: bold;
}

textarea:not(.kuma) {
    line-height: calc(var(--text-size) * 2);
    letter-spacing: calc(var(--text-size) * 0.4);
}

.first-com {
    text-align: right;
}
</style>
