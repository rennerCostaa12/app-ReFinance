import TextField from '@mui/material/TextField';

export default function InputTextField({
    idInput,
    typeInput,
    helperTextInput,
    labelInput,
    onChangeValue,
    valueInput,
    nameInput
}) {
    return (
        <>
            {helperTextInput && helperTextInput.length > 0 ?
                <TextField
                    error
                    fullWidth
                    name={nameInput}
                    sx={{ mb: 2 }}
                    label={labelInput}
                    type={typeInput}
                    id={idInput}
                    helperText={helperTextInput}
                    value={valueInput}
                    onChange={onChangeValue}
                    required
                />
                :
                <TextField
                    fullWidth
                    name={nameInput}
                    sx={{ mb: 2 }}
                    label={labelInput}
                    type={typeInput}
                    id={idInput}
                    value={valueInput}
                    onChange={onChangeValue}
                    required
                />
            }
        </>
    )
}