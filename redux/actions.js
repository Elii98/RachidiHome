import redStore from "./store"

export const initialize = (data) => {
	// default
	if (!data.cartItems) data.cartItems = {}
	if (!data.searchFilter) data.searchFilter = { sort: "alphabetical", filter: [0, 40000000] }
	if (!data.login) data.login = {}

	return {
		type: "initialize",
		payload: data
	}
}

export const login = (data) => {
	return {
		type: "login",
		payload: { type: "login", ...data }
	}
}

export const count = (data) => {
	return {
		type: "count",
		payload: data
	}
}

export const searchFilter = (data) => {
	return {
		type: "searchFilter",
		payload: data
	}
}

export const bookmark = (data) => {
	let prevArr = redStore.getState().bookmark || []
	if (data.flag) {
		prevArr = [...prevArr, data.itemId]
	} else {
		prevArr.splice(prevArr.indexOf(data.itemId), 1)
	}
	return {
		type: "bookmark",
		payload: prevArr
	}
}

export const addCartItem = (data) => {
	let payload = {}
	payload[data.itemid] = data
	return {
		type: "addCartItem",
		payload
	}
}

export const clearCart = () => {
	return {
		type: "clearCart"
	}
}

export const changeCartCount = (id, count) => {
	const item = redStore.getState().cartItems[id]
	const payload = {}
	item.counter = count
	payload[id] = item
	return {
		type: "changeCartCount",
		payload
	}
}

export const removeCartItem = (id) => {
	const items = redStore.getState().cartItems
	delete items[id]
	return {
		type: "removeCartItem",
		payload: items
	}
}

export const setAddresses = (data) => {
	return {
		type: "setAddresses",
		payload: data
	}
}
