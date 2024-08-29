import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

// Khởi tạo dịch vụ Cognito
const cognito = new AWS.CognitoIdentityServiceProvider();

export const handler: APIGatewayProxyHandler = async (event) => {
    console.log(event, "event")
    const { userPoolId, username, groupName } = JSON.parse(event.body || '{}');

    if (!userPoolId || !username || !groupName) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing required parameters' }),
        };
    }

    const params = {
        GroupName: groupName,
        UserPoolId: userPoolId,
        Username: username,
    };
    console.log(params, "params")
    try {
        // await cognito.adminAddUserToGroup(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User added to group successfully!' }),
        };
    } catch (error) {
        console.error('Error adding user to group:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};
