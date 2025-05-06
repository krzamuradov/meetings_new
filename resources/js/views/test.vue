<script setup>
    import TestComponent from "@/components/app/test-component.vue";

    const testEmit = () => {
        console.log("Test emit");
    };
</script>

<template>
    <TestComponent @test="testEmit" />
</template>

<style scoped></style>
