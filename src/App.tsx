import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import HomeGuest from './Page/HomeGuest';
import Layout from './Page/Layout';
import { component, formFields } from './Page/Login';
import { confirmSignUp, signUp, SignUpInput } from 'aws-amplify/auth';

export default function App() {
  const [loginAction, set_loginAction] = useState(false)
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  return (
    <Fragment>{
      authStatus !== 'authenticated' && loginAction
        ? <Authenticator
          // socialProviders={['facebook', 'google']}
          formFields={formFields}
          components={component}
          loginMechanisms={['email']}
        // services={{
        //   handleConfirmSignUp: ({ username, confirmationCode }) => confirmSignUp({
        //     username: username.toLowerCase(),
        //     password,
        //     options: {
        //       ...options,
        //       userAttributes: {
        //         ...options?.userAttributes,
        //         email: options?.userAttributes?.email?.toLowerCase(),
        //       },
        //     },
        //   })
        // }}
        >
          {({ signOut, user }) => {
            return <Fragment>
              <Layout signOut={signOut} user={user} />
            </Fragment>
          }}
        </Authenticator>
        : <HomeGuest set_loginAction={set_loginAction} />
    }</Fragment>
  );
}
