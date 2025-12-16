import { auth } from "./firebase";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export async function createProfileNonGitamite(data: any) {
    const response = await fetch(`${BASE_URL}/auth/profile/non-gitamite`, {
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

export async function loginGitam(data: { roll_number: string; password?: string; fcm_token?: string }) {
    const response = await fetch(`${BASE_URL}/auth/profile/gitamite`, {
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

export async function getProfile(uid: string) {
    console.log(uid);
    const response = await fetch(`${BASE_URL}/auth/profile/${uid}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${await auth.currentUser?.getIdToken()}` },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to get profile");
    }
    return response.json();
}

export async function updateSecurityPicture(uid: string, url: string) {
    const response = await fetch(`${BASE_URL}/auth/profile/${uid}/security_picture`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${await auth.currentUser?.getIdToken()}` },
        body: JSON.stringify({ security_picture: url }),
    });
    if (!response.ok) {
        const error = await response.json();
        if (!error.status) {
            throw new Error(error.message || "Failed to update security picture");
        }
        throw new Error(error.message || "Failed to update security picture");
    }
    return response.json();
}

export async function updateIdCard(uid: string, url: string) {
    const response = await fetch(`${BASE_URL}/auth/profile/${uid}/id_card_picture`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${await auth.currentUser?.getIdToken()}` },
        body: JSON.stringify({ id_card_picture: url }),
    });
    if (!response.ok) {
        const error = await response.json();
        if (!error.status) {
            throw new Error(error.message || "Failed to update ID card");
        }
        throw new Error(error.message || "Failed to update ID card");
    }
    return response.json();
}

export async function updateDigiLocker(uid: string, data: any) {
    const response = await fetch(`${BASE_URL}/auth/profile/${uid}/digilocker_data`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${await auth.currentUser?.getIdToken()}` },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        if (!error.status) {
            throw new Error(error.message || "Failed to update DigiLocker data");
        }
        throw new Error(error.message || "Failed to update DigiLocker data");
    }
    return response.json();
}

export async function updateDisplayPicture(uid: string, url: string) {
    const response = await fetch(`${BASE_URL}/auth/profile/${uid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${await auth.currentUser?.getIdToken()}` },
        body: JSON.stringify({ display_picture: url }),
    });
    if (!response.ok) {
        const error = await response.json();
        if (!error.status) {
            throw new Error(error.message || "Failed to update display picture");
        }
        throw new Error(error.message || "Failed to update display picture");
    }
    return response.json();
}

export async function getEvents() {
    const response = await fetch(`${BASE_URL}/events`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch events");
    }
    return response.json();
}

export async function getEvent(slug: string) {
    const response = await fetch(`${BASE_URL}/events/${slug}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch event");
    }
    return response.json();
}

export async function registerForEvent(eventId: string, formData: any) {
    const response = await fetch(`${BASE_URL}/registrations/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${await auth.currentUser?.getIdToken()}`
        },
        body: JSON.stringify({ event_id: eventId, form_data: formData }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to register for event");
    }
    return response.json();
}

export async function getMyTicket() {
    const response = await fetch(`${BASE_URL}/tickets/my-ticket`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${await auth.currentUser?.getIdToken()}`
        },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch ticket");
    }
    return response.json();
}
