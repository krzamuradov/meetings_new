import { createDocumentRequest } from "@/api/document";
import useMeetingService from "@/services/useMeetingService";
import { useValidate } from "@/services/validator";
import { computed, onMounted, ref, watch, watchEffect } from "vue";

const { handleValidationError, getErrorMessage } = useValidate();

export default function useDocumentsService(getMeetingById) {
    const loading = ref(false);
    const successMessage = ref("");
    const document = ref({
        meeting_id: null,
        name: "",
        locale: "",
        file: null,
    });

    const fileChange = (event) => {
        document.value.file = event.target.files[0];
    };

    const createDocument = async (event, meeting_id) => {
        loading.value = true;
        try {
            document.value.meeting_id = meeting_id;
            const response = await createDocumentRequest(document.value);
            successMessage.value = response?.message;
            document.value = {
                meeting_id: meeting_id,
                name: "",
                locale: "",
                file: null,
            };
            event.target.elements.file.value = null;
            await getMeetingById(meeting_id);
        } catch (e) {
            handleValidationError(e);
            console.log(e);
        } finally {
            loading.value = false;
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

    return {
        document,
        loading,
        successMessage,
        createDocument,
        fileChange,
        getErrorMessage,
    };
}
