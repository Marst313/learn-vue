<script setup>
const emit = defineEmits(['create', 'delete-selected', 'export']);
const props = defineProps({
    selectedCustomer: Array
});

function openNew() {
    emit('create');
}

function confirmDeleteSelected() {
    emit('delete-selected');
}

function exportCSV(event) {
    emit('export', event);
}
</script>

<template>
    <Toolbar class="mb-6">
        <template #start>
            <Button label="Tambah" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
            <Button label="Hapus" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedCustomer || !selectedCustomer.length" />
        </template>

        <template #end>
            <Button label="Export" icon="pi pi-upload" severity="contrast" @click="exportCSV($event)" />
        </template>
    </Toolbar>
</template>

<style scoped></style>
