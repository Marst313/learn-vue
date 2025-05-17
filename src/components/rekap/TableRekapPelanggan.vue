<script setup>
import { FilterMatchMode } from '@primevue/core/api';
import * as XLSX from 'xlsx';

import PelangganTableHeader from '@/components/pelanggan/PelangganTableHeader.vue';
import { formatDate } from '@/helper/constant';
import { useCustomerStore } from '@/store/pelanggan';
import { ref } from 'vue';
import TableSkeleton from '../TableSkeleton.vue';

const customerStore = useCustomerStore();

const dt = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const datePicker = ref(null);

function getRecapData() {
    customerStore.getRecapCustomer(datePicker.value[0], datePicker.value[1]);
}

// ! -- Export XLSX -- !!
function exportXLSX() {
    const data = customerStore.customers.map((cust) => ({
        'Nama Pemilik': cust.namaPemilik,
        'Nama Hewan': cust.namaHewan,
        'Jenis Hewan': cust.jenisHewan,
        'Jenis Kelamin': cust.jenisKelamin,
        Umur: `${cust.umur} ${cust.tipeUmur}`,
        'Tanggal Periksa': formatDate(cust.tanggalPeriksa),
        Dokter: cust.dokter,
        Anamnesa: cust.anamnesa,
        Terapi: cust.terapi
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pelanggan');

    XLSX.writeFile(workbook, 'data-pelanggan.xlsx');
}
// ! -- Export XLSX -- !!
</script>

<template>
    <div>
        <div class="card">
            <div v-if="customerStore.globalLoading">
                <TableSkeleton />
            </div>

            <DataTable
                v-if="!customerStore.globalLoading"
                ref="dt"
                :value="customerStore.recapCustomer"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} pelanggan"
                class="max-h-[35rem] overflow-auto"
            >
                <template #header>
                    <PelangganTableHeader :filters="filters" />

                    <div class="flex flex-col lg:flex-row lg:items-center items-start gap-2 justify-between w-full mt-4">
                        <div class="flex lg:items-end gap-2 flex-col lg:flex-row items-start">
                            <div class="flex items-start flex-col justify-start gap-2">
                                <label for="rentangTanggal">Pilih rentang tanggal</label>
                                <DatePicker v-model="datePicker" id="rentangTanggal" selectionMode="range" :manualInput="false" showButtonBar placeholder="Pilih rentang tanggal" showIcon class="w-64" />
                            </div>
                            <Button label="Tampilkan" icon="pi pi-search" severity="success" variant="outlined" @click="getRecapData" />
                        </div>

                        <Button label="Export" icon="pi pi-upload" severity="contrast" @click="exportXLSX($event)" />
                    </div>
                </template>

                <template #empty>
                    <div class="text-start lg:text-center text-gray-500 py-10">
                        <span v-if="!customerStore.hasSearched"> Silahkan search tanggal yang ingin di cari terlebih dahulu. </span>
                        <span v-else>
                            Tidak ada data pelanggan dari tanggal
                            {{ customerStore.findDate && customerStore.findDate.length ? formatDate(customerStore.findDate[0]) : '' }}
                            -
                            {{ customerStore.findDate && customerStore.findDate.length > 1 ? formatDate(customerStore.findDate[1]) : '' }}
                        </span>
                    </div>
                </template>

                <Column header="No" style="width: 3rem; text-align: center">
                    <template #body="slotProps">
                        <span>{{ slotProps.index + 1 }}</span>
                    </template>
                </Column>

                <!-- Nama Pemilik -->
                <Column header="Nama Pemilik" field="namaPemilik" sortable style="min-width: 5rem">
                    <template #body="slotProps">
                        <router-link :to="`/pelanggan/detail?namaPemilik=${slotProps.data.namaPemilik}&namaHewan=${slotProps.data.namaHewan}`" class="text-blue-500 hover:underline">
                            {{ slotProps.data.namaPemilik }}
                        </router-link>
                    </template>
                </Column>

                <!-- Nama Hewan -->
                <Column field="namaHewan" header="Nama Hewan" sortable style="min-width: 8rem"></Column>

                <!-- Jenis Hewan -->
                <Column field="jenisHewan" header="Jenis Hewan" sortable style="min-width: 8rem"> </Column>

                <!-- Jenis Kelamin -->
                <Column field="jenisKelamin" header="Jenis Kelamin" sortable style="min-width: 8rem"></Column>

                <!-- Umur -->
                <Column field="umur" header="Umur" sortable style="min-width: 1rem; text-align: center"> </Column>

                <!-- Anamnesa -->
                <Column field="anamnesa" header="Anamnesa" sortable style="min-width: 10rem"> </Column>

                <!-- Terapi -->
                <Column field="terapi" header="Terapi" sortable style="min-width: 10rem"> </Column>

                <!-- Dokter -->
                <Column field="dokter" header="Dokter" sortable style="min-width: 10rem"> </Column>

                <!-- Tanggal Periksa -->
                <Column field="tanggalPeriksa" header="Tanggal Periksa" sortable style="min-width: 10rem">
                    <template #body="slotProps">
                        {{ formatDate(slotProps.data.tanggalPeriksa) }}
                    </template></Column
                >
            </DataTable>
        </div>
    </div>
</template>
