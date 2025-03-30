<script setup>
import grooming1 from '@/assets/img/grooming-1.jpg';
import grooming2 from '@/assets/img/grooming-2.jpg';
import grooming3 from '@/assets/img/grooming-3.jpg';

const dataGrooming = [
    {
        id: 1,
        name: 'Basic Grooming',
        image: grooming1,
        price: 'Rp 50.000',
        features: ['Mandi dan Pengeringan', 'Penyisiran Bulu', 'Potong Kuku']
    },
    {
        id: 2,
        name: 'Premium Grooming',
        image: grooming2,
        price: 'Rp 100.000',
        features: ['Semua dari Basic Grooming', 'Perawatan Telinga', 'Parfum Hewan']
    },
    {
        id: 3,
        name: 'Luxury Grooming',
        image: grooming3,
        price: 'Rp 200.000',
        features: ['Semua dari Premium Grooming', 'Spa dan Massage Hewan', 'Potongan Gaya Khusus']
    }
];
</script>

<template>
    <div id="pricing" class="py-6 px-6 lg:px-20 my-2 md:my-6">
        <div class="text-center mb-6">
            <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Biaya Grooming</div>
            <span class="text-muted-color text-2xl">Layanan grooming terbaik untuk hewan kesayangan Anda</span>
        </div>

        <div class="grid grid-cols-12 gap-4 justify-between mt-20 md:mt-0">
            <div v-for="grooming in dataGrooming" :key="grooming.id" class="col-span-12 lg:col-span-4 p-0 md:p-4">
                <div class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer border-2 hover:border-primary duration-300 transition-all" style="border-radius: 10px">
                    <div class="text-surface-900 dark:text-surface-0 text-center my-8 text-3xl">{{ grooming.name }}</div>
                    <img :src="grooming.image" class="w-52 mx-auto rounded-lg" :alt="grooming.name" />
                    <div class="my-8 flex flex-col items-center gap-4">
                        <div class="flex items-center">
                            <span class="text-5xl font-bold mr-2 text-surface-900 dark:text-surface-0">{{ grooming.price }}</span>
                            <span class="text-surface-600 dark:text-surface-200">per sesi</span>
                        </div>
                        <Button label="Pesan Sekarang" class="p-button-rounded border-0 ml-4 font-light leading-tight bg-blue-500 text-white"></Button>
                    </div>
                    <Divider class="w-full bg-surface-200"></Divider>
                    <ul class="my-8 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8">
                        <li v-for="(feature, index) in grooming.features" :key="index" class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl leading-normal">{{ feature }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
