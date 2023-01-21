import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({
    name: nameCheckbox,
    onChange,
    value,
    children,
    error
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: nameCheckbox, value: !value });
    };
    const getInputClasses = () => {
        return "form-check-input" + (error ? " is-invalid" : "");
    };
    return (
        <div className="form-check mb-4">
            <input
                className={getInputClasses()}
                type="checkbox"
                id={nameCheckbox}
                checked={value}
                onChange={handleChange}
                value=""
            />
            <label className="form-check-label" htmlFor={nameCheckbox}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string
};

export default CheckBoxField;
