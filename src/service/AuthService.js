export const AuthService = {
    login: async (email, password) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data;
    },
    logout: async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/sign-out`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        localStorage.removeItem('accessToken');

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        return true;
    },
    getMe: async () => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Gagal mengambil data pengguna');
        }

        return data;
    }
};
