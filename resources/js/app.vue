<script setup>
    import { onMounted } from "vue";
    onMounted(() => {
        if (!localStorage.getItem("locale")) {
            localStorage.setItem("locale", "uz");
        }
    });
</script>

<template>
    <RouterView></RouterView>
</template>

<style scoped></style>
