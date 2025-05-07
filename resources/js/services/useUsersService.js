import { createUserRequest, getUserByIdRequest, getUsersRequest, updateUserRequest } from "@/api/users";
import { useValidate } from "@/services/validator";
import { ref } from "vue";

export default function useUsersService() {
    const loading = ref(false);
    const users = ref([]);
    const user = ref({
        firstname: "",
        lastname: "",
        login: "",
        password: "",
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
        } catch (e) {
            handleValidationError(e);
            console.log(e);
        } finally {
            loading.value = false;
        }
    };

    const updateUser = async (id) => {
        console.log(id);

        loading.value = true;
        try {
            const response = await updateUserRequest(id, user.value);
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

    return {
        users,
        user,
        loading,
        getAllUsers,
        getUserById,
        createUser,
        updateUser,

        getErrorMessage,
    };
}
