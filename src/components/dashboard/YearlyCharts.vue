<script setup>
import { getCurrentYearDateRange, groupByMonth } from '@/helper/constant';
import { useCustomerStore } from '@/store/pelanggan';
import { onMounted, ref } from 'vue';

const customerStore = useCustomerStore();
const chartData = ref();
const chartOptions = ref();

const updateChart = () => {
    const groupedData = groupByMonth(customerStore.recapCustomerYearly);

    const labels = Object.keys(groupedData);
    const data = Object.values(groupedData);

    const documentStyle = getComputedStyle(document.body);
    const baseColors = [
        documentStyle.getPropertyValue('--p-cyan-500'),
        documentStyle.getPropertyValue('--p-orange-500'),
        documentStyle.getPropertyValue('--p-gray-500'),
        documentStyle.getPropertyValue('--p-pink-500'),
        documentStyle.getPropertyValue('--p-blue-500'),
        documentStyle.getPropertyValue('--p-red-500'),
        documentStyle.getPropertyValue('--p-yellow-500'),
        documentStyle.getPropertyValue('--p-purple-500'),
        documentStyle.getPropertyValue('--p-green-500'),
        documentStyle.getPropertyValue('--p-teal-500'),
        documentStyle.getPropertyValue('--p-lime-500'),
        documentStyle.getPropertyValue('--p-indigo-500')
    ];

    chartData.value = {
        labels,
        datasets: [
            {
                label: 'Jumlah Pelanggan',
                data,
                backgroundColor: baseColors.slice(0, labels.length),
                hoverBackgroundColor: baseColors.slice(0, labels.length).map((c) => c.replace('500', '400'))
            }
        ]
    };

    chartOptions.value = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: documentStyle.getPropertyValue('--p-text-color')
                }
            }
        }
    };
};

const fetchData = async () => {
    const { startDate, endDate } = getCurrentYearDateRange();
    await customerStore.getRecapYearly(startDate, endDate);
    updateChart();
};

onMounted(async () => {
    await fetchData();
});
</script>

<template>
    <div class="card flex justify-center flex-col items-center h-fit">
        <h4 class="font-normal mb-4">Data Pelanggan Tahun {{ new Date().getFullYear() }}</h4>

        <Chart v-if="chartData?.labels?.length" type="bar" :data="chartData" :options="chartOptions" class="w-full" />

        <div v-else class="text-gray-500 py-10">Belum ada data untuk ditampilkan</div>
    </div>
</template>
