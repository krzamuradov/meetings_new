<script setup>
    import Navbar from "@/components/app/navbar.vue";
    import { useRoute, useRouter } from "vue-router";
    const route = useRoute();
</script>

<template>
    <Navbar />
    <div class="container p-4 shadow mt-3">
        <div v-if="route.path === '/'">
            <h4 class="text-center fw-bold">{{ $t("index.title") }}</h4>
        </div>
        <RouterView />
    </div>
</template>

<style scoped></style>
