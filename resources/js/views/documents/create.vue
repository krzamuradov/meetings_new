<script setup>
    import BlockScreen from "@/components/app/block-screen.vue";
    import Loading from "@/components/app/loading.vue";
    import Toast from "@/components/app/toast.vue";
    import Input from "@/components/ui/input.vue";
    import Select from "@/components/ui/select.vue";
    import useDocumentsService from "@/services/useDocumentsService";
    import useMeetingService from "@/services/useMeetingService";
    import { computed, onMounted, ref, watch, watchEffect } from "vue";
    import { useRoute } from "vue-router";

    const route = useRoute();
    const meeting_id = route.query.meeting_id;

    const { meeting, loading: meetingLoading, getMeetingById } = useMeetingService();
    const { document, loading: documentLoading, successMessage, fileChange, createDocument, getErrorMessage } = useDocumentsService(getMeetingById);

    const handleSubmit = async (event) => {
        await createDocument(event, meeting_id);
    };

    onMounted(async () => {
        await getMeetingById(meeting_id);
    });
</script>

<template>
    <BlockScreen v-if="!meeting_id" />
    <Toast v-if="successMessage" :message="successMessage" />
    <Loading v-if="documentLoading || meetingLoading" />
    <RouterLink :to="{ name: 'meetingsList' }" class="btn btn-outline-secondary"><i class="fa fa-reply"></i> Назад к списку собрании</RouterLink>
    <div class="p-3 d-flex justify-content-center align-items-center flex-column">
        <small class="text-muted">Название собрания</small>
        <h3 class="fw-bold">{{ meeting.name_uz }}</h3>
    </div>
    <div class="p-4 d-flex justify-content-center align-items-center">
        <form class="row g-3 col-4 border p-4" @submit.prevent="handleSubmit">
            <div class="text-center">
                <h4>Новый документ</h4>
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
                <Input type="file" name="file" label="Файл" @change="fileChange" :error="getErrorMessage('file')" />
            </div>
            <div class="col-12">
                <button class="form-control btn btn-outline-success">Сохранить</button>
            </div>
        </form>
    </div>
    <h3 class="text-center fw-bold">Список документов</h3>
    <table class="table table-striped table-hover align-middle text-center">
        <thead>
            <tr>
                <th class="col-1">#</th>
                <th class="col-5">Название</th>
                <th class="col-4">Язык</th>
                <th class="col-2">Действие</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(document, i) in meeting.documents" :key="document.id">
                <td class="col-1">{{ i + 1 }}</td>
                <td class="col-5">{{ document.name }}</td>
                <td class="col-4">{{ document.locale }}</td>
                <td class="col-2">
                    <RouterLink class="btn" :to="{ name: 'documentEdit', params: { id: meeting.id } }" title="Редактировать">
                        <i class="fa fa-edit text-primary"></i>
                    </RouterLink>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped></style>
