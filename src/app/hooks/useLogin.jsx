import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStoradge.service";

const httpLogin = axios.create();
const LoginContext = React.createContext();

export const useLogin = () => {
    return useContext(LoginContext);
};

const LoginProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    async function signIn({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpLogin.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            console.log(data);
            getUser(data.localId);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = {
                        email: "Пользователь с таким Email не сушествует"
                    };
                    throw errorObject;
                }
                if (message === "INVALID_PASSWORD") {
                    const errorObject = {
                        password: "Пароль введен не верно"
                    };
                    throw errorObject;
                }
            }
        }
    }
    async function getUser(id) {
        try {
            const { content } = userService.getId(id);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <LoginContext.Provider value={{ signIn, user }}>
            {children}
        </LoginContext.Provider>
    );
};

LoginProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default LoginProvider;
