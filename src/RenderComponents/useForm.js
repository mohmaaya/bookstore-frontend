import { useState } from 'react';

const useForm = (initialValues, onSubmit, validation) => {
    const [values, setValues] = useState(initialValues);
    const [handleErrors, setHandleErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        const fieldNames = name.split('.'); 
        if (fieldNames.length === 2) {
            setValues((prevValues) => ({
                ...prevValues,
                [fieldNames[0]]: { ...prevValues[fieldNames[0]], [fieldNames[1]]: value },
            }));
        } else {
            setValues((prevValues) => ({ ...prevValues, [name]: value }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validation(values);
        if (validationErrors != null && Object.keys(validationErrors).length !== 0) {
            setHandleErrors(validationErrors);
        } else {
            onSubmit(values);
        }
    };

    return { values, handleErrors, handleChange, handleSubmit };
};

export default useForm;
