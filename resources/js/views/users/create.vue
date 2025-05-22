<script setup>
    import Loading from "@/components/app/loading.vue";
    import Toast from "@/components/app/toast.vue";
    import Input from "@/components/ui/input.vue";
    import Select from "@/components/ui/select.vue";
    import useUsersService from "@/services/useUsersService";

    const { user, roles, loading, successMessage, createUser, getErrorMessage } = useUsersService();
</script>

<template>
    <Loading v-if="loading" />
    <Toast v-if="successMessage" :message="successMessage" />
    <RouterLink class="btn btn-outline-secondary" :to="{ name: 'usersList' }"><i class="fa fa-reply"></i> Назад к списку пользователей</RouterLink>
    <div class="d-flex justify-content-center align-items-center">
        <div class="col-5 border p-4">
            <h4 class="fw-bold text-center">Новый пользователь</h4>
            <form class="row g-3" @submit.prevent="createUser">
                <div class="col-12">
                    <Input name="firstname" label="Имя" :error="getErrorMessage('firstname')" v-model="user.firstname" />
                </div>
                <div class="col-12">
                    <Input name="lastname" label="Фамилия" :error="getErrorMessage('lastname')" v-model="user.lastname" />
                </div>
                <div class="col-12">
                    <Input name="login" label="Логин" :error="getErrorMessage('login')" v-model="user.login" />
                </div>
                <div class="col-12">
                    <Input name="password" label="Пароль" :error="getErrorMessage('password')" v-model="user.password" />
                </div>
                <div class="col-12">
                    <Select name="role_id" label="Роль" v-model="user.role_id" :error="getErrorMessage('role_id')">
                        <option v-for="role in roles" :value="role.id">{{ role.name }}</option>
                    </Select>
                </div>
                <div class="col-12">
                    <button class="btn btn-outline-success form-control" type="submit">Сохранить</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped></style>
