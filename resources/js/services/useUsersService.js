import { createUserRequest, getUserByIdRequest, getUsersRequest, updateUserRequest } from "@/api/users";
import { useValidate } from "@/services/validator";
import { ref, watch } from "vue";

export default function useUsersService() {
    const loading = ref(false);
    const users = ref([]);
    const successMessage = ref("");
    const roles = [
        { id: 1, name: "Administrator" },
        { id: 2, name: "Moderator" },
        { id: 3, name: "User" },
    ];
    const user = ref({
        firstname: "",
        lastname: "",
        login: "",
        password: "",
        role_id: 3,
    });

    const { getErrorMessage, handleValidationError } = useValidate();

    const getAllUsers = async () => {
        loading.value = true;
        try {
            const response = await getUsersRequest();

            users.value = response;
        } catch (e) {
            console.log(e);
        } finally {
            loading.value = false;
        }
    };

    const createUser = async () => {
        loading.value = true;
        try {
            const response = await createUserRequest(user.value);
            successMessage.value = response?.message;
        } catch (e) {
            handleValidationError(e);
            console.log(e);
        } finally {
            loading.value = false;
        }
    };

    const updateUser = async (id) => {
        loading.value = true;
        try {
            const response = await updateUserRequest(id, user.value);
            successMessage.value = response?.message;
        } catch (e) {
            handleValidationError(e);
            console.log(e);
        } finally {
            loading.value = false;
        }
    };

    const getUserById = async (id) => {
        loading.value = true;
        try {
            const response = await getUserByIdRequest(id);
            user.value = response;
        } catch (e) {
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
        users,
        user,
        loading,
        successMessage,
        roles,
        getAllUsers,
        getUserById,
        createUser,
        updateUser,

        getErrorMessage,
    };
}
