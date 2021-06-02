import React, { memo } from "react"
import { View, StyleSheet } from "react-native"
import { Defaults } from "../Globals/defaults"

const THUMB_RADIUS = 15

const Thumb = () => {
	return <View style={styles.root} />
}

const styles = StyleSheet.create({
	root: {
		width: THUMB_RADIUS * 2,
		height: THUMB_RADIUS * 2,
		borderRadius: THUMB_RADIUS,
		borderWidth: 1,
		borderColor: Defaults.secondary,
		backgroundColor: Defaults.white
	}
})

export default memo(Thumb)
