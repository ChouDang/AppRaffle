import type { PostConfirmationTriggerHandler } from 'aws-lambda';
import {
    CognitoIdentityProviderClient,
    AdminAddUserToGroupCommand
} from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient();

// add user to group
export const handler: PostConfirmationTriggerHandler = async (event) => {
    console.log(event, "event")
    const command = new AdminAddUserToGroupCommand({
        GroupName: "StoreOwner",
        Username: event.userName,
        UserPoolId: event.userPoolId
    });
    console.log(command, "command")
    const response = await client.send(command);
    console.log('processed', response.$metadata.requestId);
    return event;
};