<script setup>
    import Toast from "@/components/app/toast.vue";
    import Input from "@/components/ui/input.vue";
    import useMeetingService from "@/services/useMeetingService";
    import { onMounted, ref } from "vue";
    import { useRoute } from "vue-router";

    const { getMeetingById, updateMeeting, getErrorMessage, meeting, successMessage } = useMeetingService();

    const route = useRoute();
    const meeting_id = route.params.id;

    onMounted(() => {
        getMeetingById(meeting_id);
    });
</script>

<template>
    <Toast v-if="successMessage" :message="successMessage" />
    <RouterLink :to="{ name: 'meetingsList' }" class="btn btn-outline-secondary"><i class="fa fa-reply"></i> Назад к списку собрании</RouterLink>
    <div class="d-flex justify-content-center flex-column align-items-center p-4">
        <h4 class="fw-bold">Редактирование собрания</h4>
        <form class="row g-3 col-4" @submit.prevent="updateMeeting(meeting_id)">
            <div class="col-12">
                <Input name="name_uz" v-model="meeting.name_uz" label="Название на узбекском" :error="getErrorMessage('name_uz')" />
            </div>
            <div class="col-12">
                <div class="form-floating">
                    <Input name="name_en" v-model="meeting.name_en" label="Название на английском" :error="getErrorMessage('name_en')" />
                </div>
            </div>
            <div class="col-12">
                <Input type="date" name="meeting_at" v-model="meeting.meeting_at" label="Дата собрания" :error="getErrorMessage('meeting_at')" />
            </div>
            <div class="col-12">
                <button type="submit" class="form-control btn btn-outline-success">Обновить</button>
            </div>
        </form>
    </div>
</template>

<style scoped></style>
