<script setup>
import Skeleton from 'primevue/skeleton';
import { ref } from 'vue';

const skeletonData = ref(new Array(10).fill({}));
</script>

<template>
    <div class="col-span-6 xl:col-span-full space-y-2">
        <div class="card">
            <DataTable :value="skeletonData" :rows="10">
                <Column header="No" style="width: 3rem; text-align: center">
                    <template #body>
                        <Skeleton width="2rem" height="1rem" />
                    </template>
                </Column>

                <Column header="Nama Pemilik">
                    <template #body>
                        <Skeleton width="8rem" height="1rem" />
                    </template>
                </Column>

                <Column header="Nama Hewan">
                    <template #body>
                        <Skeleton width="7rem" height="1rem" />
                    </template>
                </Column>

                <Column header="Jenis Hewan">
                    <template #body>
                        <Skeleton width="7rem" height="1rem" />
                    </template>
                </Column>

                <Column header="Jenis Kelamin">
                    <template #body>
                        <Skeleton width="7rem" height="1rem" />
                    </template>
                </Column>

                <Column header="Umur">
                    <template #body>
                        <Skeleton width="4rem" height="1rem" />
                    </template>
                </Column>

                <Column header="Anamnesa">
                    <template #body>
                        <Skeleton width="12rem" height="1rem" />
                    </template>
                </Column>

                <Column header="Terapi">
                    <template #body>
                        <Skeleton width="12rem" height="1rem" />
                    </template>
                </Column>

                <Column header="Dokter">
                    <template #body>
                        <Skeleton width="10rem" height="1rem" />
                    </template>
                </Column>

                <Column header="Tanggal Periksa">
                    <template #body>
                        <Skeleton width="8rem" height="1rem" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
