import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, ...rest }) => {
    const bookmarkClassName = status ? "-heart-fill" : "";
    return (
        <button {...rest}>
            <i className={"bi bi-bookmark" + bookmarkClassName}></i>
        </button>
    );
};

Bookmark.propTypes = {
    status: PropTypes.bool
};

export default Bookmark;
