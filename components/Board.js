import React from "react";
import { StyleSheet, View } from 'react-native';
import { Box } from "./Box";


export const Board = ({ flashBoxes, flash, handlePress }) => {
    return (
        <View style={styles.board}>
            {
                new Array(16).fill(null).map((_, i) => {
                    const shouldFlash = flashBoxes && flashBoxes.has(i) && flash;
                    return (
                        <Box 
                            key={i} 
                            handlePress={() => handlePress(i)}
                            shouldFlash={shouldFlash}
                        /> 
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      },
    board: {
        aspectRatio: 1,
        width: "95%",
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
  });