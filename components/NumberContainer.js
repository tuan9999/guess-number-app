import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Card from './Card'
import Colors from '../constants/Colors'

const NumberContainer = props => {
	return (
		<View style={styles.container}>
			<Text style={styles.number}>
				{props.children}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderColor: Colors.secondary,
		padding: 10,
		borderRadius: 10,
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	number: {
		color: Colors.secondary,
		fontSize: 22,
	}
});

export default NumberContainer;