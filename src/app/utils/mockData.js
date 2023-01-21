import qualities from "../mockData/qualities.json";
import professions from "../mockData/professions.json";
import users from "../mockData/users.json";
import { useEffect, useState } from "react";
import httpServece from "../services/http.service";

const useMockData = () => {
    const statusConsts = {
        idle: "Not Started",
        pending: "In Process",
        successed: "Ready",
        error: "Error occured"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summuryCount = professions.length + qualities.length + users.length;
    const incrementCount = () => {
        setCount((prevState) => prevState + 1);
    };

    const updateProgress = () => {
        const newProgress = Math.floor((count / summuryCount) * 100);
        if ((count !== 0) & (status === statusConsts.idle)) {
            setStatus(statusConsts.pending);
        }
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (progress === 100) {
            setStatus(statusConsts.successed);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize() {
        try {
            for (const prof of professions) {
                await httpServece.put("profession/" + prof._id, prof);
                incrementCount();
            }
            for (const user of users) {
                await httpServece.put("user/" + user._id, user);
                incrementCount();
            }
            for (const qual of qualities) {
                await httpServece.put("quality/" + qual._id, qual);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConsts.error);
        }
    }
    return { error, initialize, progress, status };
};

export default useMockData;
