import { combineReducers } from "redux";
import ref from "./ref";

const rehydrated = (state = false, action) => {
    switch (action.type) {
        case "persist/REHYDRATE":
            return true;
        default:
            return state;
    }
};

export default {
    rehydrated,
    ref,
};
