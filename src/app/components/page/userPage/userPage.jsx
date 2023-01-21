import React from "react";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingCard from "../../ui/meetingCard";
import PropTypes from "prop-types";
import Comments from "../../ui/comments";
import { useUsers } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
    const { getUserById } = useUsers();
    const user = getUserById(userId);

    if (!user) {
        return "Loading....";
    }

    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard user={user} />
                    <QualitiesCard data={user.qualities} />
                    <MeetingCard value={user.rate} />
                </div>
                <div className="col-md-8">
                    <CommentsProvider>
                        <Comments />
                    </CommentsProvider>
                </div>
            </div>
        </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
