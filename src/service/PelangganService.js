const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/pelanggan`;

export const PelangganService = {
    async getCustomersData() {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Gagal mengambil data pelanggan');
            }

            const json = await response.json();
            const data = json.data?.data ?? [];

            return data;
        } catch (error) {
            console.error('Error saat ambil data pelanggan:', error);
            return [];
        }
    },

    async createCustomer(pelanggan) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pelanggan)
            });

            if (!response.ok) {
                throw new Error('Gagal menambahkan data pelanggan');
            }

            const json = await response.json();
            return json.data;
        } catch (error) {
            console.error('Error saat menambahkan data pelanggan:', error);
            throw error;
        }
    },

    async updateCustomer(id, pelanggan) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pelanggan)
            });

            if (!response.ok) {
                throw new Error('Gagal memperbarui data pelanggan');
            }

            const json = await response.json();
            return json.data;
        } catch (error) {
            console.error('Error saat update pelanggan:', error);
            throw error;
        }
    },

    async deleteCustomer(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();

            return json.data;
        } catch (error) {
            console.error('Error saat menghapus pelanggan:', error);
            throw error;
        }
    },

    async getDetailPelanggan(namaPemilik, namaHewan) {
        try {
            const response = await fetch(`${API_URL}/search-detail/?namaPemilik=${namaPemilik}&namaHewan=${namaHewan}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Gagal mengambil detail pelanggan');
            }

            const json = await response.json();

            return json.data;
        } catch (error) {
            console.error('Error saat mengambil data pelanggan:', error);
            throw error;
        }
    },

    async getRecapPelanggan(startDate, endDate) {
        try {
            const response = await fetch(`${API_URL}/recap`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ startDate, endDate })
            });

            if (!response.ok) {
                throw new Error('Gagal mengambil detail pelanggan');
            }

            const json = await response.json();

            return json.data;
        } catch (error) {
            console.error('Error saat mengambil data pelanggan:', error);
            throw error;
        }
    },

    getProductsMini() {
        return Promise.resolve(this.getCustomersData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getCustomersData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getCustomersData());
    },

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    }
};
