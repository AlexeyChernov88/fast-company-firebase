import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table, { TableHeader, TableBody } from "../common/table";
import Profession from "./profession";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    ...rest
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        profession: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        >
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} />
        </Table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.object,
    onToggleBookMark: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
