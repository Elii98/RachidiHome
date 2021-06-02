import AsyncStorage from "@react-native-async-storage/async-storage"

const reducer = (state = {}, action = {}) => {
	let ret = {}
	switch (action.type) {
		case "login":
			ret = { ...state, login: action.payload }
			break
		case "count":
			ret = { ...state, count: action.payload }
			break
		case "bookmark":
			ret = { ...state, bookmark: action.payload }
			break
		case "initialize":
			ret = action.payload
			break
		case "addCartItem":
			ret = { ...state, cartItems: action.payload }
			break
		case "searchFilter":
			ret = { ...state, searchFilter: action.payload }
			break
	}

	if (!action.type.includes("@@redux")) {
		AsyncStorage.setItem("offlineStore", JSON.stringify(ret))
	}

	return ret
}
export default reducer
