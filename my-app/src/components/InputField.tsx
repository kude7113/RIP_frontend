import { FC } from 'react'
import { Button, InputGroup, Form } from 'react-bootstrap'
import './InputField.css'

interface Props {
    value: string
    setValue: (value: string) => void
    onSubmit: () => void
    loading?: boolean
    placeholder?: string
    buttonTitle?: string
}

const InputField: FC<Props> = ({ value, setValue, onSubmit, loading, placeholder, buttonTitle = 'Найти' }) => (
    <div className="inputField">
        <InputGroup className="mb-3 border-custom">
            <Form.Control
                placeholder={placeholder}
                value={value}
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(event) => setValue(event.target.value)}
                className="input-custom"
            />
            <Button
                type="submit"
                id="button-addon1"
                disabled={loading}
                onClick={onSubmit}
                className="btn-custom"
            >
                {buttonTitle}
            </Button>
        </InputGroup>
    </div>


)

export default InputField
