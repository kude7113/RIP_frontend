import { FC } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setSearchValue } from '../redux/searchSlice';
import './InputField.css';

interface Props {
    onSubmit: () => void;
    loading?: boolean;
    placeholder?: string;
    buttonTitle?: string;
}

const InputField: FC<Props> = ({ onSubmit, loading, placeholder, buttonTitle = 'Найти' }) => {
    const dispatch = useDispatch();
    const searchValue = useSelector((state: RootState) => state.search.value);

    return (
        <div className="inputField">
            <InputGroup className="mb-3 border-custom">
                <Form.Control
                    placeholder={placeholder}
                    value={searchValue}
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    onChange={(event) => dispatch(setSearchValue(event.target.value))}
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
    );
};

export default InputField;
