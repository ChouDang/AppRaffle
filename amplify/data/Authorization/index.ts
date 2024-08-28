// PublicApiKey - authMode: apiKey
export const AuthorizationPublicApiKey = (allow:any) => [allow.publicApiKey()];
// Guest - authMode: identityPool
export const AuthorizationGuest = (allow:any) => [allow.guest()];
// Owner - authMode: userPool | oidc
export const AuthorizationOwner = (allow: any) =>  [allow.owner()];
export const AuthorizationOwnerCustom = (allow: any, lstAction: string[]) =>  [allow.owner().to(lstAction)];
export const AuthorizationOwnerDefinedIn = (allow: any, name: string) =>  [allow.ownerDefinedIn(name || undefined)];
// Authenticated - authMode: userPool | oidc | identityPool
export const Authorization = (allow: any, auth: string) =>  [allow.authenticated(auth || undefined)];
// Group - authMode: userPool | oidc
export const AuthorizationGroup = (allow: any, name: string) =>  [allow.group(name)];
export const AuthorizationGroups = (allow: any, lstGroup: string[]) =>  [allow.groups(lstGroup)];
export const AuthorizationGroupDefinedIn = (allow: any, lstGroup: string[]) =>  [allow.groupDefinedIn(lstGroup.length === 1 ? lstGroup[0] : lstGroup)];
export const AuthorizationGroupsDefinedIn = (allow: any, lstGroup: string[]) =>  [allow.groupsDefinedIn(lstGroup.length === 1 ? lstGroup[0] : lstGroup)];
// Custom - authMode: lambda
export const AuthorizationCustom = (allow: any) => [allow.custom()];