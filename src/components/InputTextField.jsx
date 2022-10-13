import TextField from '@mui/material/TextField';

export default function InputTextField({
    idInput,
    typeInput,
    helperTextInput,
    labelInput,
    onChangeValue,
    valueInput,
    nameInput,
    autoComplete,
    fullWidth,
    width
}) {
    return (
        <>
            {helperTextInput && helperTextInput.length > 0 ?
                <TextField
                    fullWidth
                    color='secondary'
                    error
                    name={nameInput}
                    sx={{ mb: 2, width: width }}
                    label={labelInput}
                    type={typeInput}
                    id={idInput}
                    helperText={helperTextInput}
                    value={valueInput}
                    onChange={onChangeValue}
                    autoComplete={autoComplete}
                    required
                />
                :
                <TextField
                fullWidth
                    name={nameInput}
                    sx={{ mb: 2, width: width}}
                    label={labelInput}
                    type={typeInput}
                    id={idInput}
                    value={valueInput}
                    onChange={onChangeValue}
                    autoComplete={autoComplete}
                    required
                />
            }
        </>
    )
}