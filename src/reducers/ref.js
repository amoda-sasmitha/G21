
const InitState = {
    ref: [{
        point: 2,
        accelerometer: { x: 10, y: 10, z: 10 },
        gyroscope: { x: 20, y: 20, z: 20 },
        steps: 10,
        position: { lat: 30, lng: 40 }
    }]
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
