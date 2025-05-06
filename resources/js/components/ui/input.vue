<script setup>
    const props = defineProps({
        name: { type: String, default: null },
        label: { type: String, default: null },
        type: { type: String, default: "text" },
        required: { type: Boolean, default: true },
        error: { type: String, default: null },
    });

    const model = defineModel();
</script>

<template>
    <div class="form-floating">
        <input :type="props.type" class="form-control" :name="props.name" :id="props.name" v-bind="$attrs" v-model="model" :class="{ 'is-invalid': error }" />
        <label :for="props.name">{{ props.label }} <span class="text-danger fw-bold" v-if="props.required">*</span></label>
        <div v-if="error" class="invalid-feedback">{{ error }}</div>
    </div>
</template>

<style scoped></style>
