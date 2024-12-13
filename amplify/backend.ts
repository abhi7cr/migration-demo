import { auth } from "./auth/resource";
import { RemovalPolicy } from "aws-cdk-lib";
import { defineBackend } from "@aws-amplify/backend";
import { Duration } from "aws-cdk-lib";
const backend = defineBackend({
    auth
});
const cfnUserPool = backend.auth.resources.cfnResources.cfnUserPool;
cfnUserPool.userPoolName = "testmigrationdemoede58da3_userpool_ede58da3-dev";
cfnUserPool.usernameAttributes = undefined;
cfnUserPool.policies = {
    passwordPolicy: {
        minimumLength: 8,
        requireLowercase: false,
        requireNumbers: false,
        requireSymbols: false,
        requireUppercase: false,
        temporaryPasswordValidityDays: 7
    }
};
cfnUserPool.applyRemovalPolicy(RemovalPolicy.RETAIN, { applyToUpdateReplacePolicy: false })
const cfnIdentityPool = backend.auth.resources.cfnResources.cfnIdentityPool;
cfnIdentityPool.identityPoolName = "testmigrationdemoede58da3_identitypool_ede58da3__dev";
cfnIdentityPool.allowUnauthenticatedIdentities = false;
cfnIdentityPool.applyRemovalPolicy(RemovalPolicy.RETAIN, { applyToUpdateReplacePolicy: false })
const userPool = backend.auth.resources.userPool;
userPool.addClient("eu-central-1_ScKfp9A7b", {
    disableOAuth: true,
    authSessionValidity: Duration.minutes(3),
    userPoolClientName: "testmiede58da3_app_client",
    enablePropagateAdditionalUserContextData: false,
    enableTokenRevocation: true,
    refreshTokenValidity: Duration.days(30)
})
