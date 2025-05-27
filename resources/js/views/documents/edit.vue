<script setup>
    import BlockScreen from "@/components/app/block-screen.vue";
    import Loading from "@/components/app/loading.vue";
    import Toast from "@/components/app/toast.vue";
    import Input from "@/components/ui/input.vue";
    import Select from "@/components/ui/select.vue";
    import useDocumentsService from "@/services/useDocumentsService";
    import useMeetingService from "@/services/useMeetingService";
    import { computed, onMounted, ref, watch, watchEffect } from "vue";
    import { useRoute, useRouter } from "vue-router";

    const route = useRoute();
    const router = useRouter();
    const document_id = route.params.id;
    const { document, loading: documentLoading, successMessage, fileChange, getDocumentById, createDocument, updateDocument, getErrorMessage } = useDocumentsService();

    const handleSubmit = async (event) => {
        await updateDocument(document_id, event);
    };

    onMounted(async () => {
        getDocumentById(document_id);
    });
</script>

<template>
    <Toast v-if="successMessage" :message="successMessage" />
    <Loading v-if="documentLoading" />
    <button class="btn btn-outline-secondary" @click="router.back()"><i class="fa fa-reply"></i> Majlislar ro'yxatiga qaytish</button>
    <div class="p-4 d-flex justify-content-center align-items-center">
        <form class="row g-3 col-4 border p-4" @submit.prevent="handleSubmit">
            <div class="text-center">
                <h4>Обновление документа</h4>
            </div>
            <div class="col-12">
                <Input name="name" label="Название" v-model="document.name" :error="getErrorMessage('name')" />
            </div>
            <div class="col-12">
                <Select name="locale" label="Язык документа" v-model="document.locale" :error="getErrorMessage('locale')">
                    <option value="">Выберите язык</option>
                    <option value="uz">O'zbekcha</option>
                    <option value="en">English</option>
                </Select>
            </div>
            <div class="col-12">
                <Select name="position" label="Порядковый номер" v-model="document.position" :error="getErrorMessage('position')">
                    <option v-for="i in 50" :value="i" :key="i">{{ i }}</option>
                </Select>
            </div>
            <div class="col-12">
                <Input type="file" name="file" label="Файл" @change="fileChange" :error="getErrorMessage('file')" />
            </div>
            <div class="col-12">
                <button class="form-control btn btn-outline-success">Обновить</button>
            </div>
        </form>
    </div>
</template>

<style scoped></style>
