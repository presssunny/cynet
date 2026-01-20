const config = {
    // Vite דורש שנשתמש ב-import.meta.env כדי לקרוא משתנים
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    clientId: import.meta.env.VITE_CLIENT_ID || 'default-client',
    appTitle: import.meta.env.VITE_APP_TITLE || 'My Dashboard',
};

export default config;