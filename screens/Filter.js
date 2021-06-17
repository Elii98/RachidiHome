import React, { useCallback, useState } from "react"
import { StyleSheet, View, Text } from "react-native"
import { Defaults } from "../Globals/defaults"
import RangeSlider from "rn-range-slider"
import Thumb from "../components/Thumb"
import Rail from "../components/Rail"
import RailSelected from "../components/RailSelected"
import Label from "../components/Label"
import Notch from "../components/Notch"
import MyButton from "../components/MyButton"
import redStore from "../redux/store"
import { searchFilter } from "../redux/actions"

const Filter = React.forwardRef((props, ref) => {
	const MIN = 0
	const MAX = 40000000
	const [low, setLow] = useState(MIN)
	const [high, setHigh] = useState(MAX)
	const renderThumb = useCallback(() => <Thumb />, [])
	const renderRail = useCallback(() => <Rail />, [])
	const renderRailSelected = useCallback(() => <RailSelected />, [])
	const renderLabel = useCallback((value) => <Label text={Number(value).toLocaleString()} />, [])
	const renderNotch = useCallback(() => <Notch />, [])
	const handleValueChange = useCallback((low, high) => {
		setLow(low)
		setHigh(high)
	}, [])

	const onFilter = () => {
		redStore.dispatch(searchFilter({ filter: [low, high] }))
		ref.current.close()
	}

	return (
		<View style={styles.container}>
			<View style={styles.topHolder}>
				<Text style={[Defaults.title, { textAlign: "center", marginBottom: 10 }]}>
					Filter
				</Text>
				<RangeSlider
					style={styles.slider}
					min={MIN}
					max={MAX}
					step={100000}
					floatingLabel
					renderThumb={renderThumb}
					renderRail={renderRail}
					renderRailSelected={renderRailSelected}
					renderLabel={renderLabel}
					renderNotch={renderNotch}
					onValueChanged={handleValueChange}
				/>
				<View style={styles.row}>
					<Text style={styles.priceText}>From: {Number(low).toLocaleString()} LBP</Text>
					<Text style={styles.priceText}>To: {Number(high).toLocaleString()}LBP</Text>
				</View>
			</View>
			<View style={styles.btnHolder}>
				<MyButton
					onPress={() => {
						onFilter()
					}}
					text="Filter"
					color={Defaults.secondary}
				/>
			</View>
		</View>
	)
})

const styles = StyleSheet.create({
	item: {
		padding: 10,
		borderBottomWidth: 1,
		borderColor: "#d0d0d0",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 5
	},
	topHolder: {
		marginTop: 50
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 20,
		paddingHorizontal: 5
	},
	btnHolder: {
		marginTop: 50
	},
	priceText: {
		fontWeight: "bold"
	},
	text: {
		fontSize: 20
	},
	container: {
		padding: 20
	}
})

export default Filter
