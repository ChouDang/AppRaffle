import { Authenticator, Button, CheckboxField, Heading, Image, Placeholder, SelectField, Text, useAuthenticator, useTheme, View } from "@aws-amplify/ui-react";
import { I18n } from 'aws-amplify/utils';

I18n.putVocabularies({
    vi: {
        'Account recovery requires verified contact information': 'Khôi phục tài khoản yêu cầu thông tin liên hệ đã được xác minh',
        'Add your Profile': 'Thêm hồ sơ của bạn',
        'Add your Website': 'Thêm trang web của bạn',
        'Back to Sign In': 'Quay lại Đăng nhập',
        'Change Password': 'Thay đổi Mật khẩu',
        Changing: 'Đang thay đổi',
        Code: 'Mã',
        'Confirm Password': 'Xác nhận Mật khẩu',
        'Confirm Sign Up': 'Xác nhận Đăng ký',
        'Confirm SMS Code': 'Xác nhận Mã SMS',
        'Confirm MFA Code': 'Xác nhận Mã MFA',
        'Confirm TOTP Code': 'Xác nhận Mã TOTP',
        Confirm: 'Xác nhận',
        'Confirmation Code': 'Mã Xác nhận',
        Confirming: 'Đang xác nhận',
        'Create a new account': 'Tạo tài khoản mới',
        'Create Account': 'Tạo Tài khoản',
        'Creating Account': 'Đang tạo Tài khoản',
        'Dismiss alert': 'Bỏ qua cảnh báo',
        Email: 'Email',
        'Enter your Birthdate': 'Nhập Ngày sinh của bạn',
        'Enter your code': 'Nhập mã của bạn',
        'Enter your Confirmation Code': 'Nhập Mã xác nhận của bạn',
        'Enter your Email': 'Nhập Email của bạn',
        'Enter your Family Name': 'Nhập Họ của bạn',
        'Enter your Given Name': 'Nhập Tên của bạn',
        'Enter your Middle Name': 'Nhập Tên đệm của bạn',
        'Enter your Name': 'Nhập Tên của bạn',
        'Enter your Nickname': 'Nhập Biệt danh của bạn',
        'Enter your Password': 'Nhập Mật khẩu của bạn',
        'Enter your phone number': 'Nhập số điện thoại của bạn',
        'Enter your Preferred Username': 'Nhập Tên người dùng ưa thích của bạn',
        'Enter your username': 'Nhập Tên người dùng của bạn',
        'Forgot password?': 'Quên mật khẩu?',
        'Forgot your password?': 'Quên mật khẩu của bạn?',
        'Hide password': 'Ẩn mật khẩu',
        'It may take a minute to arrive': 'Có thể mất một phút để đến',
        Loading: 'Đang tải',
        'New password': 'Mật khẩu mới',
        or: 'hoặc',
        Password: 'Mật khẩu',
        'Phone Number': 'Số điện thoại',
        'Please confirm your Password': 'Vui lòng xác nhận Mật khẩu của bạn',
        'Resend Code': 'Gửi lại Mã',
        'Reset your password': 'Đặt lại mật khẩu của bạn',
        'Reset your Password': 'Đặt lại Mật khẩu của bạn',
        'Send code': 'Gửi mã',
        'Send Code': 'Gửi Mã',
        Sending: 'Đang gửi',
        'Setup TOTP': 'Thiết lập TOTP',
        'Show password': 'Hiển thị mật khẩu',
        'Sign in to your account': 'Đăng nhập vào tài khoản của bạn',
        'Sign In with Amazon': 'Đăng nhập với Amazon',
        'Sign In with Apple': 'Đăng nhập với Apple',
        'Sign In with Facebook': 'Đăng nhập với Facebook',
        'Sign In with Google': 'Đăng nhập với Google',
        'Sign in': 'Đăng nhập',
        'Sign In': 'Đăng nhập',
        'Signing in': 'Đang đăng nhập',
        Skip: 'Bỏ qua',
        Submit: 'Gửi đi',
        Submitting: 'Đang gửi',
        Username: 'Tên người dùng',
        'Verify Contact': 'Xác minh Liên hệ',
        Verify: 'Xác minh',
        'We Emailed You': 'Chúng tôi đã gửi email cho bạn',
        'We Sent A Code': 'Chúng tôi đã gửi một mã',
        'We Texted You': 'Chúng tôi đã nhắn tin cho bạn',
        'Your code is on the way. To log in, enter the code we emailed to':
            'Mã của bạn đang trên đường đến. Để đăng nhập, nhập mã chúng tôi đã gửi qua email đến',
        'Your code is on the way. To log in, enter the code we sent you':
            'Mã của bạn đang trên đường đến. Để đăng nhập, nhập mã chúng tôi đã gửi cho bạn',
        'Your code is on the way. To log in, enter the code we texted to':
            'Mã của bạn đang trên đường đến. Để đăng nhập, nhập mã chúng tôi đã gửi qua tin nhắn đến',
        "Your passwords must match": "Mật khẩu không giống"
    }
});
I18n.setLanguage('vi');

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
                    style={{
                        display: 'flex',
                        justifyContent: "center"
                    }}
                >
                    Tạo tài khoản
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
                        Quay lại Đăng nhập
                    </Button>
                </View>
            );
        },
        FormFields() {
            return (
                <>
                    <Authenticator.SignUp.FormFields />
                    <SelectField name="locale" label="Bạn là:">
                        <option value="User">Người dùng</option>
                        <option value="StoreOwner">Đại lý</option>
                    </SelectField>
                </>
            );
        },
    },
    ConfirmSignUp: {
        Header() {
            return (
                <Heading
                    level={3}
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    Nhập thông tin 111
                </Heading>
            );
        },

    },
    SetupTotp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    level={3}
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    Nhập thông tin
                </Heading>
            );
        },

    },
    ConfirmSignIn: {
        Header() {
            return (
                <Heading
                    level={3}
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    Nhập thông tin
                </Heading>
            );
        },

    },
    ForgotPassword: {
        Header() {
            return (
                <Heading
                    level={3}
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    Reset Mật khẩu
                </Heading>
            );
        },

    },
    ConfirmResetPassword: {
        Header() {
            return (
                <Heading
                    level={3}
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    Xác nhận Mật khẩu
                </Heading>
            );
        },

    },

};

