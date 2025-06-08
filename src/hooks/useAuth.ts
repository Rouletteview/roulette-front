import { useState, useEffect } from 'react';

interface User {
    name: string;
    email: string;

}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return { user };
}; 