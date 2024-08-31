import { SelectField, TextField } from '@aws-amplify/ui-react'
import { Control, Controller, FieldValues } from 'react-hook-form'

type Props = {
    name: string,
    control: Control<FieldValues>,
    label?: string,
    descriptiveText?: string,
    required?: boolean
    options: Option[]
} & FieldValues

const SelectForm = (props: Props) => {

    const {
        name,
        control,
        label,
        descriptiveText,
        required,
        options = [],
        rules,
        ...res
    } = props

    return (
        <div className='w-full mb-3'>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => {
                    return <SelectField
                        {...res}
                        {...field}
                        descriptiveText={descriptiveText}
                        label={<label className='amplify-label'>{label} {required && <span style={{ color: 'red' }}>*</span>}</label>}
                        errorMessage={fieldState?.error?.message}
                        hasError={!!fieldState?.error?.message}
                    >
                        {!!options.length && options.map(({ value, label }) => {
                            return <option value={value}>{label}</option>
                        })}
                    </SelectField>
                }}
            />
        </div>
    )
}

export default SelectForm