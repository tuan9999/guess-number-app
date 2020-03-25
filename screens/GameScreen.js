import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const RndmNum = Math.floor(Math.random() * (max - min)) + min;
	if (RndmNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return RndmNum;
	}
};

const GameScreen = props => {
	const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
	const [rounds, setRounds] = useState(0);

	const currLow = useRef(1);
	const currHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(rounds);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = direction => {
		if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'higher' && currentGuess > props.userChoice)) {
			Alert.alert('dont lie', 'invalid hint', [{text: 'Okay', style: 'cancel'}]);
			return ;
		}
		if (direction === 'lower') {
			currHigh.current = currentGuess;
		} else {
			currLow.current = currentGuess;
		}
		const nextNumber = generateRandomBetween(currLow.current, currHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		setRounds(curRounds => curRounds + 1);
	};

	return (
		<View style={styles.screen}>
			<Text>Opponents Guess</Text>
			<NumberContainer>{ currentGuess }</NumberContainer>
			<Card style={styles.buttonContainer}>
				<Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
				<Button title="HIGHER" onPress={nextGuessHandler.bind(this, 'higher')} />
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 300,
		maxWidth: '80%',
	}
});

export default GameScreen;