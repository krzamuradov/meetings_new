<script setup>
    import PDF from "pdf-vue3";
    import { useRoute, useRouter } from "vue-router";

    const route = useRoute();
    const router = useRouter();
    const url = route.query.url;
    console.log(url);

    const props = defineProps({
        url: { type: String },
    });
</script>

<template>
    <div class="container mt-4">
        <button @click="router.back()" class="btn btn-outline-secondary mb-3"><i class="fa fa-reply"></i> Hujjatlar ro'yxatiga qaytish</button>
        <PDF :src="url" pdfWidth="70%" scrollThreshold="10" />
    </div>
</template>
