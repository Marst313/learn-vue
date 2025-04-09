<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout';
import { AuthService } from '@/service/AuthService';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Import PrimeVue components
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();
const router = useRouter();
const toast = useToast();

const showLogoutDialog = ref(false);

function openLogoutDialog() {
    showLogoutDialog.value = true;
}

async function logout() {
    try {
        await AuthService.logout();
        router.push('/auth/login');
    } catch (error: any) {
        toast.add({
            severity: 'error',
            summary: 'Logout Gagal',
            detail: error.message || 'Terjadi kesalahan saat logout',
            life: 3000
        });
    } finally {
        showLogoutDialog.value = false;
    }
}
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
                <i class="pi pi-bars"></i>
            </button>
            <router-link to="/" class="layout-topbar-logo">
                <img src="../assets/img/logo-dewata.jpg" alt="logo-dewata" class="rounded-lg w-12 h-12 object-cover" />
                <span>Dewata Petshop</span>
            </router-link>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
            </div>

            <button
                class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            >
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <!-- Avatar Logout Button -->
            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action" @click="openLogoutDialog">
                        <i class="pi pi-sign-out"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Logout Confirmation Modal -->
    <Dialog v-model:visible="showLogoutDialog" header="Logout" :modal="true" :closable="false">
        <div class="p-4">
            <p>Apakah Anda yakin ingin logout?</p>
        </div>
        <template #footer>
            <Button label="Batal" icon="pi pi-times" class="p-button-text" @click="showLogoutDialog = false" />
            <Button label="Logout" icon="pi pi-sign-out" class="p-button-danger" @click="logout" />
        </template>
    </Dialog>
</template>
