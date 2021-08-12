// reducer.js Này có chức năng xử lí và đưa dữ liệu vào trong store

const init = {
    cars: ['BMV']
}

export default function reducer(state = init, action, args) {
    switch (action) {
        case 'ADD': 
            const [newCar] = args
            return {
                ...state,
                cars: [...state.cars,newCar]
            }
        default: 
            return state
    }
}