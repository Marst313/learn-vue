<script setup>
import MonthlyChart from '@/components/dashboard/MonthlyChart.vue';
import RecentSalesWidget from '@/components/dashboard/RecentSalesWidget.vue';
import YearlyCharts from '@/components/dashboard/YearlyCharts.vue';
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 col-span-full gap-8">
            <RecentSalesWidget />

            <div class="grid grid-cols-1 lg:grid-cols-2 lg:col-span-full gap-4">
                <YearlyCharts />
                <MonthlyChart />
            </div>
        </div>
    </div>
</template>
