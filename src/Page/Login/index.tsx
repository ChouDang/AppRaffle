import { Button, Heading, Image, Placeholder, Text, useAuthenticator, useTheme, View } from "@aws-amplify/ui-react";

export const component = {
    Header() {
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Image
                    alt="ChouDang logo"
                    src={process.env.NODE_ENV == "development"
                        ? `${window.location.origin}/public/LOGOCHOUDANG.png`
                        : `${window.location.origin}/LOGOCHOUDANG.png`}
                    width={200} height={100}
                />
            </View>
        );
    },

    Footer() {
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Text color={tokens.colors.neutral[80]}>
                    &copy; All Rights Reserved
                </Text>
            </View>
        );
    },

    SignIn: {
        Header() {
            return (
                <Heading
                    level={3}
                    style={{ display: 'flex', justifyContent: "center" }}
                >
                    Đăng nhập
                </Heading>
            );
        },

        Footer() {
            const { toForgotPassword } = useAuthenticator();

            return (
                <View textAlign="center">
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
    },

    SignUp: {
        Header() {
            const { tokens } = useTheme();

            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Create a new account
                </Heading>
            );
        },
        Footer() {
            const { toSignIn } = useAuthenticator();

            return (
                <View textAlign="center">
                    <Button
                        fontWeight="normal"
                        onClick={toSignIn}
                        size="small"
                        variation="link"
                    >
                        Back to Sign In
                    </Button>
                </View>
            );
        },
    },
    ConfirmSignUp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    SetupTotp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    ConfirmSignIn: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    ForgotPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    ConfirmResetPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
};

export const formFields = {
    signIn: {
        username: {
            label: 'Tài khoản:',
            placeholder: 'Nhập tài khoản',
        },
        password: {
            label: "Mật khẩu",
            placeholder: 'Nhập mật khẩu'
        }
    },
    signUp: {
        username: {
            isRequired: true,
            label: 'Tài khoản:',
            placeholder: 'Nhập tài khoản',
            order: 1,
        },
        password: {
            isRequired: true,
            label: 'Mật khẩu:',
            placeholder: 'Nhập mật khẩu',
            order: 2,
        },
        confirm_password: {
            isRequired: true,
            label: 'Nhập lại mật khẩu:',
            placeholder: 'Nhập lại mật khẩu',
            order: 3,
        },
        phone_number: {
            isRequired: true,
            label: 'Số điện thoại:',
            placeholder: 'Nhập số điện thoại',
            order: 4,
        },
        email: {
            isRequired: true,
            label: 'Địa chỉ mail:',
            placeholder: 'Nhập mail',
            order: 5,
        }
    },

}
