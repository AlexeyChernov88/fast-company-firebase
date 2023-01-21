import React from "react";
import PropTypes from "prop-types";

const SearchUsers = ({ value, onSearchUsers, error }) => {
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    return (
        <div className="mb-4">
            <div className="input-group w-100">
                <input
                    type="text"
                    value={value}
                    onChange={onSearchUsers}
                    name="search"
                    id="search"
                    className={getInputClasses()}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

SearchUsers.propTypes = {
    value: PropTypes.string,
    onSearchUsers: PropTypes.func,
    error: PropTypes.string
};

export default SearchUsers;
