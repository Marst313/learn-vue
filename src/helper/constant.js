export const dokter = [
    { name: 'drh. Niluh', code: 'Option 1' },
    { name: 'drh. Berlin', code: 'Option 2' },
    { name: 'drh. Hemas', code: 'Option 3' }
];

export const jenisHewanList = [
    { name: 'Anjing' },
    { name: 'Kucing' },
    { name: 'Kelinci' },
    { name: 'Hamster' },
    { name: 'Burung' },
    { name: 'Iguana' },
    { name: 'Sugar Glider' },
    { name: 'Tikus Putih' },
    { name: 'Musang' },
    { name: 'Marmut' },
    { name: 'Ular' },
    { name: 'Kura-kura' },
    { name: 'Landak Mini' },
    { name: 'Ferret' },
    { name: 'Bebek' },
    { name: 'Ayam Hias' },
    { name: 'Kuda' },
    { name: 'Monyet' },
    { name: 'Biawak' }
];

export function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('id', options);
}

export function formatToLocalDateInput(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function groupByMonth(data) {
    const result = {};

    data.forEach((item) => {
        const tanggal = item.tanggalPeriksa;
        if (!tanggal) return;

        const date = new Date(tanggal);
        const monthYear = date.toLocaleString('id-ID', {
            month: 'long',
            year: 'numeric'
        });

        if (result[monthYear]) {
            result[monthYear]++;
        } else {
            result[monthYear] = 1;
        }
    });

    return result;
}

export function getCurrentYearDateRange() {
    const now = new Date();
    const year = now.getFullYear();

    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    return {
        startDate,
        endDate
    };
}

export function getCurrentMonthDateRange() {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // last day of month
    return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
    };
}

export function groupByWeekOfMonth(data) {
    const result = {
        'Minggu 1': 0,
        'Minggu 2': 0,
        'Minggu 3': 0,
        'Minggu 4': 0
    };

    data?.forEach((item) => {
        const date = new Date(item.tanggalPeriksa);
        const day = date.getDate();
        const weekNumber = Math.ceil(day / 7);
        result[`Minggu ${weekNumber}`]++;
    });

    return result;
}
