import { defineBackend } from "@aws-amplify/backend";
import { aws_iam, Stack } from "aws-cdk-lib";
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  Cors,
  LambdaIntegration,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { storage } from './storage/resource';
import { postConfirmation } from "./functions/AddUserToGroupFunction/resource";
import { getUserPool } from "./functions/GetUserPool/resource";

const backend = defineBackend({
  auth,
  data,
  storage,
  postConfirmation,
  getUserPool,
});
// create a new API stack
const apiStack = backend.createStack("api-stack");

// create a new REST API
const myRestApi = new RestApi(apiStack, "RestApi", {
  restApiName: "myRestApi",
  deploy: true,
  deployOptions: {
    stageName: "dev",
    cachingEnabled: false,
  },
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS, // Restrict this to domains you trust
    allowMethods: Cors.ALL_METHODS, // Specify only the methods you need to allow
    allowHeaders: Cors.DEFAULT_HEADERS, // Specify only the headers you need to allow
  },
});

// create a new Cognito User Pools authorizer
const cognitoAuth = new CognitoUserPoolsAuthorizer(apiStack, "CognitoAuth", {
  cognitoUserPools: [backend.auth.resources.userPool],
});

const lambdaIntegrationAddUserToGroupFunction = new LambdaIntegration(
  backend.postConfirmation.resources.lambda
);

const lambdaIntegrationGetUserPool = new LambdaIntegration(
  backend.getUserPool.resources.lambda
);


// create a new resource path with IAM authorization & add methods you would like to create to the resource path
const addUserToGroupFunctionPath = myRestApi.root.addResource("addUserToGroupFunction", {
  defaultMethodOptions: {
    authorizationType: AuthorizationType.IAM,
  },
});
addUserToGroupFunctionPath.addMethod("POST", lambdaIntegrationAddUserToGroupFunction, {
  authorizationType: AuthorizationType.COGNITO,
  authorizer: cognitoAuth,
});

const getUserPoolPath = myRestApi.root.addResource("getUserPoolFunction", {
  defaultMethodOptions: {
    authorizationType: AuthorizationType.IAM,
  },
});
getUserPoolPath.addMethod("GET", lambdaIntegrationGetUserPool, {
  authorizationType: AuthorizationType.COGNITO,
  authorizer: cognitoAuth,
});


// create a new IAM policy to allow Invoke access to the API
const apiRestPolicy = new Policy(apiStack, "RestApiPolicy", {
  statements: [
    new PolicyStatement({
      actions: ["execute-api:Invoke"],
      resources: [
        `${myRestApi.arnForExecuteApi("*", "/addUserToGroupFunction", "dev")}`,
        `${myRestApi.arnForExecuteApi("*", "/getUserPoolFunction", "dev")}`,
      ],
    }),
  ],
});

// Define IAM Policy Statement
const lambdaPolicy = new aws_iam.PolicyStatement({
  sid: 'AllowCognitoListUsers',
  actions: ['cognito-idp:ListUsers'],
  resources: ['*'],
});
backend.getUserPool.resources.lambda.addToRolePolicy(lambdaPolicy)

// attach the policy to the authenticated and unauthenticated IAM roles
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(
  apiRestPolicy
);
backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(
  apiRestPolicy
);

// add outputs to the configuration file
backend.addOutput({
  custom: {
    API: {
      [myRestApi.restApiName]: {
        endpoint: myRestApi.url,
        region: Stack.of(myRestApi).region,
        apiName: myRestApi.restApiName,
      },
    },
  },
});