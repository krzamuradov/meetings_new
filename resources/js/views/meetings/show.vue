<script setup>
    import Loading from "@/components/app/loading.vue";
    import useMeetingService from "@/services/useMeetingService";
    import { onMounted, ref } from "vue";
    import { useRoute } from "vue-router";

    const route = useRoute();
    const meeting_id = route.params.id;

    const { loading, getMeetingById, meeting, documents } = useMeetingService();

    onMounted(async () => {
        await getMeetingById(meeting_id);
        console.log(documents.value);
    });
</script>

<template>
    <Loading v-if="loading" />
    <RouterLink :to="{ name: 'meetingsList' }" class="btn btn-outline-secondary"><i class="fa fa-reply"></i> Назад к списку собрании</RouterLink>
    <div class="d-flex justify-content-center align-items-center flex-column border p-4 mt-3 mb-3">
        <small class="text-muted">Название собрания</small>
        <h3 class="fw-bold">{{ meeting.name_uz }}</h3>
        <small class="text-muted">Дата проведения</small>
        <h5 class="fw-bold">{{ meeting.meeting_at_formatted }}</h5>
    </div>
    <h4 class="text-center fw-bold">Список документов</h4>
    <table class="table table-striped table-hover align-middle text-center">
        <thead>
            <tr>
                <th class="col-1">#</th>
                <th class="col-5">Название</th>
                <th class="col-2">Действие</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(document, i) in documents" :key="document.id">
                <td class="col-1">{{ i + 1 }}</td>
                <td class="col-5">{{ document.name }}</td>
                <td class="col-2">
                    <a :href="document?.url" target="_blank" class="btn">
                        <i class="fa fa-download text-primary"></i>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped></style>
