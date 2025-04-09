<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Beranda',
        items: [
            { label: 'Beranda', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Pelanggan', icon: 'pi pi-fw pi-users', to: '/pelanggan' },
            { label: 'Rekap', icon: 'pi pi-chart-bar', to: '/rekap' }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>
