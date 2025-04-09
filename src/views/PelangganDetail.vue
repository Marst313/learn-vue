<script setup>
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import PelangganTableHeader from '@/components/pelanggan/PelangganTableHeader.vue';
import PelangganToolbar from '@/components/pelanggan/PelangganToolbar.vue';
import TableSkeleton from '@/components/TableSkeleton.vue';
import { formatDate, formatToLocalDateInput } from '@/helper/constant';
import { useCustomerStore } from '@/store/pelanggan';

const toast = useToast();
const router = useRouter();
const route = useRoute();
const customerStore = useCustomerStore();

const namaPemilik = route.query.namaPemilik;
const namaHewan = route.query.namaHewan;

const dtDetails = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

// ! -- Dialog -- !!
function openNewDialog() {
    customerStore.openNewCustomerDialogDetails();
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
    await customerStore.saveCustomer(customerStore.singleCustomer, customerStore.dropdownItem, toast, 'detail');
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

// ! -- Export CSV -- !!
function exportCSV() {
    dtDetails.value.exportCSV();
}

onMounted(async () => {
    await customerStore.getDetailPelanggan(namaPemilik, namaHewan);
});
</script>

<template>
    <div>
        <div class="card">
            <div v-if="customerStore.isLoading || customerStore.globalLoading" class="flex justify-center items-center min-h-[200px]">
                <TableSkeleton />
            </div>

            <DataTable
                v-if="!customerStore.isLoading"
                ref="dtDetails"
                v-model:selection="customerStore.selectedCustomers"
                :value="customerStore.customerDetails"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} pelanggan"
            >
                <template #header>
                    <Button icon="pi pi-arrow-left" outlined class="mr-2 mb-5" @click="router.back()" label="Kembali" />

                    <PelangganToolbar :selectedProducts="customerStore.selectedCustomers" @create="openNewDialog" @delete-selected="openDeleteDialog" @export="exportCSV" />

                    <PelangganTableHeader :filters="filters" :title="`Detail Pelanggan : ${namaPemilik} - ${namaHewan}`" />
                </template>

                <template #empty>
                    <div class="text-center text-gray-500 py-10">Tidak ada data pelanggan details.</div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>

                <!-- Nama Pemilik -->
                <Column header="Nama Pemilik" field="namaPemilik" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        {{ slotProps.data.namaPemilik }}
                    </template>
                </Column>

                <!-- Nama Hewan -->
                <Column field="namaHewan" header="Nama Hewan" sortable style="min-width: 16rem"></Column>

                <!-- Jenis Hewan -->
                <Column field="jenisHewan" header="Jenis Hewan" sortable style="min-width: 8rem"> </Column>

                <!-- Jenis Kelamin -->
                <Column field="jenisKelamin" header="Jenis Kelamin" sortable style="min-width: 10rem"></Column>

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

                <!-- Aksi -->
                <Column header="Aksi" :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editCustomer(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="openDeleteSingleDialog(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- SINGLE DATA DELETE -->
        <Dialog v-model:visible="customerStore.customerDialog" :style="{ width: '450px' }" header="Pelanggan Details" :modal="true">
            <div class="flex flex-col gap-6">
                <div>
                    <label for="namaPemilik" class="block font-bold mb-3">Nama Pemilik</label>
                    <InputText
                        id="namaPemilik"
                        v-model.trim="customerStore.singleCustomer.namaPemilik"
                        required="true"
                        placeholder="Nama pemilik"
                        autofocus
                        :invalid="customerStore.submitted && !customerStore.singleCustomer.namaPemilik"
                        fluid
                        readonly
                    />
                    <small v-if="customerStore.submitted && !customerStore.singleCustomer.namaPemilik" class="text-red-500">Nama pemilik tidak boleh kosong!</small>
                </div>
                <div>
                    <label for="namaHewan" class="block font-bold mb-3">Nama Hewan</label>
                    <InputText id="namaHewan" v-model="customerStore.singleCustomer.namaHewan" required="true" fluid readonly placeholder="Nama hewan" />
                    <small v-if="customerStore.submitted && !customerStore.singleCustomer.namaHewan" class="text-red-500">Nama hewan tidak boleh kosong!</small>
                </div>

                <div class="grid grid-cols-2 space-x-5">
                    <div>
                        <label for="jenisHewan" class="block font-bold mb-3">Jenis Hewan</label>
                        <AutoComplete v-model="customerStore.singleCustomer.jenisHewan" optionLabel="name" :suggestions="customerStore.filteredJenisHewan" @complete="customerStore.searchJenis" placeholder="Masukkan jenis hewan" class="w-full">
                            <template #option="slotProps">
                                <div class="flex items-center text-white">
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                            <template #footer>
                                <div class="px-3 py-3">
                                    <Button label="Add New" fluid severity="secondary" text size="small" icon="pi pi-plus" />
                                </div>
                            </template>
                        </AutoComplete>

                        <small v-if="customerStore.submitted && !customerStore.singleCustomer.jenisHewan" class="text-red-500">Jenis hewan tidak boleh kosong!</small>
                    </div>

                    <div>
                        <span class="block font-bold mb-4">Gender</span>
                        <div class="grid grid-cols-12 gap-4">
                            <div class="flex items-center gap-2 col-span-6">
                                <RadioButton id="jantan" v-model="customerStore.singleCustomer.jenisKelamin" name="gender" value="Jantan" />
                                <label for="jantan">Jantan</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <RadioButton id="betina" v-model="customerStore.singleCustomer.jenisKelamin" name="gender" value="Betina" />
                                <label for="betina">Betina</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-2 space-x-5">
                    <div>
                        <label for="umur" class="block font-bold mb-3">Umur</label>
                        <InputText
                            id="umur"
                            type="number"
                            onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'"
                            v-model="customerStore.singleCustomer.umur"
                            required="true"
                            fluid
                            placeholder="Masukkan umur hewan"
                        />
                        <small v-if="customerStore.submitted && !customerStore.singleCustomer.umur" class="text-red-500">Umur hewan tidak boleh kosong!</small>
                    </div>

                    <div>
                        <span class="block font-bold mb-4">Umur</span>
                        <div class="grid grid-cols-12 gap-4">
                            <div class="flex items-center gap-2 col-span-6">
                                <RadioButton id="tahun" v-model="customerStore.singleCustomer.tipeUmur" name="tahun" value="tahun" />

                                <label for="tahun">Tahun</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <RadioButton id="bulan" v-model="customerStore.singleCustomer.tipeUmur" name="bulan" value="bulan" />
                                <label for="bulan">Bulan</label>
                            </div>
                            <small v-if="customerStore.submitted && !customerStore.singleCustomer.tipeUmur" class="text-red-500">Tipe umur wajib dipilih!</small>
                        </div>
                    </div>
                </div>

                <div>
                    <label for="anamnesa" class="block font-bold mb-3">Anamnesa</label>
                    <Textarea id="address" v-model="customerStore.singleCustomer.anamnesa" placeholder="Masukkan anamnesa tulis ( - ) apabila kosong" rows="2" fluid required="true" cols="4" style="resize: none" />
                </div>

                <div>
                    <label for="terapi" class="block font-bold mb-3">Terapi</label>
                    <Textarea id="terapi" v-model="customerStore.singleCustomer.terapi" rows="2" placeholder="Masukkan terapi tulis ( - ) apabila kosong" fluid required="true" cols="4" style="resize: none" />
                </div>

                <div class="flex flex-wrap gap-2 w-full">
                    <label for="state">Dokter</label>

                    <Select id="state" v-model="customerStore.dropdownItem" :options="customerStore.dropdownItems" optionLabel="name" placeholder="Pilih satu" class="w-full"></Select>

                    <small v-if="customerStore.submitted && !customerStore.dropdownItem" class="text-red-500">Dokter harus dipilih!</small>
                </div>

                <div>
                    <label for="tanggalPeriksa" class="block font-bold mb-3">Tanggal Periksa</label>
                    <InputText id="tanggalPeriksa" type="date" v-model="customerStore.singleCustomer.tanggalPeriksa" required="true" fluid />
                    <small v-if="customerStore.submitted && !customerStore.singleCustomer.tanggalPeriksa" class="text-red-500">Tanggal periksatidak boleh kosong!</small>
                </div>
            </div>

            <template #footer>
                <Button label="Batal" icon="pi pi-times" text @click="hideDialog" :disabled="customerStore.isLoading" />
                <Button :label="customerStore.isLoading ? 'Loading...' : 'Save'" icon="pi pi-check" @click="saveCustomer" type="submit" :disabled="customerStore.isLoading" />
            </template>
        </Dialog>

        <Dialog v-model:visible="customerStore.deleteCustomerDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="customerStore.singleCustomer"
                    >Apakah kamu yakin mau hapus data <b>{{ customerStore.singleCustomer.namaHewan }}</b
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
