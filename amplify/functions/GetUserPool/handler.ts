import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from 'aws-sdk';
const cognito = new AWS.CognitoIdentityServiceProvider();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(process.env, "check env")
    console.log(event, "check event")
    // Lấy thông tin người dùng từ sự kiện Cognito
    const userGroups = event?.requestContext?.authorizer?.claims['cognito:groups'] ?? false
    const userPoolId = event?.queryStringParameters?.userPoolId || ""
    // Kiểm tra nếu người dùng không thuộc nhóm Admin
    if (!userGroups || !userGroups?.includes('Admin')) {
        return {
            statusCode: 403,
            body: JSON.stringify({ message: 'Unauthorized: Admins only' }),
        };
    }
    try {
        const params = {
            UserPoolId: userPoolId,
        };
        // Lấy danh sách người dùng từ Cognito User Pool
        const data = await cognito.listUsers(params).promise();
        console.log(data, "resp data")
        return {
            statusCode: 200,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
                "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
            },
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching users' }),
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
                "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
            },
        };
    }
};