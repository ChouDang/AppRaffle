import { fetchAuthSession } from "aws-amplify/auth";

const endPoint = 'dev/getUserPoolFunction';
export const fetchUsers = async () => {
    try {
        fetchAuthSession().then(async (info) => {
            const response = await fetch(`${process.env.GATEWAY_API_BASE_URL}/${endPoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${info?.tokens?.accessToken.toString()}`,
                },
            });
            if (!response.ok) {
                console.log("check")
                throw new Error('Failed to fetch users');
            }
            const users = await response.json();
            console.log('Users:', users);
        })

    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

