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
                    <a href="" class="btn"><i class="fa fa-eye text-success"></i></a>
                    <a href="" class="btn"><i class="fa fa-edit text-primary"></i></a>
                    <a href="" class="btn"><i class="fa fa-trash text-danger"></i></a>
                </td>
            </tr>
        </template>
    </Table>
</template>

<style scoped></style>
