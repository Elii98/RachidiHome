import React from "react"
import { server } from "../settings"
import { Image, StyleSheet } from "react-native"

const BannerImgs = (props) => {
	const { image = "" } = props
	return <Image style={styles.image} source={{ uri: `${server}/imgs/${image}` }} />
}

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: 300,
		zIndex: 0,
		marginBottom: 30
	}
})

export default BannerImgs
