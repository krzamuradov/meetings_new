import { getUsersRequest } from "@/api/users";
import { ref } from "vue";

export default function useUsersService() {
    const loading = ref(false);
    const users = ref([]);

    const getAllUsers = async () => {
        loading.value = true;
        try {
            const response = await getUsersRequest();
            // console.log(response);

            users.value = response;
        } catch (e) {
            console.log(e);
        } finally {
            loading.value = false;
        }
    };

    return {
        users,
        loading,
        getAllUsers,
    };
}
