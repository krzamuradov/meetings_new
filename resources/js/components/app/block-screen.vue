<script setup></script>

<template>
    <div class="d-flex justify-content-center align-items-center position-absolute top-0 start-0 vh-100 w-100 bg-white bg-opacity-75 z-3">
        <div class="card col-5 text-center">
            <div class="card-body">
                <h2 class="fw-bold">Собрание не найдено</h2>
                <RouterLink :to="{ name: 'meetingsList' }">Вернутся к списку собрании </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .animated-logo {
        animation: pulse 0.9s infinite ease-in-out;
    }

    @keyframes pulse {
        0%,
        100% {
            transform: scale(0.8);
        }
        50% {
            transform: scale(1.1);
        }
    }
</style>
