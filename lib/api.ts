const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export async function createProfile(data: any) {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create profile");
    }
    return response.json();
}

export async function loginGitam(data: { roll_number: string; password?: string }) {
    const response = await fetch(`${BASE_URL}/auth/gitam/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to login");
    }
    return response.json();
}

export async function updateProfile(email: string, data: any) {
    const response = await fetch(`${BASE_URL}/auth/patch/${email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update profile");
    }
    return response.json();
}

export async function getProfile(email: string) {
    const response = await fetch(`${BASE_URL}/auth/profile/${email}`);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to get profile");
    }
    return response.json();
}
