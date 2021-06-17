import AsyncStorage from "@react-native-async-storage/async-storage"

const reducer = (state = {}, action = {}) => {
	let ret = {}
	switch (action.type) {
		case "initialize":
			ret = action.payload
			break
		case "login":
			ret = { ...state, login: action.payload }
			break
		case "count":
			ret = { ...state, count: action.payload }
			break
		case "bookmark":
			ret = { ...state, bookmark: action.payload }
			break
		case "addCartItem":
			ret = { ...state, cartItems: { ...state.cartItems, ...action.payload } }
			break
		case "clearCart":
			ret = { ...state, cartItems: {} }
			break
		case "changeCartCount":
			ret = { ...state, cartItems: { ...state.cartItems, ...action.payload } }
			break
		case "removeCartItem":
			ret = { ...state, cartItems: action.payload }
			break
		case "searchFilter":
			ret = { ...state, searchFilter: action.payload }
			break
		case "setAddresses":
			ret = { ...state, addresses: action.payload }
			break
	}

	if (!action.type.includes("@@INIT") && !action.type.includes("@@redux")) {
		AsyncStorage.setItem("offlineStore", JSON.stringify(ret))
	}

	return ret
}
export default reducer
