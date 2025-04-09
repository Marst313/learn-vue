<script setup>
import { useCustomerStore } from '@/store/pelanggan';

const customerStore = useCustomerStore();
</script>

<template>
    <div class="card col-span-6 xl:col-span-full">
        <div class="font-semibold text-xl mb-4">Rincian Pelanggan</div>
        <div class="flex flex-col lg:flex-row justify-start mb-4 gap-5">
            <!-- TOTAL PELANGGAN -->
            <div class="bg-primary-100 dark:bg-primary-400/10 p-5 rounded-border">
                <span class="block text-muted-color font-medium">Total Pelanggan Sampai Hari Ini</span>

                <div class="flex items-center gap-2 rounded-border p-2">
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ customerStore.recapCustomerYearly.length }}</div>

                    <i class="pi pi-users text-green-500 !text-2xl"></i>
                </div>
            </div>

            <div class="bg-orange-100 dark:bg-orange-400/10 p-5 rounded-border">
                <span class="block text-muted-color font-medium">Total Pelanggan Sampai Hari Ini</span>

                <div class="flex items-center gap-2 rounded-border p-2">
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ customerStore.recapCustomerYearly.length }}</div>

                    <i class="pi pi-users text-orange-500 !text-2xl"></i>
                </div>
            </div>

            <div class="bg-blue-100 dark:bg-blue-400/10 p-5 rounded-border">
                <span class="block text-muted-color font-medium">Total Pelanggan Sampai Hari Ini</span>

                <div class="flex items-center gap-2 rounded-border p-2">
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ customerStore.recapCustomerYearly.length }}</div>

                    <i class="pi pi-users text-blue-500 !text-2xl"></i>
                </div>
            </div>
        </div>
    </div>
</template>
