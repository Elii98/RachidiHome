import React from "react"
import { TouchableRipple } from "react-native-paper"

const Ripple = (props) => {
	const { children, ...attr } = props
	return (
		<TouchableRipple rippleColor="rgba(255, 255, 255, .32)" {...attr}>
			{children}
		</TouchableRipple>
	)
}

export default Ripple
