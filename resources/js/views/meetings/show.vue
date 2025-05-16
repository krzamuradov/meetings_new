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
    });
</script>

<template>
    <Loading v-if="loading" />
    <RouterLink :to="{ name: 'meetingsList' }" class="btn btn-outline-secondary"><i class="fa fa-reply"></i> {{ $t("meetings.show.buttons.back_to_list") }}</RouterLink>
    <div class="d-flex justify-content-center align-items-center flex-column border p-4 mt-3 mb-3">
        <small class="text-muted">{{ $t("meetings.show.meeting_name") }}</small>
        <h3 class="fw-bold">{{ meeting.name }}</h3>
        <small class="text-muted">{{ $t("meetings.show.meeting_at") }}</small>
        <h5 class="fw-bold">{{ meeting.meeting_at_formatted }}</h5>
    </div>
    <div v-if="documents.length === 0">
        <h3 class="fw-bold text-center">{{ $t("meetings.show.documents_not_found") }}</h3>
    </div>
    <div v-else>
        <h4 class="text-center fw-bold">{{ $t("meetings.show.table.title") }}</h4>
        <div class="p-4 border"></div>
        <table class="table table-striped table-hover align-middle text-center">
            <thead>
                <tr>
                    <th class="col-1">#</th>
                    <th class="col-5">{{ $t("meetings.show.table.columns.name") }}</th>
                    <th class="col-2">{{ $t("meetings.show.table.columns.actions") }}</th>
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
    </div>
</template>

<style scoped></style>
