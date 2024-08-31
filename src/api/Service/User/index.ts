import { Amplify } from "aws-amplify";
import { fetchAuthSession } from "aws-amplify/auth";

const endPoint = 'getUserPoolFunction';
export const fetchUsers = async () => {
    try {
        let config = Amplify.getConfig();
        let session = await fetchAuthSession()
        const idToken = session?.tokens?.idToken?.toString();
        const response = await fetch(`${config.API.REST.myRestApi.endpoint}${endPoint}?userPoolId=${config.Auth.Cognito.userPoolId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const users = await response.json();
        console.log('Users:', users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

