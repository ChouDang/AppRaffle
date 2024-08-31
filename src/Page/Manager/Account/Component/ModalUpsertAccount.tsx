import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Modal, notification, Row, Space, Typography } from 'antd'
import { signUp } from "aws-amplify/auth"
import { Fragment, useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import InputForm from '../../../../Component/Field/InputForm'
import SelectForm from '../../../../Component/Field/SelectForm'
import { updateUserAttributes } from 'aws-amplify/auth';

const ModalUpsertAccount = ({
    rowEditing,
    open,
    onClose = () => { }
}: {
    rowEditing: User | null,
    open: boolean,
    onClose: () => void
}) => {

    const queryClient = useQueryClient()
    const { control, reset, handleSubmit, getValues } = useForm({
        mode: 'onSubmit',
        shouldUnregister: false
    })

    const isEdit = rowEditing?.Username ?? false

    const { mutateAsync: onSubmit } = useMutation({
        mutationFn: async (form: FieldValues) => {
            try {
                if (isEdit) {
                    let a = await updateUserAttributes({
                        userAttributes: {
                            email: form.email || '',
                            phone_number: "+84" + form.phone || '',
                            locale: form.locale || ''
                        },
                    });
                    console.log(a, "a")
                } else {
                    let { nextStep } = await signUp({
                        username: form.email || '',
                        password: form.password || '',
                        options: {
                            userAttributes: {
                                email: form.email || '',
                                phone_number: "+84" + form.phone || '',
                                locale: form.locale || ''
                            },
                        }
                    })
                    if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
                        notification.success({ message: "Đăng ký thành công" })
                        queryClient.invalidateQueries({ queryKey: ['getUserPool'] })
                        onClose()
                    } else {
                        notification.error({ message: "Lỗi server" })
                    }
                }
            } catch (error) {
                console.log(error, "error")
                notification.error({ message: "Lỗi server" })
            }
        }
    })

    useEffect(() => {
        if (open) {
            if (rowEditing) {
                reset({
                    email: rowEditing.Attributes.find(i => i.Name === "email")?.Value || "",
                    phone: rowEditing.Attributes.find(i => i.Name === "phone_number")?.Value?.split("+84")[1] || "",
                    locale: rowEditing.Attributes.find(i => i.Name === "locale")?.Value || "",
                })
            } else {
                reset({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phone: '',
                    locale: 'User'
                })
            }
        }
    }, [open, rowEditing])

    return (
        <Fragment>
            <Modal
                title={<Typography.Title level={4}>
                    {`${isEdit ? 'Chỉnh sửa ' : 'Thêm mới '} người dùng`}
                </Typography.Title>}
                centered
                open={open}
                footer={<></>}
                onOk={() => { }}
                onCancel={onClose}
                width={600}
            >
                <Row className='mb-3'>
                    <InputForm
                        name={"email"}
                        control={control}
                        label={"Email"}
                        placeholder='Nhập email'
                        required
                        rules={{
                            required: 'Email không được để trống',
                            validate: (value: string) => {
                                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Email không hợp lệ';
                            }
                        }}
                    />
                    {!isEdit &&
                        <InputForm
                            name={"password"}
                            control={control}
                            label={"Mật khẩu"}
                            placeholder='Nhập mật khẩu'
                            required
                            isPassword
                            rules={{
                                required: 'Mật khẩu không được để trống',
                                validate: (value: string) => {
                                    if (value.length < 8) return "Mật khẩu tối thiểu 8 ký tự"
                                    if (!(/[A-Z]/.test(value))) return "Mật khẩu phải có chữ in hoa"
                                    if (!(/\d/.test(value))) return "Mật khẩu phải có số"
                                    if (!(/[!@#$%^&*(),.?":{}|<>]/.test(value))) return "Mật khẩu phải có ký tự đặc biệt"
                                }
                            }}
                        />
                    }
                    {!isEdit &&
                        <InputForm
                            name={"confirmPassword"}
                            control={control}
                            label={"Nhập lại mật khẩu"}
                            placeholder='Nhập mật khẩu'
                            required
                            isPassword
                            rules={{
                                required: 'Mật khẩu không được để trống',
                                validate: (value: string) => {
                                    if (getValues("confirmPassword") !== value) return "Mật khẩu không giống"
                                    if (value.length < 8) return "Mật khẩu tối thiểu 8 ký tự"
                                    if (!(/[A-Z]/.test(value))) return "Mật khẩu phải có chữ in hoa"
                                    if (!(/\d/.test(value))) return "Mật khẩu phải có số"
                                    if (!(/[!@#$%^&*(),.?":{}|<>]/.test(value))) return "Mật khẩu phải có ký tự đặc biệt"
                                }
                            }}
                        />}
                    <InputForm
                        name={"phone"}
                        control={control}
                        label={"Số điện thoại"}
                        placeholder='Nhập số điện thoại'
                        required
                        isPhone
                        rules={{
                            required: 'Số điện thoại không được để trống',
                            validate: (value: string) => {
                                if (!(/\d/.test(value))) return "Số điện thoại phải có số"
                            }
                        }}
                    />
                    <SelectForm
                        name={"locale"}
                        control={control}
                        label={"Vai trò"}
                        options={[
                            { value: 'User', label: 'Người dùng' },
                            { value: 'StoreOwner', label: 'Đại lý' }
                        ]}
                        required
                    />
                </Row>
                <Row justify={"end"} align={'middle'}>
                    <Space>
                        <Button onClick={() => onClose()}>
                            Đóng
                        </Button>
                        <Button type='primary' onClick={() => handleSubmit((form) => onSubmit(form))()}>
                            {isEdit ? "Cập nhật" : "Tạo tài khoản"}
                        </Button>
                    </Space>
                </Row>
            </Modal>
        </Fragment>
    )
}

export default ModalUpsertAccount