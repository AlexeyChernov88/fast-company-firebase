import React, { useState, useEffect } from "react";
import AreaTextField from "../form/areaTextField";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";

const AddCommentsForm = ({ onSubmit }) => {
    const [data, setData] = useState({});
    // const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [data]);
    const clearForm = () => {
        setData({});
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    const isValid = Object.keys(errors).length === 0;
    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <AreaTextField
                    label="Сообщение"
                    name="content"
                    value={data.content || ""}
                    onChange={handleChange}
                    error={errors.content}
                />
                <button
                    type="submit"
                    disabled={!isValid}
                    className="btn btn-primary w-100 mx-auto"
                >
                    Добавить
                </button>
            </form>
        </div>
    );
};

AddCommentsForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};
export default AddCommentsForm;
