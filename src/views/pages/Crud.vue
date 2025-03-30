<script setup>
import { ProductService } from '@/service/ProductService';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

onMounted(() => {
    ProductService.getProducts().then((data) => (products.value = data));
});

const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);

function openNew() {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
}

function hideDialog() {
    productDialog.value = false;
    submitted.value = false;
}

function saveProduct() {
    submitted.value = true;

    if (product?.value.namaPemilik?.trim()) {
        if (product.value.id) {
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            product.value.id = createId();
            product.value.code = createId();
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Data pelanggan berhasil dibuat', life: 3000 });
        }

        productDialog.value = false;
        product.value = {};
    }
}

function editProduct(prod) {
    product.value = { ...prod };
    productDialog.value = true;
}

function confirmDeleteProduct(prod) {
    product.value = prod;
    deleteProductDialog.value = true;
}

function deleteProduct() {
    products.value = products.value.filter((val) => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Data pelanggan terhapus', life: 3000 });
}

function findIndexById(id) {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

function createId() {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function exportCSV() {
    dt.value.exportCSV();
}

function confirmDeleteSelected() {
    deleteProductsDialog.value = true;
}

function deleteSelectedProducts() {
    products.value = products.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Data pelanggan terhapus', life: 3000 });
}

onMounted(() => {
    ProductService.getProducts().then((data) => {
        // Urutkan data berdasarkan tanggalPeriksa terbaru
        products.value = data.sort((a, b) => {
            return new Date(b.tanggalPeriksa) - new Date(a.tanggalPeriksa);
        });
    });
});
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" severity="secondary" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <DataTable
                ref="dt"
                v-model:selection="selectedProducts"
                :value="products"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center xl:justify-between">
                        <h4 class="m-0">Data Pelanggan</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
                    </div>
                </template>
                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>

                <!-- Nama Pemilik -->
                <Column header="Nama Pemilik" field="namaPemilik" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <router-link :to="`/pelanggan/${slotProps.data.id}`">
                            {{ slotProps.data.namaPemilik }}
                        </router-link>
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

                <!-- Tanggal Periksa -->
                <Column field="tanggalPeriksa" header="Tanggal Periksa" sortable style="min-width: 10rem">
                    <template #body="slotProps">
                        {{ slotProps.data.tanggalPeriksa }}
                    </template></Column
                >

                <!-- Aksi -->
                <Column header="Aksi" :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Pelanggan Details" :modal="true">
            <div class="flex flex-col gap-6">
                <div>
                    <label for="namaPemilik" class="block font-bold mb-3">Nama Pemilik</label>
                    <InputText id="namaPemilik" v-model.trim="product.namaPemilik" required="true" autofocus :invalid="submitted && !product.namaPemilik" fluid />
                    <small v-if="submitted && !product.namaPemilik" class="text-red-500">Nama pemilik tidak boleh kosong!</small>
                </div>
                <div>
                    <label for="namaHewan" class="block font-bold mb-3">Nama Hewan</label>
                    <InputText id="namaHewan" v-model="product.namaHewan" required="true" fluid />
                    <small v-if="submitted && !product.namaHewan" class="text-red-500">Nama hewan tidak boleh kosong!</small>
                </div>
                <div>
                    <label for="jenisHewan" class="block font-bold mb-3">Jenis Hewan</label>
                    <InputText id="jenisHewan" v-model="product.jenisHewan" required="true" fluid />
                    <small v-if="submitted && !product.jenisHewan" class="text-red-500">Jenis hewan tidak boleh kosong!</small>
                </div>

                <div>
                    <span class="block font-bold mb-4">Gender</span>
                    <div class="grid grid-cols-12 gap-4">
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="jantan" v-model="product.jenisKelamin" name="gender" value="Jantan" />
                            <label for="jantan">Jantan</label>
                        </div>
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="betina" v-model="product.jenisKelamin" name="gender" value="Betina" />
                            <label for="betina">Betina</label>
                        </div>
                    </div>
                </div>

                <div>
                    <label for="umur" class="block font-bold mb-3">Umur</label>
                    <InputText id="umur" type="number" v-model="product.umur" required="true" fluid />
                    <small v-if="submitted && !product.umur" class="text-red-500">Umur hewan tidak boleh kosong!</small>
                </div>

                <div>
                    <label for="anamnesa" class="block font-bold mb-3">Anamnesa</label>
                    <Textarea id="address" v-model="product.anamnesa" rows="4" fluid required="true" cols="4" style="resize: none" />
                </div>

                <div>
                    <label for="tanggalPeriksa" class="block font-bold mb-3">Tanggal Periksa</label>
                    <InputText id="tanggalPeriksa" type="date" v-model="product.tanggalPeriksa" required="true" fluid />
                    <small v-if="submitted && !product.tanggalPeriksa" class="text-red-500">Tanggal periksatidak boleh kosong!</small>
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product"
                    >Apakah kamu yakin mau hapus data <b>{{ product.namaHewan }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="Batal" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Hapus" icon="pi pi-trash" @click="deleteProduct" severity="danger" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>
    </div>
</template>
