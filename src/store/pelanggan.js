import { dokter, jenisHewanList } from '@/helper/constant';
import { PelangganService } from '@/service/PelangganService';
import { defineStore } from 'pinia';
export const useCustomerStore = defineStore('pelanggan', {
    state: () => ({
        // DIALOG or MODAL
        customerDialog: false,
        deleteCustomerDialog: false,
        deleteCustomersDialog: false,

        // Customer
        customers: [],
        singleCustomer: {},
        customerDetails: [],
        selectedCustomers: null,

        jenisHewanOptions: jenisHewanList,
        filteredJenisHewan: [],
        selectedJenisHewan: '',

        // Recap Customer
        recapCustomer: [],
        recapCustomerOriginal: [],
        recapCustomerYearly: [],
        recapCustomerMonthly: [],
        findDate: [],
        hasFindDate: false,

        // Dropdown
        dropdownItem: '',
        dropdownItems: dokter,

        // Etc
        isLoading: true,
        isEmpty: false,
        submitted: false,
        globalLoading: true
    }),
    actions: {
        // !-- CRUD --!
        async getPelangganData() {
            this.isLoading = true;

            const data = await PelangganService.getProducts();

            this.customers = data;
            this.isLoading = false;

            return data;
        },
        async getDetailPelanggan(namaPemilik, namaHewan) {
            this.isLoading = true;

            const data = await PelangganService.getDetailPelanggan(namaPemilik, namaHewan);

            this.customerDetails = data.data;
            this.isLoading = false;

            return data;
        },

        async saveCustomer(customer, dokterSelected, toast, type) {
            this.submitted = true;
            this.isLoading = true;

            const isValid =
                customer.namaPemilik?.trim() &&
                customer.namaHewan?.trim() &&
                customer.jenisHewan?.trim() &&
                customer.jenisKelamin &&
                customer.umur !== null &&
                customer.umur >= 0 &&
                customer.tipeUmur &&
                customer.anamnesa?.trim() &&
                customer.terapi?.trim() &&
                customer.diagnosa?.trim() &&
                dokterSelected &&
                customer.tanggalPeriksa;

            if (!isValid) {
                toast.add({ severity: 'warn', summary: 'Validasi Gagal', detail: 'Mohon isi semua data yang diperlukan!', life: 3000 });
                this.isLoading = false;
                return false;
            }

            if (dokterSelected) {
                customer.dokter = dokterSelected.name;
            }

            try {
                if (customer.id) {
                    await PelangganService.updateCustomer(customer.id, { ...customer, jenisHewan: customer.jenisHewan.name || customer.jenisHewan });
                    toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Data pelanggan diperbarui', life: 3000 });
                } else {
                    await PelangganService.createCustomer({ ...customer, jenisHewan: customer.jenisHewan.name || customer.jenisHewan });
                    toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Data pelanggan berhasil dibuat', life: 3000 });
                }

                this.reset();

                if (type === 'detail') {
                    await this.getDetailPelanggan(customer.namaPemilik, customer.namaHewan);
                }

                await this.getPelangganData();

                this.customerDialog = false;
                this.singleCustomer = {};
                this.dropdownItem = '';

                return true;
            } catch (err) {
                console.error(err);
                toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal menyimpan data pelanggan', life: 3000 });
                return false;
            } finally {
                this.isLoading = false;
            }
        },

        async deleteCustomer(customerId, toast) {
            try {
                this.isLoading = true;

                await PelangganService.deleteCustomer(customerId);
                toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Data pelanggan berhasil dihapus', life: 3000 });

                this.reset();
                await this.getPelangganData();
            } catch (err) {
                console.error(err);
                toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal menghapus data pelanggan', life: 3000 });
            } finally {
                this.deleteCustomerDialog = false;
                this.singleCustomer = {};
                this.isLoading = false;
            }
        },

        async deleteSelectedCustomers(toast) {
            try {
                this.isLoading = true;

                for (const cust of this.selectedCustomers) {
                    await PelangganService.deleteCustomer(cust.id);
                }

                toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Data pelanggan terhapus', life: 3000 });

                this.reset();
                await this.getPelangganData();
            } catch (err) {
                console.error(err);
                toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal menghapus beberapa pelanggan', life: 3000 });
            } finally {
                this.deleteCustomersDialog = false;
                this.selectedCustomers = null;
                this.isLoading = false;
            }
        },

        async getRecapCustomer(startDate, endDate) {
            this.globalLoading = true;

            const data = await PelangganService.getRecapPelanggan(startDate, endDate);

            this.findDate[0] = startDate;
            this.findDate[1] = endDate;

            this.recapCustomer = data.data;
            this.recapCustomerOriginal = data.data;
            this.globalLoading = false;
            this.hasSearched = true;
            this.dropdownItem = '';

            return data;
        },

        async getRecapYearly(startDate, endDate) {
            this.globalLoading = true;

            const data = await PelangganService.getRecapPelanggan(startDate, endDate);

            this.recapCustomerYearly = data.data;
            this.globalLoading = false;
            this.hasSearched = true;

            return data;
        },

        async getRecapMonthly(startDate, endDate) {
            this.globalLoading = true;

            const data = await PelangganService.getRecapPelanggan(startDate, endDate);

            this.recapCustomerMonthly = data.data;
            this.globalLoading = false;
            this.hasSearched = true;

            return data;
        },

        searchJenis(event) {
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.filteredJenisHewan = [...this.jenisHewanOptions];
                } else {
                    this.filteredJenisHewan = this.jenisHewanOptions.filter((country) => {
                        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                    });
                }
            }, 250);
        },
        editCustomer(data) {
            this.singleCustomer = { ...data };
            this.customerDialog = true;
        },

        // !-- DIALOG or MODAL --!
        openNewCustomerDialog() {
            this.singleCustomer = {};
            this.submitted = false;
            this.customerDialog = true;
        },
        hideCustomerDialog() {
            this.customerDialog = false;
            this.submitted = false;
        },

        openDeleteCustomerDialog(data) {
            this.deleteCustomerDialog = true;
            this.singleCustomer = data;
        },
        openDeleteCustomersDialog() {
            this.deleteCustomersDialog = true;
        },

        openNewCustomerDialogDetails() {
            this.singleCustomer = { ...this.customerDetails[0], anamnesa: '', terapi: '', diagnosa: '', id: null };
            this.submitted = false;
            this.customerDialog = true;
        },

        hideDeleteCustomersDialog() {
            this.deleteCustomersDialog = false;
        },
        // !-- DIALOG or MODAL --!

        // !-- Customer --!
        reset() {
            this.customers = [];
        },

        // !-- LOADING --!
        setLoading(value) {
            this.globalLoading = value;
        }
    }
});