export const formFields = {
    signIn: {
        username: {
            label: 'Địa chỉ email:',
            placeholder: 'Nhập email',
        },
        password: {
            label: "Mật khẩu",
            placeholder: 'Nhập mật khẩu'
        }
    },
    signUp: {
        username: {
            isRequired: true,
            label: 'Tên tài khoản:',
            placeholder: 'Nhập tên tài khoản',
            order: 1,
        },
        email: {
            isRequired: true,
            label: 'Địa chỉ email:',
            placeholder: 'Nhập email',
            order: 2,
        },
        password: {
            isRequired: true,
            label: 'Mật khẩu:',
            placeholder: 'Nhập mật khẩu',
            order: 3,
        },
        confirm_password: {
            isRequired: true,
            label: 'Nhập lại mật khẩu:',
            placeholder: 'Nhập lại mật khẩu',
            order: 4,
        },
        phone_number: {
            isRequired: true,
            label: 'Số điện thoại:',
            placeholder: 'Nhập số điện thoại',
            order: 5,
            dialCodeList: ['+84'],
            dialCode: '+84'
        },
        // group: {
        //     isRequired: true,
        //     label: 'Số điện thoại:',
        //     placeholder: 'Nhập số điện thoại',
        //     order: 5,
        //     dialCodeList: ['+84'],
        //     dialCode: '+84',
        //     type: 'autocomplete'
        // }
    },
    forgotPassword: {
        username: {
            label: 'Địa chỉ email:',
            placeholder: 'Nhập email',
        },
    },
    confirmSignUp: {
        confirmation_code: {
            label: 'Mã xác nhận:',
            placeholder: 'Nhập mã xác nhận',
        }
    }
}
