import { fetchAuthSession } from "aws-amplify/auth";
// https://9yc8g6nh89.execute-api.ap-southeast-1.amazonaws.com/dev/getUserPoolFunction
//`${process.env.GATEWAY_API_BASE_URL}/${endPoint}`
const endPoint = 'dev/getUserPoolFunction';
export const fetchUsers = async () => {
    try {
        let info = await fetchAuthSession()
        const response = await fetch(`${process.env.GATEWAY_API_BASE_URL}/${endPoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${info?.tokens?.accessToken.toString()}`,
            },
        });
        console.log("pass", response, response.ok)
        if (!response.ok) {
            console.log("check")
            throw new Error('Failed to fetch users');
        }
        const users = await response.json();
        console.log('Users:', users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

