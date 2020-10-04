import React from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';


export const Box = ({ shouldFlash = false, handlePress }) => {

    const styleToUse = shouldFlash ? { ...styles.box, backgroundColor: "blue" } : styles.box;
    return (
        <TouchableOpacity style={styleToUse} onPress={handlePress} />
    )
}

const styles = StyleSheet.create({
    box: {
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        height: '24%',
        marginBottom: "1%",
        backgroundColor: "lightgray"
    },
});