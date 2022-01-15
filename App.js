/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Body} from './components/Body';
import {Header} from './components/Header';
import {Result} from './components/Result';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
    return (
        <View style={styles.container}>
            <Header></Header>
            <Body></Body>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '90%',
        marginTop: '3%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
});

export default App;
