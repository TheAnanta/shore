export interface User {
    id: string;
    name: string;
    email: string;
    role: 'gitamite' | 'non-gitamite';
    isOnboarded: boolean;
}

export const mockAuth = {
    loginGitamite: async (rollNumber: string, password: string): Promise<User> => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
            id: '123',
            name: 'Gitam Student',
            email: `${rollNumber}@gitam.edu`,
            role: 'gitamite',
            isOnboarded: false, // Force onboarding for demo
        };
    },

    loginGoogle: async (): Promise<User> => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
            id: '456',
            name: 'Guest User',
            email: 'guest@gmail.com',
            role: 'non-gitamite',
            isOnboarded: false,
        };
    },
};
