<script setup>
import RecapCharts from '@/components/rekap/RecapCharts.vue';
import TableRekapPelanggan from '@/components/rekap/TableRekapPelanggan.vue';
</script>
<template>
    <div class="grid grid-cols-12 gap-8">
        <div class="grid grid-cols-2 col-span-full">
            <div class="col-span-6 xl:col-span-full space-y-2">
                <TableRekapPelanggan />

                <RecapCharts />
            </div>
        </div>
    </div>
</template>
