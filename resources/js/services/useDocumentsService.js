import { createDocumentRequest, getDocumentByIdRequest, updateDocumentRequest, deleteDocumentRequest } from "@/api/document";
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
        position: 1,
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

    const updateDocument = async (document_id, event) => {
        loading.value = true;
        try {
            const response = await updateDocumentRequest(document_id, document.value);
            // successMessage.value = response?.message;
            // document.value = {
            //     name: "",
            //     locale: "",
            //     position: 1,
            //     file: null,
            // };
            // event.target.elements.file.value = null;
        } catch (e) {
            handleValidationError(e);
            console.log(e);
        } finally {
            loading.value = false;
        }
    };

    const deleteDocument = async (document_id, meeting_id) => {
        loading.value = true;

        try {
            await deleteDocumentRequest(document_id);
            await getMeetingById(meeting_id);
        } catch (e) {
            console.log(e);
        } finally {
            loading.value = false;
        }
    };

    const getDocumentById = async (id) => {
        try {
            const response = await getDocumentByIdRequest(id);

            document.value = {
                name: response?.name,
                locale: response?.locale,
                position: response?.position,
                file: null,
            };
        } catch (e) {
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

    return {
        document,
        loading,
        successMessage,
        createDocument,
        updateDocument,
        deleteDocument,
        getDocumentById,
        fileChange,
        getErrorMessage,
    };
}
