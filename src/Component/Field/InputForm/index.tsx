import { PasswordField, PhoneNumberField, TextField } from '@aws-amplify/ui-react'
import { Control, Controller, FieldValues } from 'react-hook-form'

type Props = {
    name: string,
    control: Control<FieldValues>,
    placeholder: string,
    label?: string,
    descriptiveText?: string,
    required?: boolean
} & FieldValues

const InputForm = (props: Props) => {

    const {
        name,
        control,
        placeholder,
        label,
        descriptiveText,
        required,
        isPassword = false,
        isPhone = false,
        rules,
        ...res
    } = props

    if (isPhone) {
        return <div className='w-full mb-3'>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => {
                    return <PhoneNumberField
                        {...res}
                        {...field}
                        descriptiveText={descriptiveText}
                        label={<label className='amplify-label'>{label} {required && <span style={{ color: 'red' }}>*</span>}</label>}
                        placeholder={placeholder}
                        errorMessage={fieldState?.error?.message}
                        hasError={!!fieldState?.error?.message}
                        defaultDialCode="+84"
                        dialCodeList={['+84']}
                    />
                }}
            />
        </div>
    }

    if (isPassword) {
        return <div className='w-full mb-3'>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => {
                    return <PasswordField
                        {...res}
                        {...field}
                        descriptiveText={descriptiveText}
                        label={<label className='amplify-label'>{label} {required && <span style={{ color: 'red' }}>*</span>}</label>}
                        placeholder={placeholder}
                        errorMessage={fieldState?.error?.message}
                        hasError={!!fieldState?.error?.message}
                    />
                }}
            />
        </div>
    }

    return (


        <div className='w-full mb-3'>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => {
                    return <TextField
                        {...res}
                        {...field}
                        descriptiveText={descriptiveText}
                        label={<label className='amplify-label'>{label} {required && <span style={{ color: 'red' }}>*</span>}</label>}
                        placeholder={placeholder}
                        errorMessage={fieldState?.error?.message}
                        hasError={!!fieldState?.error?.message}
                    />
                }}
            />
        </div>
    )
}

export default InputForm