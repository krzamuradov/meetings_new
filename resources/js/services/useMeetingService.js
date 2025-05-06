import { createMeetingRequest, getMeetingByIdRequest, getMeetingsRequest, updateMeetingRequest } from "@/api/meetings";
import { useValidate } from "@/services/validator";
import { computed, onMounted, ref, watch, watchEffect } from "vue";

const { handleValidationError, getErrorMessage } = useValidate();

export default function useMeetingService() {
    const meetings = ref([]);
    const documents = ref([]);
    const meeting = ref({
        name_uz: "",
        name_en: "",
        meeting_at: "",
    });

    const setDefaultPayload = () => {
        meeting.value = {
            name_uz: "",
            name_en: "",
            meeting_at: "",
        };
    };

    const loading = ref(false);

    const successMessage = ref("");
    const errorMessage = ref("");

    const createMeeting = async () => {
        loading.value = true;
        try {
            const response = await createMeetingRequest(meeting.value);
            successMessage.value = response?.message;

            setDefaultPayload();
        } catch (e) {
            handleValidationError(e);
            if (e.status === 422) {
                errorMessage.value = "Заполните все поля";
            }
            console.log(e);
        } finally {
            loading.value = false;
        }
    };

    const getAllMeetings = async () => {
        loading.value = true;
        try {
            const response = await getMeetingsRequest();
            meetings.value = response.map((meeting) => ({
                id: meeting.id,
                name: localStorage.getItem("locale") === "uz" ? meeting?.name_uz : meeting?.name_en,
                meeting_at: meeting.meeting_at_formatted,
            }));
            console.log(meetings.value);
        } catch (e) {
            console.log(e);
        } finally {
            loading.value = false;
        }
    };

    const getMeetingById = async (id) => {
        loading.value = true;
        const locale = localStorage.getItem("locale");
        try {
            const response = await getMeetingByIdRequest(id);
            console.log(response);

            documents.value = response?.documents.filter((doc) => {
                return doc.locale === locale;
            });
            meeting.value = response;
        } catch (e) {
            console.log(e);
        } finally {
            loading.value = false;
        }
    };

    const updateMeeting = async (id) => {
        try {
            const response = await updateMeetingRequest(id, meeting.value);
            successMessage.value = response?.message;
        } catch (e) {
            handleValidationError(e);
            console.log(e);
        }
    };

    const autoClearMessage = (msgRef, delay = 2000) => {
        watch(msgRef, (val) => {
            if (val) {
                setTimeout(() => (msgRef.value = ""), delay);
            }
        });
    };

    autoClearMessage(successMessage);
    autoClearMessage(errorMessage);

    return {
        loading,
        meeting,
        meetings,
        documents,
        successMessage,
        errorMessage,
        getAllMeetings,
        createMeeting,
        getErrorMessage,
        getMeetingById,
        updateMeeting,
    };
}
