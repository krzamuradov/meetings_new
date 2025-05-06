<script setup></script>

<template>
    <table class="table table-striped table-hover align-middle text-center">
        <thead>
            <slot name="thead" />
        </thead>
        <tbody>
            <slot name="tbody" />
        </tbody>
    </table>
</template>

<style scoped></style>
