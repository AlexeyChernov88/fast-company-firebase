import React from "react";
import PropTypes from "prop-types";
import { useProfession } from "../../hooks/useProfesions";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfession();
    const prof = getProfession(id);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    }
    return "Loading";
};

Profession.propTypes = {
    id: PropTypes.string.isRequired
};

export default Profession;
