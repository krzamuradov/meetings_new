<script setup>
    import Loading from "@/components/app/loading.vue";
    import Toast from "@/components/app/toast.vue";
    import Input from "@/components/ui/input.vue";
    import useAuthService from "@/services/useAuthService";
    import { ref } from "vue";

    const { loading, payload, errorMessage, login, getErrorMessage } = useAuthService();
    const locale = ref(localStorage.getItem("locale"));

    const changeLocale = () => {
        localStorage.setItem("locale", locale.value);
        location.reload();
    };
</script>

<template>
    <Loading v-if="loading" />
    <Toast variant="danger" v-if="errorMessage" :message="errorMessage" />
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="col-4 border p-4">
            <div class="text-center"><img src="@/assets/logo.png" alt="Logo" width="130px" /></div>
            <h3 class="fw-bold text-center">{{ $t("login.block_title") }}</h3>
            <div class="col-12 mb-3">
                <select name="" id="" class="form-select" @change="changeLocale" v-model="locale">
                    <option value="uz">UZ</option>
                    <option value="en">EN</option>
                </select>
            </div>

            <form class="row g-3" @submit.prevent="login">
                <div class="col-12">
                    <Input name="login" :label="$t('login.login')" v-model="payload.login" :error="getErrorMessage('login')" />
                </div>
                <div class="col-12">
                    <Input type="password" name="password" :label="$t('login.password')" v-model="payload.password" :error="getErrorMessage('password')" />
                </div>
                <div class="col-12">
                    <button class="btn btn-outline-success form-control" type="submit">{{ $t("login.button") }}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped></style>
