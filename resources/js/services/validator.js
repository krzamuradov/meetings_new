import { ref, watch, watchEffect } from "vue";

export function useValidate() {
    const errors = ref({});
    const errorFields = ref({});
    const errorMessage = ref("");

    const validate = (error) => {
        if (error.response?.status === 422 && error.response.data?.errors) {
            errors.value = error.response.data.errors;
        }
    };

    const handleValidationError = (error) => {
        if (error.response?.status === 422 && error.response.data?.errors) {
            errors.value = error.response.data.errors;
        } else {
            errors.value = {};
        }
    };

    const getErrorMessage = (field) => {
        return errors.value[field]?.[0] || "";
    };

    watch([errorFields, errorMessage], ([updatedFields, updatedMessage]) => {
        if (updatedFields) {
            setTimeout(() => (errorFields.value = {}), 2000);
        }
        if (updatedMessage) {
            setTimeout(() => (errorMessage.value = ""), 2000);
        }
    });

    watchEffect(() => {
        if (errors.value) {
            setTimeout(() => (errors.value = ""), 2000);
        }
    });

    return {
        errors,
        handleValidationError,
        getErrorMessage,
    };
}
