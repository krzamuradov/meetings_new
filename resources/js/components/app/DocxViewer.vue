<script setup>
    import { ref, onMounted } from "vue";
    import { renderAsync } from "docx-preview";
    import { useRoute, useRouter } from "vue-router";

    const route = useRoute();
    const router = useRouter();
    console.log(route);

    const url = route.query.url;

    const container = ref(null);
    const styleContainer = ref(null);

    async function loadAndRenderDocx() {
        if (!container.value || !(container.value instanceof HTMLElement)) {
            console.error("container.value не HTMLElement");
            return;
        }
        if (!styleContainer.value || !(styleContainer.value instanceof HTMLElement)) {
            console.error("styleContainer.value не HTMLElement");
            return;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Ошибка загрузки: ${response.statusText}`);

            const arrayBuffer = await response.arrayBuffer();

            container.value.textContent = "";

            await renderAsync(arrayBuffer, container.value, styleContainer.value, {
                className: "docx-preview",
                inWrapper: false,
                experimental: true,
                ignoreWidth: true,
                ignoreHeight: true,
                renderChanges: true,
                renderAltChunks: true,
            });
        } catch (e) {
            console.error("Ошибка при рендеринге DOCX:", e);
        }
    }

    onMounted(() => {
        loadAndRenderDocx();
    });
</script>

<template>
    <button @click="router.back()" class="btn btn-outline-secondary mb-3"><i class="fa fa-reply"></i> Hujjatlar ro'yxatiga qaytish</button>
    <div class="d-flex justify-content-center align-items-center">
        <div ref="styleContainer" style="width: 0; height: 0; overflow: hidden; position: absolute; left: -9999px"></div>

        <div ref="container"></div>
    </div>
</template>

<style scoped>
    .docx-container .docx-preview {
        background-color: none !important;
        font-family: Arial, sans-serif;
        line-height: 1.5;
    }
    .docx-container [style*="background"] {
        background-color: white !important;
    }
</style>
