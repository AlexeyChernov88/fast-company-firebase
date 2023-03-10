import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQuality();
    if (isLoading) {
        return "Loading";
    }
    return (
        <>
            {qualities.map((qualityId) => (
                <Quality key={qualityId} id={qualityId} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};
export default QualitiesList;
