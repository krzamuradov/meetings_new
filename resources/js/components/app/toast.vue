<script setup>
    const props = defineProps({
        variant: { type: String, default: "success" },
        message: { type: String, required: true },
    });
</script>

<template>
    <div class="toast-container p-3 top-0 start-50 translate-middle-x">
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div :class="['toast-header', 'text-white', 'bg-' + props.variant]">
                <strong class="me-auto">Уведомление</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <h6 class="toast-body text-center fw-bold">{{ props.message }}</h6>
        </div>
    </div>
</template>

<style scoped></style>
