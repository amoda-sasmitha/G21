
const InitState = {
    ref: []
};

const initialState = { ...InitState };

export default function (state = initialState, action) {
    switch (action.type) {
        case "ADD":
            console.log({ ...state, ref: [...state.ref, action.payload] });
            return { ...state, ref: [...state.ref, action.payload] };
        case "RESET":
            return { ...state, ...InitState };
        default:
            return state;
    }
}
