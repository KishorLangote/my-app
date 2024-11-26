import { ADD_TO_CART, REMOVE_FROM_CART, CALCULATE_TOTAL } from "./actions"

const initialState = { cartItems: [], totalPrice: 0 }

const cartReducer = (state = initialState, action) => {
    switch(action.type){

        case ADD_TO_CART:
            const itemsInCart = state.cartItems.find((item) => item.id === action.payload.id) // check item is already in the cart

            if(itemsInCart) {
                // if item is exist then increase quantity..
                return {
                    ...state, 
                    cartItems: state.cartItems.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1} : item)
                }
            } else { 
                // if item not exist then add to the cart with quantity 1
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
                }
            }
            // in payload contains your actual items that you want to add.

        case REMOVE_FROM_CART: 
            return {...state, cartItems: state.cartItems.filter((item) => item.id !== action.payload.id)}

        case CALCULATE_TOTAL:
            const newTotal = state.cartItems.reduce((acc, item) =>  acc + item.price * item.quantity,
             0
            )
            console.log("Updated Total Price:", newTotal);
            return {
                ...state, totalPrice: newTotal
            }

        default: 
        return state;
    }
}

export default cartReducer


  