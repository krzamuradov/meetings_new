<script setup>
    import { ref, onMounted } from "vue";
    import { renderAsync } from "docx-preview";

    const container = ref(null);
    const styleContainer = ref(null);

    const docxUrl = "http://meetings.local/storage/documents/mvQHDYmSZadqTOUNWFFQOwnB0.docx";

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
            const response = await fetch(docxUrl);
            if (!response.ok) throw new Error(`Ошибка загрузки: ${response.statusText}`);

            const arrayBuffer = await response.arrayBuffer();

            container.value.textContent = "";

            await renderAsync(arrayBuffer, container.value, styleContainer.value, {
                className: "docx-preview",
                inWrapper: false,
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
    <div class="d-flex justify-content-center align-items-center">
        <div ref="styleContainer" style="width: 0; height: 0"></div>

        <div ref="container" class=""></div>
    </div>
</template>

<style scoped></style>
