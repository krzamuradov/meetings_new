<script setup>
    import Loading from "@/components/app/loading.vue";
    import Toast from "@/components/app/toast.vue";
    import Input from "@/components/ui/input.vue";
    import useAuthService from "@/services/useAuthService";
    import { useI18n } from "vue-i18n";
    import { ref, watch } from "vue";

    const { locale: i18nLocale } = useI18n();
    const { loading, payload, errorMessage, login, getErrorMessage } = useAuthService();

    const locale = ref(localStorage.getItem("locale") || "uz");
    i18nLocale.value = locale.value;

    const setLocale = (lang) => {
        locale.value = lang;
    };

    watch(locale, (val) => {
        i18nLocale.value = val;
        localStorage.setItem("locale", val);
    });
</script>

<template>
    <Loading v-if="loading" />
    <Toast variant="danger" v-if="errorMessage" :message="errorMessage" />
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="col-4 border p-4">
            <div class="text-center"><img src="@/assets/logo.png" alt="Logo" width="130px" /></div>
            <h3 class="fw-bold text-center">{{ $t("login.block_title") }}</h3>
            <div class="col-12 mb-3 d-flex justify-content-end">
                <button class="btn locale-btn" @click="setLocale('uz')"><span class="fi fi-uz"></span>UZ</button>
                <button class="btn locale-btn" @click="setLocale('ru')"><span class="fi fi-ru"></span>РУ</button>
                <button class="btn locale-btn" @click="setLocale('en')"><span class="fi fi-us"></span>EN</button>
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

<style scoped>
    .locale-btn:hover {
        color: red !important;
    }
</style>
