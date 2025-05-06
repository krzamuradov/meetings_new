<template>
    <nav v-if="totalPages > 1" aria-label="Навигация по страницам">
        <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Назад</button>
            </li>

            <li v-for="page in visiblePages" :key="page.key" class="page-item" :class="{ active: page.number === currentPage, disabled: page.isEllipsis }">
                <span v-if="page.isEllipsis" class="page-link">…</span>
                <button v-else class="page-link" @click="changePage(page.number)">
                    {{ page.number }}
                </button>
            </li>

            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Вперёд</button>
            </li>
        </ul>
    </nav>
</template>

<script setup>
    import { computed, defineProps, defineEmits } from "vue";

    const props = defineProps({
        totalPages: { type: Number, required: true },
        currentPage: { type: Number, required: true },
    });

    const emit = defineEmits(["update:currentPage"]);

    function changePage(page) {
        if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
            emit("update:currentPage", page);
        }
    }

    // Генерация видимых страниц с "..." (ellipsis)
    const visiblePages = computed(() => {
        const total = props.totalPages;
        const current = props.currentPage;
        const pages = [];

        const pushPage = (number) => {
            pages.push({ key: `page-${number}`, number, isEllipsis: false });
        };

        const pushEllipsis = (index) => {
            pages.push({ key: `ellipsis-${index}`, number: null, isEllipsis: true });
        };

        if (total <= 7) {
            for (let i = 1; i <= total; i++) pushPage(i);
        } else {
            pushPage(1);

            if (current > 4) pushEllipsis(1);

            const start = Math.max(2, current - 1);
            const end = Math.min(total - 1, current + 1);

            for (let i = start; i <= end; i++) pushPage(i);

            if (current < total - 3) pushEllipsis(2);

            pushPage(total);
        }

        return pages;
    });
</script>
