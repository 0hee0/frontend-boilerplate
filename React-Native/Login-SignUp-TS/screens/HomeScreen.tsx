import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import type { Navigation } from '../types';

export default function HomeScreen({ navigation }: Navigation) {
    return (
        <SafeAreaView style={styles.container}>
            Home
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})
