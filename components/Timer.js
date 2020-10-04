import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

const getDuration = (startTime) => new moment (new moment ().diff(startTime)).format("m:ss:SS")
const startTime = new moment ();

export const Timer = ({ startTimer, handleParentTime }) => {

    const [time, setTime] = useState(getDuration(new moment ()))

    useEffect(() => {
        let timer;
        if (startTimer) {
            const startTime = new moment ();
            timer = setInterval(() => setTime(getDuration(startTime)), 10);
        } else {
            handleParentTime?.(time)
            timer && clearTimeout(timer);
        }
        return () => clearTimeout(timer);
    }, [startTimer])


    return (
        <View style={styles.container}>
            <Text>
                {
                    `TIME: ${time}`
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