import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions } from 'react-native';


export const GameOver = ({ visible = false, timeElapsed, handleModalDismiss, highScore }) => {
    return (
        <Modal
        transparent
        presentationStyle="overFullScreen"
        animationType="slide"
        visible={visible}
        >
        <View style={styles.modalContainer}>
            <View style={styles.modal}>
                <Text>
                    Game Over!
                </Text>
                <Text>
                    {
                        `Your high score was ${highScore}`
                    }
                </Text>
                <Text>
                    {
                        `Your time was ${timeElapsed}`
                    }
                </Text>
                <TouchableOpacity onPress={handleModalDismiss} style={styles.button}>
                    <Text>
                        RESET GAME
                    </Text>
                </TouchableOpacity>
            </View>
    
        </View>
        </Modal>
    )
}

export const FTUE = ({ visible, handleFtueDismiss }) => {
    return (
        <Modal
        transparent
        presentationStyle="overFullScreen"
        animationType="slide"
        visible={visible}
        >
        <View style={styles.modalContainer}>
            <View style={styles.modal}>
                <Text style={styles.title}>
                    Welcome to REFLEX!
                </Text>
                <Text style={styles.body}>
                    The objective of this game is to test your reflex speed. 
                    Once you start the game, you must press the squares that flash a different color.
                    The speed at which squares flash, as well as the reaction time alloted will get more difficult with time.
                    Good Luck!
                </Text>
                <TouchableOpacity onPress={handleFtueDismiss} style={styles.button}>
                    <Text>
                        OK
                    </Text>
                </TouchableOpacity>
            </View>
    
        </View>
        </Modal>
    )
}

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        aspectRatio: 1,
        width: "80%",
        borderRadius: 10,
        borderWidth: 3,
        backgroundColor: 'white',
        padding: 10
    },
    button: {
        backgroundColor: 'green',
        aspectRatio: 5,
        width: "80%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    title: {
        fontSize: width * .05,
        fontWeight: '800',
        textAlign: 'center'
    },
    body: {
        fontSize: width * .04,
        textAlign: 'center'
    }
  });