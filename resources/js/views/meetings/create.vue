<script setup>
    import Loading from "@/components/app/loading.vue";
    import Toast from "@/components/app/toast.vue";
    import Input from "@/components/ui/input.vue";
    import useMeetingService from "@/services/useMeetingService";

    const { meeting, loading, successMessage, errorMessage, createMeeting, getErrorMessage } = useMeetingService();
</script>

<template>
    <Toast v-if="successMessage" :message="successMessage" />
    <Toast variant="danger" v-if="errorMessage" :message="errorMessage" />
    <Loading v-if="loading" />
    <RouterLink :to="{ name: 'meetingsList' }" class="btn btn-outline-secondary"><i class="fa fa-reply"></i> {{ $t("meetings.create.buttons.back_to_list") }}</RouterLink>
    <div class="d-flex justify-content-center flex-column align-items-center p-4">
        <h4 class="fw-bold">{{ $t("meetings.create.title") }}</h4>
        <form class="row g-3 col-4" @submit.prevent="createMeeting">
            <div class="col-12">
                <Input name="name_uz" :label="$t('meetings.create.inputs.name_uz')" v-model="meeting.name_uz" :error="getErrorMessage('name_uz')" />
            </div>
            <div class="col-12">
                <Input name="name_en" :label="$t('meetings.create.inputs.name_en')" v-model="meeting.name_en" :error="getErrorMessage('name_en')" />
            </div>
            <div class="col-12">
                <Input
                    type="date"
                    name="meeting_at"
                    :label="$t('meetings.create.inputs.meeting_at')"
                    v-model="meeting.meeting_at"
                    :error="getErrorMessage('meeting_at')"
                />
            </div>
            <div class="col-12">
                <button type="submit" class="form-control btn btn-outline-success"><i class="fa fa-save"></i> {{ $t("meetings.create.buttons.save_btn") }}</button>
            </div>
        </form>
    </div>
</template>

<style scoped></style>
