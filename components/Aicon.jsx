import React, { useRef } from "react"
import { useEffect } from "react"
import { Animated } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

const Aicon = (props) => {
	const { unmount, onPress, ...attr } = props

	const fadeAnim = useRef(new Animated.Value(0)).current
	const scaleAnim = useRef(new Animated.Value(0.5)).current

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 150,
			useNativeDriver: true
		}).start()

		Animated.timing(scaleAnim, {
			toValue: 1,
			duration: 100,
			useNativeDriver: true
		}).start()
	}, [fadeAnim, scaleAnim])

	const handlePress = () => {
		onPress && onPress()
		Animated.timing(scaleAnim, {
			toValue: 0.5,
			duration: 100,
			useNativeDriver: true
		}).start()

		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 100,
			useNativeDriver: true
		}).start(() => unmount && unmount())
	}

	return (
		<Animated.View
			style={{
				opacity: fadeAnim,
				transform: [{ scale: scaleAnim }]
			}}>
			<Ionicons onPress={handlePress} {...attr} />
		</Animated.View>
	)
}

export default Aicon
