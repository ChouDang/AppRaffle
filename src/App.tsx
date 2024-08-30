import { Authenticator, Button, useAuthenticator, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import HomeGuest from './Page/HomeGuest';
import Layout from './Page/Layout';
import { component, formFields } from './Page/Login';
import { Spin } from 'antd';

export default function App() {
  const [loginAction, set_loginAction] = useState(false)
  const { authStatus, toForgotPassword } = useAuthenticator(context => [context.authStatus]);
  if (authStatus === 'configuring') {
    return <Spin spinning={true} />
  }
  return (
    <Fragment>{
      authStatus === 'authenticated' || loginAction
        ? <Authenticator
          // socialProviders={['facebook', 'google']}
          formFields={formFields}
          components={{
            ...component,
            SignIn: {
              ...component.SignIn,
              Footer() {
                return (
                  <View textAlign="center" style={{
                    display: "flex",
                    justifyContent: "space-around"
                  }}>
                    <Button
                      fontWeight="normal"
                      onClick={() => set_loginAction(false)}
                      size="small"
                      variation="link"
                    >
                      Đi đến trang khách
                    </Button>
                    <Button
                      fontWeight="normal"
                      onClick={toForgotPassword}
                      size="small"
                      variation="link"
                    >
                      Reset Mật khẩu
                    </Button>
                  </View>
                );
              },
            }
          }}
          loginMechanisms={['email']}
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
