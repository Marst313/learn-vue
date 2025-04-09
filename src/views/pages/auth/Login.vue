<script setup>
import { AuthService } from '@/service/AuthService';
import { useToast } from 'primevue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();
const toast = useToast();

const handleLogin = async () => {
    try {
        const response = await AuthService.login(email.value, password.value);

        localStorage.setItem('accessToken', response.data.accessToken);

        router.push('/');
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Login Gagal',
            detail: error.message,
            life: 3000
        });
    }
};

onMounted(async () => {
    try {
        const user = await AuthService.getMe();
        if (user) {
            router.push('/');
        }
    } catch (error) {
        toast.add({
            severity: 'warn',
            summary: 'Session habis',
            detail: error.message,
            life: 3000
        });
    }
});
</script>

<template>
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <form class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px" @submit.prevent="handleLogin">
                    <div class="text-center mb-8">
                        <img src="../../../assets/img/logo-dewata.jpg" alt="icon dewata" class="mb-8 w-40 shrink-0 mx-auto rounded-full" />
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to Dewata Petshop</div>
                        <span class="text-muted-color font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" v-model="email" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                        <Password inputId="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <!-- <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span> -->
                        </div>
                        <Button label="Sign In" type="submit" class="w-full"></Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
