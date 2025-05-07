<script setup>
    import Table from "@/components/ui/table.vue";
    import useUsersService from "@/services/useUsersService";
    import { onMounted } from "vue";

    const { users, getAllUsers } = useUsersService();

    onMounted(() => {
        getAllUsers();
    });
</script>

<template>
    <RouterLink class="btn btn-outline-success mb-3" :to="{ name: 'userCreate' }"><i class="fa fa-plus"></i> Новый пользователь</RouterLink>
    <Table>
        <template #thead>
            <tr>
                <th>#</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
        </template>
        <template #tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.firstname }}</td>
                <td>{{ user.lastname }}</td>
                <td>{{ user.role.name }}</td>
                <td>
                    <RouterLink class="btn" :to="{ name: 'userEdit', params: { id: user.id } }"><i class="fa fa-edit text-primary"></i></RouterLink>
                    <a href="" class="btn"><i class="fa fa-trash text-danger"></i></a>
                </td>
            </tr>
        </template>
    </Table>
</template>

<style scoped></style>
