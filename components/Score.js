import React from "react";
import { StyleSheet, Text, View} from 'react-native';


export const Score = ({ score = null }) => {

    return (
        <View style={styles.container}>
            <Text>
                {
                    `SCORE: ${score}`
                }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      aspectRatio: 3,
      width: '30%'
    },
  });