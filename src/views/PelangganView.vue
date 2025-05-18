<script setup>
import PelangganTableHeader from '@/components/pelanggan/PelangganTableHeader.vue';
import PelangganToolbar from '@/components/pelanggan/PelangganToolbar.vue';
import TableSkeleton from '@/components/TableSkeleton.vue';
import { formatDate, formatToLocalDateInput } from '@/helper/constant';
import { useCustomerStore } from '@/store/pelanggan';

import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import * as XLSX from 'xlsx';

const toast = useToast();
const customerStore = useCustomerStore();

const dt = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

// ! -- Dialog -- !!
function openNewDialog() {
    customerStore.openNewCustomerDialog();
}
function hideDialog() {
    customerStore.hideCustomerDialog();
}
function openDeleteSingleDialog(data) {
    customerStore.openDeleteCustomerDialog(data);
}
function openDeleteDialog() {
    customerStore.openDeleteCustomersDialog();
}
// ! -- Dialog -- !!

// ! -- Save, Update and Delete -- !!
async function saveCustomer() {
    await customerStore.saveCustomer(customerStore.singleCustomer, customerStore.dropdownItem, toast);
}

async function deleteSingleCustomer() {
    await customerStore.deleteCustomer(customerStore.singleCustomer.id, toast);
}

async function deleteSelectedCustomers() {
    await customerStore.deleteSelectedCustomers(toast);
}

function editCustomer(prod) {
    const selectedDokter = customerStore.dropdownItems.find((item) => item.name === prod.dokter);
    customerStore.dropdownItem = selectedDokter || null;

    customerStore.editCustomer({ ...prod, tanggalPeriksa: formatToLocalDateInput(prod.tanggalPeriksa) });
}
// ! -- Save, Update and Delete -- !!

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

onMounted(async () => {
    await customerStore.getPelangganData();
});
</script>

