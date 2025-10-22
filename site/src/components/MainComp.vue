<template>
    <h1>Traducteur</h1>
    <h1 class="kuma">Traducteur</h1>

    <div id="main" class="translator">
        <div class="textzone">
            <div class="com">Français</div>

            <textarea
                id="fr"
                v-model="txt"
                :readonly="arrowDirection === 'left'"
                :style="{ height: textHeight + 'px' }"
                @input="syncHeight"
            ></textarea>

            <div class="first-com">
                La zone de saisie s'adapte<br />
                <sub class="first-com">à peu de choses près</sub>
            </div>
        </div>

        <button class="switch-btn btn btn-normal" @click="toggleDirection">
            <div>{{ arrowDirection === "right" ? "➡️" : "⬅️" }}</div>
        </button>

        <div class="textzone">
            <div class="com kuma">Kumarite</div>

            <textarea
                id="km"
                v-model="txt"
                :readonly="arrowDirection === 'right'"
                class="kuma"
                :style="{ height: textHeight + 'px' }"
                @input="syncHeight"
            ></textarea>

            <div>à la longueur de votre texte !</div>
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

function syncHeight() {
    const a = document.getElementById("fr");
    const b = document.getElementById("km");

    // reset
    a.style.height = "auto";
    b.style.height = "auto";

    // get best
    const aHeight = a.scrollHeight;
    const bHeight = b.scrollHeight;

    const bestHeight = Math.max(aHeight, bHeight);

    // apply
    textHeight.value = bestHeight;

    a.style.height = bestHeight + "px";
    b.style.height = bestHeight + "px";
}

// Init
onMounted(() => {
    nextTick(() => {
        syncHeight();
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
    resize: none;
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

.com.kuma {
    font-size: calc(var(--text-size) * 2);
}

.com:not(.kuma) {
    line-height: calc(var(--text-size) * 2);
}

.com {
    margin-bottom: var(--padding);
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
}

.first-com {
    text-align: right;
    width: 100%;
}

.com {
    text-align: center;
}
</style>
