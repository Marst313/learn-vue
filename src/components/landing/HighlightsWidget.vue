<script setup>
import feature1 from '@/assets/img/feature-1.jpg';
import feature2 from '@/assets/img/feature-2.jpg';
import feature3 from '@/assets/img/feature-3.jpg';

const dataFeature = [
    {
        id: 0,
        title: 'Barang Petshop Lengkap',
        img: feature1,
        description: 'Temukan segala kebutuhan hewan peliharaan mulai dari makanan, mainan, hingga aksesoris dengan kualitas terbaik.',
        icon: 'pi-shopping-cart',
        bgColor: 'bg-green-100',
        iconBgColor: 'bg-green-200',
        iconTextColor: 'text-green-700'
    },
    {
        id: 1,
        title: 'Grooming Profesional',
        img: feature2,
        description: 'Layanan grooming profesional dengan hasil yang bersih, wangi, dan membuat hewan peliharaan Anda semakin sehat dan nyaman.',
        icon: 'pi-hammer',
        bgColor: 'bg-blue-100',
        iconBgColor: 'bg-blue-200',
        iconTextColor: 'text-blue-700'
    },
    {
        id: 2,
        title: 'Pet Hotel Nyaman',
        img: feature3,
        description: 'Nikmati layanan hotel hewan yang aman dan nyaman saat Anda harus bepergian. Kami menjaga hewan peliharaan Anda sebaik mungkin.',
        icon: 'pi-warehouse',
        bgColor: 'bg-yellow-100',
        iconBgColor: 'bg-yellow-200',
        iconTextColor: 'text-yellow-700'
    }
];
</script>

<template>
    <div id="highlights" class="relative py-10 px-6 lg:px-24 mx-0 my-16 lg:mx-24">
        <div class="text-center">
            <h2 class="text-surface-900 dark:text-surface-0 font-semibold mb-4 text-5xl tracking-wide">Layanan Terbaik Untuk Hewan Kesayangan Anda</h2>
            <p class="text-muted-color text-xl md:text-2xl">Kami menyediakan segala kebutuhan hewan peliharaan Anda dengan layanan yang lengkap dan terpercaya.</p>
        </div>

        <!-- Single vertical gradient divider with floating dots -->
        <div class="absolute inset-0 lg:flex justify-center items-center hidden">
            <div class="relative w-1 h-4/5 bg-gradient-to-b from-green-400 via-blue-500 to-yellow-400">
                <!-- Floating decorative dots -->
                <div class="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-green-300 animate-pulse"></div>
                <div class="absolute bottom-0 w-5 h-5 rounded-full bg-blue-400 animate-bounce delay-100" style="left: 10px"></div>
                <div class="absolute top-1/4 w-3 h-3 rounded-full bg-yellow-300 animate-pulse delay-200" style="left: -12px"></div>
                <div class="absolute bottom-1/4 w-6 h-6 rounded-full bg-green-500 animate-bounce delay-300" style="left: 12px"></div>
            </div>
        </div>

        <!-- Looping through dataFeature -->
        <div v-for="(feature, index) in dataFeature" :key="feature.id" class="relative grid grid-cols-12 gap-6 my-20 pt-6 text-center lg:text-left">
            <!-- Conditional layout for alternating design on large screens -->
            <div :class="['col-span-12 lg:col-span-6', index % 2 === 0 ? 'lg:order-1' : 'lg:order-2 lg:ml-auto', 'flex justify-center lg:justify-start']">
                <div :class="['p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 w-fit', feature.bgColor]">
                    <img :src="feature.img" class="w-96" :alt="feature.title" />
                </div>
            </div>

            <div :class="['col-span-12 lg:col-span-6', index % 2 === 0 ? 'lg:order-2 lg:ml-auto' : 'lg:order-1', 'my-auto flex flex-col items-center lg:items-start gap-6 text-center lg:text-left']">
                <div :class="['flex items-center justify-center w-16 h-16 rounded-full shadow-md', feature.iconBgColor]">
                    <i :class="['pi pi-fw text-4xl', feature.icon, feature.iconTextColor]"></i>
                </div>
                <h3 class="text-surface-900 dark:text-surface-0 text-3xl font-semibold">{{ feature.title }}</h3>
                <p class="text-surface-700 dark:text-surface-100 text-lg md:text-2xl leading-relaxed max-w-md">{{ feature.description }}</p>
            </div>
        </div>
    </div>
</template>
