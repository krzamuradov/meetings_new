import { ref, watchEffect } from "vue";

export function useValidate() {
    const errors = ref({});

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
