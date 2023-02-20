const InitState = {
    ref: [],
    landmarks: []
};

const initialState = { ...InitState };

export default function (state = initialState, action) {
    switch (action.type) {
        case "ADD":
            return { ...state, ref: [...state.ref, action.payload] };
        case "LANDMARKS":
            return { ...state, landmarks: action.payload };
        case "RESET":
            return { ...state, ref: [] };
        default:
            return state;
    }
}
