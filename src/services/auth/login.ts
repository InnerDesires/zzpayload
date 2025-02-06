
export const login = async ({email, password}: {email: string, password: string}) => {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        return await response.json();
    }
    return await response.json();
}