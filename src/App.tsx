import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import HomeGuest from './Page/HomeGuest';
import Layout from './Page/Layout';
import { component, formFields } from './Page/Login';

function App() {

  const [loginAction, set_loginAction] = useState(false)
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  return (
    <Fragment>{
      authStatus !== 'authenticated' && loginAction
        ? <Authenticator formFields={formFields} components={component} >
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

export default App;
