<script setup></script>

<template>
    <div class="flex items-center justify-center min-h-screen overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <img src="../../assets/img/logo-dewata.jpg" alt="logo dewata" class="mb-8 w-32 shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, color-mix(in srgb, var(--primary-color), transparent 60%) 10%, var(--surface-ground) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">
                    <span class="text-primary font-bold text-3xl">404</span>
                    <h1 class="text-surface-900 dark:text-surface-0 font-bold text-3xl lg:text-5xl mb-2">Halaman Tidak Ditemukan</h1>
                    <div class="text-surface-600 dark:text-surface-200 mb-8">Halaman yang Anda cari tidak ditemukan di situs kami.</div>
                    <router-link to="/" class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b">
                        <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                            <i class="pi pi-fw pi-home !text-2xl"></i>
                        </span>
                        <span class="ml-6 flex flex-col">
                            <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0 block">Kembali ke Beranda</span>
                            <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Lihat halaman utama kami untuk informasi lengkap.</span>
                        </span>
                    </router-link>
                    <router-link to="/pelanggan" class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b">
                        <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                            <i class="pi pi-fw pi-shopping-cart !text-2xl"></i>
                        </span>
                        <span class="ml-6 flex flex-col">
                            <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0">Produk Hewan Peliharaan</span>
                            <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Cari produk yang sesuai.</span>
                        </span>
                    </router-link>
                    <router-link to="/contact" class="w-full flex items-center mb-8 py-8 border-surface-300 dark:border-surface-500 border-b">
                        <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                            <i class="pi pi-fw pi-envelope !text-2xl"></i>
                        </span>
                        <span class="ml-6 flex flex-col">
                            <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0">Hubungi Kami</span>
                            <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Butuh bantuan? Hubungi tim kami sekarang.</span>
                        </span>
                    </router-link>
                    <Button as="router-link" label="Go to Dashboard" to="/" />
                </div>
            </div>
        </div>
    </div>
</template>
