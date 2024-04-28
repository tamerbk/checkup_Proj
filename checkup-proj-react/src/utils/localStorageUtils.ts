import {  Member } from "../components/types";

const USER_SESSION = "user_session"

const getLocalStorageUser = (): Member | null => {
    const parseUser = JSON.parse(localStorage.getItem(USER_SESSION) || "null") as Member | null;
    return parseUser;
};

const setLocalStorageUser = (user: Member): void => {
    localStorage.setItem(USER_SESSION, JSON.stringify(user));
};

const getToken = (): string | null => {
    const parsedUser = getLocalStorageUser();
    return parsedUser?.token || null;
};

export {
    getLocalStorageUser,
    setLocalStorageUser,
    getToken,
};
