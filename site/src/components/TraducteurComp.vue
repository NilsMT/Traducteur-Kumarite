<template>
    <h1>Traducteur</h1>
    <h1 class="kuma">Traducteur</h1>

    <div class="translator">
        <!-- Kumarite Text Zone -->
        <div class="textzone" id="kumarite">
            <div class="com kuma">Kumarite</div>

            <textarea
                id="km"
                v-model="txt"
                :readonly="arrowDirection === 'left'"
                class="kuma"
                :style="{ height: textHeight + 'px' }"
                @input="syncHeight"
            ></textarea>

            <div class="com-bot">
                La zone de saisie s'adapte<br />
                <sub>à peu de choses près</sub>
            </div>
        </div>

        <!-- Switch Button -->
        <button class="btn btn-normal switch-btn" @click="toggleDirection">
            {{ arrowDirection === "right" ? "➡️" : "⬅️" }}
        </button>

        <!-- French Text Zone -->
        <div class="textzone" id="french">
            <div class="com">Français</div>

            <textarea
                id="fr"
                v-model="txt"
                :readonly="arrowDirection === 'right'"
                :style="{ height: textHeight + 'px' }"
                @input="syncHeight"
            ></textarea>

            <div class="com-bot">à la longueur de votre texte !</div>
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

/******************** */

.textzone {
    width: 45%;
    display: flex;
    flex-direction: column;
}

#kumarite {
    justify-items: left;
    align-items: end;
}

#french {
    justify-items: right;
    align-items: start;
}

/******************** */

.switch-btn {
    font-size: 1.5em;
    background: none;
    border: none;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    position: sticky;
    top: var(--padding);
    left: 0;
}

/******************** */

h1.kuma {
    margin: 0;
    padding: 0;
}

/******************** */

.com {
    padding: var(--padding);
    font-size: calc(var(--text-size) * 1.2);
    text-align: center;
}

.com.kuma {
    font-size: calc(var(--text-size) * 2.4);
    padding-right: 0;
}

.com:not(.kuma) {
    line-height: calc(var(--text-size) * 2);
    padding-left: 0;
}

/******************** */

textarea {
    width: calc(100% - (var(--padding) * 2));
    min-height: calc(var(--text-size));
    resize: none;
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

/******************** */

.com-bot {
    margin-top: var(--padding);
}

#kumarite .com-bot {
    text-align: right;
    width: 100%;
}
</style>
