import React, { useEffect, useRef } from "react"
import { Animated } from "react-native"

const FadeIn = (props) => {
	const { children, style, ...attr } = props
	const fadeAnim = useRef(new Animated.Value(0)).current

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true
		}).start()
	}, [fadeAnim])

	return (
		<Animated.View style={{ ...style, opacity: fadeAnim }} {...attr}>
			{children}
		</Animated.View>
	)
}

export default FadeIn
