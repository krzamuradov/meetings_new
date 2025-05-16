<script setup>
    import { computed, onMounted, ref } from "vue";

    import { can } from "@/services/permissions";
    import useMeetingService from "@/services/useMeetingService";
    import Loading from "@/components/app/loading.vue";
    import Pagination from "@/components/app/pagination.vue";
    import { useRouter } from "vue-router";

    const { meetings, loading, getAllMeetings } = useMeetingService();
    const router = useRouter();

    const currentPage = ref(1);
    const perPage = 10;
    const totalPages = computed(() => Math.ceil(meetings.value.length / perPage));

    const paginatedMeetings = computed(() => {
        const start = (currentPage.value - 1) * perPage;
        return meetings.value.slice(start, start + perPage);
    });

    const redirectToMeetingShow = (id) => {
        router.push({ name: "meetingShow", params: { id: id } });
    };

    onMounted(() => {
        getAllMeetings();
    });
</script>

<template>
    <Loading v-if="loading" />
    <RouterLink class="btn btn-outline-success rounded-3" :to="{ name: 'meetingCreate' }" v-if="can('create-meeting')">
        <i class="fa fa-plus"></i> {{ $t("meetings.list.buttons.new_meeting") }}
    </RouterLink>
    <h4 v-if="!meetings.length" class="text-center text-muted fw-bold">{{ $t("meetings.list.meetings_not_found") }}</h4>
    <table class="table table-striped table-hover align-middle text-center" v-if="meetings.length > 0">
        <thead>
            <tr>
                <th class="col-1">#</th>
                <th class="col-9">{{ $t("meetings.list.table.columns.name") }}</th>
                <th @click="filterDateCaret = !filterDateCaret" class="col-4 hover">
                    {{ $t("meetings.list.table.columns.meeting_at") }} <i class="fa fa-caret-up text-danger"></i>
                </th>
                <th class="col-1" v-if="can('create-meeting')">{{ $t("meetings.list.table.columns.actions") }}</th>
                <th class="col-1" v-if="can('create-meeting')">{{ $t("meetings.list.table.columns.docs") }}</th>
            </tr>
        </thead>
        <tbody>
            <tr class="hover" v-for="(meeting, i) in paginatedMeetings" :key="meeting.id" @click="redirectToMeetingShow(meeting.id)">
                <td class="col-1">{{ i + 1 }}</td>
                <td class="col-5">{{ meeting.name }}</td>
                <td class="col-4">{{ meeting.meeting_at }}</td>
                <td class="col-2">
                    <RouterLink
                        @click.stop
                        class="btn"
                        :to="{ name: 'meetingEdit', params: { id: meeting.id } }"
                        :title="$t('meetings.list.buttons.edit_meeting_title')"
                        v-if="can('create-meeting')"
                    >
                        <i class="fa fa-edit text-primary"></i>
                    </RouterLink>
                </td>
                <td>
                    <RouterLink
                        @click.stop
                        class="btn"
                        :to="{ name: 'documentCreate', query: { meeting_id: meeting.id } }"
                        :title="$t('meetings.list.buttons.new_document_title')"
                        v-if="can('create-meeting')"
                    >
                        <i class="fa fa-plus text-danger"></i>
                    </RouterLink>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="d-flex justify-content-start align-items-center">
        <Pagination v-model:currentPage="currentPage" :totalPages="totalPages" />
    </div>
</template>

<style scoped>
    .hover {
        cursor: pointer;
    }
</style>
