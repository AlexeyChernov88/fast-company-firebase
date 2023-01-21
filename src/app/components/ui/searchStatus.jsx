import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = (length) => {
        if (length >= 2 && length <= 4) {
            return `${length} человека тусанут`;
        }
        return `${length} человек тусанет`;
    };
    if (length === 0) {
        return (
            <h1>
                <span className="badge bg-danger">
                    Никто с тобой не тусанет
                </span>
            </h1>
        );
    }
    return (
        <h1>
            <span className="badge bg-primary">
                {renderPhrase(length)} с тобой сегодня
            </span>
        </h1>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
