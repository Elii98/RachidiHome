import redStore from "./store"

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

export const initialize = (data) => {
	return {
		type: "initialize",
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
	let prevArr = {}
	if (redStore.getState().cartItems) {
		prevArr = redStore.getState().cartItems
	}
	let dataArr = { ...prevArr, ...data }
	return {
		type: "addCartItem",
		payload: dataArr
	}
}
