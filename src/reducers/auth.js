
const InitState = {
    isAuthenticated: false,
    error: null,
    userDetails: null,
    activated: false
};

const initialState = { ...InitState };

export default function (state = initialState, action) {
    switch (action.type) {
        case "IS_AUTHENTICATED":
            return { ...state, isAuthenticated: action.payload };
        case "IS_ACTIVATED":
            return { ...state, activated: action.payload };
        case "USER_DETAILS":
            return { ...state, userDetails: action.payload };
        case "RESET":
            return { ...state, ...InitState };
        default:
            return state;
    }
}
