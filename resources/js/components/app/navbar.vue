<script setup>
    import { can } from "@/services/permissions";
    import useAuthService from "@/services/useAuthService";
    import { ref } from "vue";

    const { fullname, logout } = useAuthService();

    const locale = ref(localStorage.getItem("locale"));

    const changeLocale = () => {
        localStorage.setItem("locale", locale.value);
        location.reload();
    };
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm py-3" style="min-height: 100px">
        <div class="container">
            <a class="navbar-brand fw-semibold fs-4 text-dark fw-bold" href="/">
                <img src="@/assets/logo.png" alt="Logo" width="100" />
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navStrict"
                aria-controls="navStrict"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-start" id="navStrict">
                <ul class="navbar-nav gap-3">
                    <li class="nav-item">
                        <RouterLink class="nav-link strict-link" :to="{ name: 'meetingsList' }" active-class="active-link">
                            <i class="fa fa-list"></i> {{ $t("navbar.meetings") }}
                        </RouterLink>
                    </li>
                </ul>
                <ul class="navbar-nav gap-3">
                    <li class="nav-item">
                        <RouterLink class="nav-link strict-link" :to="{ name: 'usersList' }" v-if="can('users-list')" active-class="active-link">
                            <i class="fa fa-users"></i> {{ $t("navbar.users") }}
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div class="collapse navbar-collapse justify-content-end" id="navStrict">
                <ul class="navbar-nav gap-3">
                    <li class="nav-item">
                        <a class="nav-link strict-link" href="#">{{ fullname }}</a>
                    </li>
                </ul>
                <ul class="navbar-nav gap-3">
                    <li class="nav-item text-center d-flex align-items-center gap-2">
                        <select name="locale" id="locale" class="nav-link" v-model="locale" @change="changeLocale">
                            <option value="uz">UZ</option>
                            <option value="en">EN</option>
                        </select>
                    </li>
                </ul>
                <ul class="navbar-nav gap-3">
                    <li class="nav-item">
                        <a class="nav-link strict-link text-danger" href="#" @click="logout"><i class="fa fa-sign-out"></i> {{ $t("navbar.sign_out") }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
    .strict-link {
        color: #212529 !important;
        font-weight: bold;
        position: relative;
        transition: color 0.3s ease;
    }

    .strict-link::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -4px;
        width: 0%;
        height: 2px;
        background-color: #0d6efd;
        transition: width 0.3s ease;
    }

    .strict-link:hover {
        color: #0d6efd !important;
    }

    .strict-link:hover::after {
        width: 100%;
    }

    .active-link {
        color: #0d6efd !important;
    }

    .active-link::after {
        width: 100%;
    }
</style>
