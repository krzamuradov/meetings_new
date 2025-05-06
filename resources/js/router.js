import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { can } from "@/services/permissions";

const routes = [
    {
        path: "/",
        component: () => import("@/layouts/authorized.vue"),
        meta: { requiresAuth: true },
        children: [
            {
                path: "meetings",
                component: () => import("@/views/meetings/index.vue"),
                children: [
                    {
                        path: "",
                        name: "meetingsList",
                        component: () => import("@/views/meetings/list.vue"),
                        meta: {
                            abilities: ["list-meetings"],
                        },
                    },
                    {
                        path: "create",
                        name: "meetingCreate",
                        component: () => import("@/views/meetings/create.vue"),
                        meta: {
                            abilities: ["create-meeting"],
                        },
                    },
                    {
                        path: ":id/show",
                        name: "meetingShow",
                        component: () => import("@/views/meetings/show.vue"),
                        meta: {
                            abilities: ["show-meeting"],
                        },
                    },
                    {
                        path: ":id/edit",
                        name: "meetingEdit",
                        component: () => import("@/views/meetings/edit.vue"),
                        meta: {
                            abilities: ["edit-meeting"],
                        },
                    },
                ],
            },
            {
                path: "documents",
                component: () => import("@/views/meetings/index.vue"),
                children: [
                    {
                        path: "create",
                        name: "documentCreate",
                        component: () => import("@/views/documents/create.vue"),
                    },
                    {
                        path: ":id/edit",
                        name: "documentEdit",
                        component: () => import("@/views/documents/edit.vue"),
                    },
                ],
            },
            {
                path: "users",
                component: () => import("@/views/users/index.vue"),
                meta: {
                    abilities: ["users-list"],
                },
                children: [
                    {
                        path: "",
                        name: "usersList",
                        component: () => import("@/views/users/list.vue"),
                    },
                    {
                        path: "create",
                        name: "userCreate",
                        component: () => import("@/views/users/create.vue"),
                    },
                    {
                        path: ":id/edit",
                        name: "userEdit",
                        component: () => import("@/views/users/edit.vue"),
                    },
                ],
            },
        ],
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login.vue"),
        meta: { requiresAuth: false },
    },
    {
        path: "/test",
        name: "test",
        component: () => import("@/views/test.vue"),
        meta: { requiresAuth: false },
    },
    {
        path: "/403",
        name: "forbidden",
        component: () => import("@/views/403.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: () => import("@/views/404.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const authorized = !!(token && user);

    if (to.meta.requiresAuth && !authorized) {
        return { name: "login" };
    }

    if (authorized && to.name === "login") {
        return { name: "meetingsList" };
    }

    if (authorized && to.meta?.abilities) {
        const hasPermission = to.meta.abilities.every((ability) => can(ability));
        if (!hasPermission) {
            return { name: "forbidden" };
        }
    }
});

export default router;
