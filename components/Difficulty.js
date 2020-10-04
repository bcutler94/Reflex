import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native';

const LEVELS = ['easy', "medium", "hard"];

export const Difficulty = ({ handleParentPress }) => {

    const [diff, setDiff] = useState('easy');

    const handlePress = (diff) => {
        setDiff(diff)
        handleParentPress(diff)
    }

    return (
        <View style={styles.container}>
            {
                LEVELS.map(level => {
                    const touchableStyleToUse = diff === level ? {...styles.button, borderColor: "green", backgroundColor: 'yellow'} : styles.button;
                    const textStyleToUse = diff === level ? {...styles.text, fontSize: width * .06, color: "green", fontWeight: "800"} : styles.text;
                    return (
                        <TouchableOpacity key={level} style={touchableStyleToUse} onPress={() => handlePress(level)}>
                            <Text style={textStyleToUse}>
                                {
                                    level.toUpperCase()
                                }
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-evenly'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 2.5,
        height: width * .1,
        borderRadius: 10,
        borderWidth: 2
    },
    text: {
        fontSize: width * .04
    }
});