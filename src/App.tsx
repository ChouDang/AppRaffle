import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { Fragment } from 'react/jsx-runtime';
import Layout from './Page/Layout';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (<Fragment>
        <Layout signOut={signOut} user={user} />
      </Fragment>
      )}
    </Authenticator>
  );
}

export default App;
