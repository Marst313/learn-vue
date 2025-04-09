<script setup>
import { formatDate, groupByMonth } from '@/helper/constant';
import { useCustomerStore } from '@/store/pelanggan';
import { onMounted, ref, watch } from 'vue';

const customerStore = useCustomerStore();
const chartData = ref();
const chartOptions = ref();

const updateChart = () => {
    const groupedData = groupByMonth(customerStore.recapCustomer);
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

// Pindahkan ke bawah setelah updateChart terdefinisi
watch(() => customerStore.recapCustomer, updateChart, { immediate: true });
onMounted(() => {
    updateChart();
});
</script>

<template>
    <div class="card flex justify-center flex-col items-center">
        <h4 class="font-normal">
            Data Pelanggan :
            {{ customerStore.findDate ? formatDate(customerStore.findDate[0]) : '' }} -
            {{ customerStore.findDate ? formatDate(customerStore.findDate[1]) : '' }}
        </h4>

        <Chart v-if="chartData?.labels?.length" type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />

        <div v-else class="text-gray-500 py-10">Belum ada data untuk ditampilkan</div>
    </div>
</template>
