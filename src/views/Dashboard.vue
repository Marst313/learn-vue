<script setup>
import MonthlyChart from '@/components/dashboard/MonthlyChart.vue';
import RecentSalesWidget from '@/components/dashboard/RecentSalesWidget.vue';
import YearlyCharts from '@/components/dashboard/YearlyCharts.vue';
</script>

<template>
    <div class="flex flex-col">
        <div class="gap-5 flex flex-col">
            <RecentSalesWidget />

            <div class="flex flex-col w-full xl:flex-row gap-3 h-fit">
                <YearlyCharts />
                <MonthlyChart />
            </div>
        </div>
    </div>
</template>
