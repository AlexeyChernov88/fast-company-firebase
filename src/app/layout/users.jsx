import React from "react";
import { useParams, Redirect } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UserEditPage from "../components/page/userEditPage";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";

const Users = () => {
    const params = useParams();
    const { currentUser } = useAuth();
    const { userId, edit } = params;
    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        userId === currentUser._id ? (
                            <UserEditPage userId={userId} />
                        ) : (
                            <Redirect to={`/users/${currentUser._id}/edit`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
