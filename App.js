import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import moment from 'moment';
import { Timer } from './components/Timer';
import { Score } from './components/Score';
import { GameOver, FTUE } from './components/Popups';
import { Board } from './components/Board';
import { Difficulty } from './components/Difficulty';

let numTurns = 0;
let flashLen = 1000;
let reflexLen = 2000;
let timeStarted;
let timeExpired = false;
let flashTimer;
let reflexTimer;
let gameTimer;
let highScore = 0;

const getFlashLength = () => {
	numTurns++
	const shouldDecreaseFlashLen = numTurns % 5 === 0;
	if (shouldDecreaseFlashLen) {
		flashLen *= .9
	}
	return Math.floor(flashLen);
}

const getReflexLength = () => {
	const shouldDecreaseReflexLen = numTurns % 5 === 0;
	if (shouldDecreaseReflexLen) {
		reflexLen *= .75
	}
	return Math.floor(reflexLen);
}

const getRandomSquare = () => Math.floor(Math.random() * 16);

const setHighScore = (score) => {
	if (score > highScore) {
		highScore = score;
	}
}

export default function App() {

	// init state vars
	const [score, setScore] = useState(1);
	const [flashBoxes, setFlashBoxes] = useState(null);
	const [flash, setFlash] = useState(true);
	const [startTimer, setStartTimer] = useState(false);
	const [time, setTime] = useState(null);
	const [showFtue, setShowFtue] = useState(false);
	const [diff, setDiff] = useState('easy')

	useEffect(() => {
		setShowFtue(true);
	}, [])

	useEffect(() => {

		if (flash) return;
		if (score <= 0) return;

		// start countdown
		timeExpired = false

		// start reflex timer
		reflexTimer = setTimeout(() => {

			timeExpired = true;

			// decrement score
			setScore(score - 1)
			runTurn()
			
		}, getReflexLength()) 

	}, [flash])

	useEffect(() => {
		setHighScore(score)
		if (score <= 0) {
			setStartTimer(false)
			clearTimeout(flashTimer)
			clearTimeout(reflexTimer)
			clearTimeout(gameTimer)
		}
	}, [score])


	const startGame = () => {
		setStartTimer(true);
		runTurn()
	}

	const runTurn = () => {

		// show flash
		switch (diff) {
			case 'hard':
				setFlashBoxes(new Set ([ getRandomSquare(), getRandomSquare(), getRandomSquare()]));
				break;
			case 'medium':
				setFlashBoxes(new Set ([getRandomSquare(), getRandomSquare()]));
				break;
			case 'easy':
			default:
				setFlashBoxes(new Set ([getRandomSquare()]));
		}
		
		setFlash(true)

		// start timer to clear flash
		flashTimer = setTimeout(() => {
			setFlash(false)
		}, getFlashLength())
	}

	const handlePress = (i) => {

		if (flashBoxes.has(i) && !timeExpired) {
			// correct hit
			const flashBoxCopy = new Set (flashBoxes);
			flashBoxCopy.delete(i)
			setFlashBoxes(flashBoxCopy);
			if (flashBoxCopy.size === 0) {
				clearTimeout(reflexTimer);
				clearTimeout(flashTimer);
				setScore(score + 1)
				runTurn()
			}
		} else if ( (!flashBoxes.has(i) || timeExpired) && startTimer ) {
			// incorrect hit
			clearTimeout(reflexTimer)
			clearTimeout(flashTimer);
			setScore(score - 1)
			runTurn()
		}
	}

	const handleModalDismiss = () => {
		// reset all state + global variables
		setScore(1)
		setFlashBoxes(null)
		setFlash(true)
		setStartTimer(false)
		setTime(null)
		numTurns = 0;
		flashLen = 1000;
		reflexLen = 2000;
		timeStarted = null;
		timeExpired = false;
		flashTimer = null;
		reflexTimer = null;
	}

	const handleParentTime = (time) => {
		setTime(time);
	}

	const handleFtueDismiss = () => {
		setShowFtue(false)
	}

	const handleParentPress = (diff) => {
		setDiff(diff);
	}

	return (
		<View style={styles.container}>
			<FTUE visible={showFtue} handleFtueDismiss={handleFtueDismiss}/>
			<GameOver visible={score <= 0} timeElapsed={time} highScore={highScore} handleModalDismiss={handleModalDismiss}/>
			<Text style={styles.title}>
				REFLEX
			</Text>
			<Board flashBoxes={flashBoxes} flash={flash} handlePress={handlePress}/>
			<View style={styles.widgets}>
				<Score score={score}/>
				<Timer startTimer={startTimer} handleParentTime={handleParentTime}/>
			</View>
			<Difficulty handleParentPress={handleParentPress}/>
			<TouchableOpacity onPress={startGame} style={styles.startButton}>
				<Text>
					START
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  startButton: {
	aspectRatio: 5,
	width: "70%",
	backgroundColor: "green",
	borderRadius: 10,
	alignItems: 'center',
	justifyContent: 'center'
  },
  widgets: {
	  width: "100%",
	  flexDirection: 'row',
	  justifyContent: 'space-evenly'
  },
  title: {
	fontSize: 40,
	fontWeight: '800'
  }
});
