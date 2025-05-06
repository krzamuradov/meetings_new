<script setup>
    const emit = defineEmits(["test"]);

    const testEmit = () => {
        emit("test");
    };
</script>

<template>
    <button @click="testEmit">Нажми</button>
</template>

<style scoped></style>
