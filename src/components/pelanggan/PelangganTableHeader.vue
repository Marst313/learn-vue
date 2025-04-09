<script setup>
defineProps({
    filters: {
        type: Object,
        required: true
    },
    title: {
        type: String,
        default: 'Data Pelanggan'
    }
});
</script>

<template>
    <div class="flex flex-col gap-5 mb-3 justify-start items-start">
        <h4 class="m-0">{{ title }}</h4>
        <IconField id="search">
            <InputIcon>
                <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters.global.value" id="search-input" placeholder="Search..." />
        </IconField>
    </div>
</template>
