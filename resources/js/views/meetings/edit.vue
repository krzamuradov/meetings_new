<script setup>
    import Loading from "@/components/app/loading.vue";
    import Toast from "@/components/app/toast.vue";
    import Input from "@/components/ui/input.vue";
    import useMeetingService from "@/services/useMeetingService";
    import { onMounted, ref } from "vue";
    import { useRoute } from "vue-router";

    const { meeting, loading, successMessage, getMeetingById, updateMeeting, getErrorMessage } = useMeetingService();

    const route = useRoute();
    const meeting_id = route.params.id;

    onMounted(() => {
        getMeetingById(meeting_id);
    });
</script>

<template>
    <Toast v-if="successMessage" :message="successMessage" />
    <Loading v-if="loading" />
    <RouterLink :to="{ name: 'meetingsList' }" class="btn btn-outline-secondary"><i class="fa fa-reply"></i> {{ $t("meetings.edit.buttons.back_to_list") }}</RouterLink>
    <div class="d-flex justify-content-center flex-column align-items-center p-4">
        <h4 class="fw-bold">{{ $t("meetings.edit.title") }}</h4>
        <form class="row g-3 col-4" @submit.prevent="updateMeeting(meeting_id)">
            <div class="col-12">
                <Input name="name_uz" v-model="meeting.name_uz" :label="$t('meetings.edit.inputs.name_uz')" :error="getErrorMessage('name_uz')" />
            </div>
            <div class="col-12">
                <div class="form-floating">
                    <Input name="name_en" v-model="meeting.name_en" :label="$t('meetings.edit.inputs.name_en')" :error="getErrorMessage('name_en')" />
                </div>
            </div>
            <div class="col-12">
                <Input type="date" name="meeting_at" v-model="meeting.meeting_at" :label="$t('meetings.edit.inputs.meeting_at')" :error="getErrorMessage('meeting_at')" />
            </div>
            <div class="col-12">
                <button type="submit" class="form-control btn btn-outline-success"><i class="fa fa-save"></i> {{ $t("meetings.edit.buttons.update_btn") }}</button>
            </div>
        </form>
    </div>
</template>

<style scoped></style>
