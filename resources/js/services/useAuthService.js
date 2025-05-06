import { loginRequest, logoutRequest } from "@/api/auth";
import router from "@/router";
import { useValidate } from "@/services/validator";
import { ref, watch } from "vue";

export default function useAuthService() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const fullname = user?.firstname + " " + user?.lastname;
    const role_id = user?.role_id;

    const { handleValidationError, getErrorMessage } = useValidate();

    const loading = ref(false);
    const errorMessage = ref("");

    const payload = ref({
        login: "",
        password: "",
    });

    const setLocalStorage = (data) => {
        localStorage.setItem("user", JSON.stringify(data?.user));
        localStorage.setItem("token", data?.token);
    };

    const removeLocalStorage = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const login = async () => {
        loading.value = true;
        try {
            const response = await loginRequest(payload.value);
            setLocalStorage(response);

            router.push({ name: "meetingsList" });
        } catch (e) {
            handleValidationError(e);

            if (e.status === 401) {
                errorMessage.value = e?.response?.data?.message;
            }
        } finally {
            loading.value = false;
        }
    };

    const logout = async () => {
        loading.value = true;
        try {
            const response = await logoutRequest();
        } catch (e) {
            handleValidationError(e);
            console.log(e);
        } finally {
            removeLocalStorage();
            router.push({ name: "login" });
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

    autoClearMessage(errorMessage);

    return {
        token,
        user,
        fullname,
        payload,
        loading,
        errorMessage,
        login,
        logout,
        getErrorMessage,
        removeLocalStorage,
    };
}