<template>
    <div>
        <div class="card min-h-screen lg:min-h-full">
            <div v-if="customerStore.isLoading && customerStore.globalLoading">
                <TableSkeleton />
            </div>
            <DataTable
                v-if="!customerStore.isLoading && !customerStore.globalLoading"
                ref="dt"
                v-model:selection="customerStore.selectedCustomers"
                :value="customerStore.customers"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} pelanggan"
            >
                <template #header>
                    <PelangganToolbar :selectedCustomer="customerStore.selectedCustomers" @create="openNewDialog" @delete-selected="openDeleteDialog" @export="exportXLSX" />

                    <PelangganTableHeader :filters="filters" />
                </template>

                <template #empty>
                    <div class="text-center text-gray-500 py-10">Tidak ada data pelanggan.</div>
                </template>

                <Column selectionMode="multiple" style="widsth: 3rem" :exportable="false"></Column>

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

                <!-- Diagnosa -->
                <Column field="diagnosa" header="Diagnosa" sortable style="min-width: 10rem"> </Column>

                <!-- Dokter -->
                <Column field="dokter" header="Dokter" sortable style="min-width: 10rem"> </Column>

                <!-- Tanggal Periksa -->
                <Column field="tanggalPeriksa" header="Tanggal Periksa" sortable style="min-width: 10rem">
                    <template #body="slotProps">
                        {{ formatDate(slotProps.data.tanggalPeriksa) }}
                    </template></Column
                >

                <!-- Aksi -->
                <Column header="Aksi" :exportable="false" style="min-width: 8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editCustomer(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="openDeleteSingleDialog(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- NEW DIALOG AND UPDATE -->
        <Dialog v-model:visible="customerStore.customerDialog" :style="{ width: '500px' }" header="Pelanggan Details" :modal="true" id="formPelanggan">
            <div class="grid grid-cols-2 gap-x-6 gap-y-4">
                <!-- Nama Pemilik -->
                <div>
                    <label for="namaPemilik" class="block font-bold mb-2">Nama Pemilik</label>
                    <InputText id="namaPemilik" v-model.trim="customerStore.singleCustomer.namaPemilik" placeholder="Nama pemilik" required autofocus :invalid="customerStore.submitted && !customerStore.singleCustomer.namaPemilik" class="w-full" />
                    <small v-if="customerStore.submitted && !customerStore.singleCustomer.namaPemilik" class="text-red-500">Nama pemilik tidak boleh kosong!</small>
                </div>

                <!-- Nama Hewan -->
                <div>
                    <label for="namaHewan" class="block font-bold mb-2">Nama Hewan</label>
                    <InputText id="namaHewan" v-model="customerStore.singleCustomer.namaHewan" required class="w-full" placeholder="Nama hewan" />
                    <small v-if="customerStore.submitted && !customerStore.singleCustomer.namaHewan" class="text-red-500">Nama hewan tidak boleh kosong!</small>
                </div>

                <!-- Jenis Hewan -->
                <div>
                    <label for="jenisHewan" class="block font-bold mb-2">Jenis Hewan</label>
                    <InputText id="jenisHewan" v-model="customerStore.singleCustomer.jenisHewan" required class="w-full" placeholder="Jenis hewan" />
                    <small v-if="customerStore.submitted && !customerStore.singleCustomer.jenisHewan" class="text-red-500">Jenis hewan tidak boleh kosong!</small>
                </div>

                <!-- Gender -->
                <div>
                    <span class="block font-bold mb-2">Gender</span>
                    <div class="flex gap-4">
                        <div class="flex items-center gap-2">
                            <RadioButton id="jantan" v-model="customerStore.singleCustomer.jenisKelamin" name="gender" value="Jantan" />
                            <label for="jantan">Jantan</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <RadioButton id="betina" v-model="customerStore.singleCustomer.jenisKelamin" name="gender" value="Betina" />
                            <label for="betina">Betina</label>
                        </div>
                    </div>
                    <small v-if="customerStore.submitted && !customerStore.singleCustomer.jenisKelamin" class="text-red-500">Jenis kelamin tidak boleh kosong!</small>
                </div>

                <!-- Umur -->
                <div>
                    <label for="umur" class="block font-bold mb-2">Umur</label>
                    <InputText
                        id="umur"
                        type="number"
                        v-model="customerStore.singleCustomer.umur"
                        class="w-full"
                        placeholder="Masukkan umur"
                        onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'"
                    />
                    <small v-if="customerStore.submitted && !customerStore.singleCustomer.umur" class="text-red-500">Umur tidak boleh kosong!</small>
                </div>

                <!-- Tipe Umur -->
                <div>
                    <span class="block font-bold mb-2">Tipe Umur</span>
                    <div class="flex gap-4">
                        <div class="flex items-center gap-2">
                            <RadioButton id="tahun" v-model="customerStore.singleCustomer.tipeUmur" value="tahun" />
                            <label for="tahun">Tahun</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <RadioButton id="bulan" v-model="customerStore.singleCustomer.tipeUmur" value="bulan" />
                            <label for="bulan">Bulan</label>
                        </div>
                    </div>
                    <small v-if="customerStore.submitted && !customerStore.singleCustomer.tipeUmur" class="text-red-500">Tipe umur wajib dipilih!</small>
                </div>

                <!-- Anamnesa -->
                <div class="col-span-2">
                    <label for="anamnesa" class="block font-bold mb-2">Anamnesa</label>
                    <Textarea id="anamnesa" v-model="customerStore.singleCustomer.anamnesa" rows="2" class="w-full resize-none" placeholder="Masukkan anamnesa atau (-)" />
                    <small v-if="customerStore.submitted && !customerStore.singleCustomer.anamnesa" class="text-red-500">Anamnesa tidak boleh kosong!</small>
                </div>

                <!-- Terapi -->
                <div class="col-span-2">
                    <label for="terapi" class="block font-bold mb-2">Terapi</label>
                    <Textarea id="terapi" v-model="customerStore.singleCustomer.terapi" rows="2" class="w-full resize-none" placeholder="Masukkan terapi atau (-)" />
                    <small v-if="customerStore.submitted && !customerStore.singleCustomer.terapi" class="text-red-500">Isi dengan ( - ) apabila tidak ada terapi!</small>
                </div>

                <!-- Diagnosa -->
                <div class="col-span-2">
                    <label for="diagnosa" class="block font-bold mb-2">Diagnosa</label>
                    <Textarea id="diagnosa" v-model="customerStore.singleCustomer.diagnosa" rows="2" class="w-full resize-none" placeholder="Masukkan diagnosa atau (-)" />
                    <small v-if="customerStore.submitted && !customerStore.singleCustomer.diagnosa" class="text-red-500">Isi dengan ( - ) apabila tidak ada diagnosa!</small>
                </div>

                <!-- Dokter -->
                <div class="col-span-2">
                    <label for="dokter" class="block font-bold mb-2">Dokter</label>
                    <Select id="dokter" v-model="customerStore.dropdownItem" :options="customerStore.dropdownItems" optionLabel="name" placeholder="Pilih satu" class="w-full" />
                    <small v-if="customerStore.submitted && !customerStore.dropdownItem" class="text-red-500">Dokter harus dipilih!</small>
                </div>

                <!-- Tanggal Periksa -->
                <div class="col-span-2">
                    <label for="tanggalPeriksa" class="block font-bold mb-2">Tanggal Periksa</label>
                    <InputText id="tanggalPeriksa" type="date" v-model="customerStore.singleCustomer.tanggalPeriksa" class="w-full" />
                    <small v-if="customerStore.submitted && !customerStore.singleCustomer.tanggalPeriksa" class="text-red-500">Tanggal periksa tidak boleh kosong!</small>
                </div>
            </div>

            <template #footer>
                <Button label="Batal" icon="pi pi-times" text @click="hideDialog" :disabled="customerStore.isLoading" />
                <Button :label="customerStore.isLoading ? 'Loading...' : 'Save'" icon="pi pi-check" @click="saveCustomer" type="submit" :disabled="customerStore.isLoading" />
            </template>
        </Dialog>

        <!-- SINGLE DATA DELETE -->
        <Dialog v-model:visible="customerStore.deleteCustomerDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="customerStore.singleCustomer"
                    >Apakah kamu yakin mau hapus data <b>{{ customerStore.singleCustomer.namaPemilik }}</b> - <b>{{ customerStore.singleCustomer.namaHewan }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="Batal" icon="pi pi-times" text @click="customerStore.deleteCustomerDialog = false" :disabled="customerStore.isLoading" />
                <Button :label="customerStore.isLoading ? 'Loading...' : 'Hapus'" icon="pi pi-trash" @click="deleteSingleCustomer" severity="danger" :disabled="customerStore.isLoading" />
            </template>
        </Dialog>
        <!-- SINGLE DATA DELETE -->

        <!-- SELECTED DATA DELETE -->
        <Dialog v-model:visible="customerStore.deleteCustomersDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="customerStore.singleCustomer">Apakah kamu yakin menghapus data yang sudah dipilih ?</span>
            </div>
            <template #footer>
                <Button label="Batal" icon="pi pi-times" text @click="customerStore.hideDeleteCustomersDialog" :disabled="customerStore.isLoading" />
                <Button :label="customerStore.isLoading ? 'Loading...' : 'Hapus'" icon="pi pi-trash" @click="deleteSelectedCustomers" severity="danger" :disabled="customerStore.isLoading" />
            </template>
        </Dialog>
    </div>
</template>
