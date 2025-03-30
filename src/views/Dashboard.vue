<script setup>
import BestSellingWidget from '@/components/dashboard/BestSellingWidget.vue';
import RecentSalesWidget from '@/components/dashboard/RecentSalesWidget.vue';
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <div class="grid grid-cols-2 col-span-full xl:gap-8">
            <RecentSalesWidget />
            <BestSellingWidget />
        </div>
    </div>
</template>
