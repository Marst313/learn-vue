<script setup>
import { getCurrentMonthDateRange, groupByWeekOfMonth } from '@/helper/constant';
import { useCustomerStore } from '@/store/pelanggan';
import { onMounted, ref } from 'vue';

const customerStore = useCustomerStore();
const chartData = ref();
const chartOptions = ref();

const updateChart = () => {
    const grouped = groupByWeekOfMonth(customerStore.recapCustomerMonthly);

    chartData.value = {
        labels: Object.keys(grouped),
        datasets: [
            {
                label: 'Jumlah Pelanggan',
                data: Object.values(grouped),
                backgroundColor: '#42A5F5'
            }
        ]
    };

    chartOptions.value = {
        indexAxis: 'y', // horizontal bar
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: getComputedStyle(document.body).getPropertyValue('--p-text-color')
                }
            }
        }
    };
};

const fetchMonthlyData = async () => {
    const { startDate, endDate } = getCurrentMonthDateRange();
    await customerStore.getRecapMonthly(startDate, endDate); // reuse this method
    updateChart();
};

onMounted(fetchMonthlyData);
</script>

<template>
    <div class="card flex flex-col justify-center items-center min-w-96 w-full h-fit">
        <h4 class="font-normal mb-4">Rekap Mingguan Bulan {{ new Date().toLocaleString('id-ID', { month: 'long' }) }}</h4>

        <Chart v-if="chartData" type="bar" :data="chartData" :options="chartOptions" class="w-full" />

        <div v-else class="text-gray-500 py-10">Belum ada data</div>
    </div>
</template>
