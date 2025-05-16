<script setup>
    import { ref, watch } from "vue";

    const password = ref("");

    function generatePassword(length = 12) {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}";
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);
        return Array.from(array, (x) => charset[x % charset.length]).join("");
    }

    function generate() {
        password.value = generatePassword(8);
    }

    const refVal = ref("");

    watch(refVal, (newVal, oldVal) => {
        console.log(oldVal, newVal);
    });
</script>

<template>
    <button @click="generate">Сгенерировать</button>

    <input type="text" v-model="refVal" />
    <p>{{ password }}</p>
</template>
