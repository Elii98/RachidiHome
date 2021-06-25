import React from "react"
import { server } from "../settings"
import { Image, StyleSheet } from "react-native"

const BannerImgs = (props) => {
	const { image = "", style = {} } = props
	return (
		<Image
			style={{ ...styles.image, ...style }}
			source={{ uri: `${server}/media/${image}` }}
		/>
	)
}

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: 300,
		zIndex: 0
	}
})

export default BannerImgs
