const AUTH_BASE = import.meta.env.VITE_AUTH_URL || "http://localhost:5000";

export async function signup({ name, email, password }) {
    const response = await fetch(`${AUTH_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to sign up');
    }
    return data.user;
}

export async function login({ email, password }) {
    const response = await fetch(`${AUTH_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to login');
    }
    return data.user;
}

export async function me() {
    const response = await fetch(`${AUTH_BASE}/api/auth/me`, {
        credentials: 'include'
    });
    const data = await response.json();
    return data;
}

export async function logout() {
    const response = await fetch(`${AUTH_BASE}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    });
}

export async function getOAuthUrl(provider) {
    return `${AUTH_BASE}/api/auth/${provider}`;
}