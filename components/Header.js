import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, Button, Pressable, Linking } from "react-native";

export const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Neural App</Text>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => Linking.openURL("https://github.com/CreatoR750/Neural-App")}>
                    <Text style={styles.text}>GITHUB</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        alignItems: "center",
        flexDirection: "row",
        height: 200,
        justifyContent: "center",
        marginBottom: "2%",
    },

    headerTitle: {
        textAlign: "center",
        fontSize: 30,
        flex: 2,
    },

    buttonContainer: {
        flex: 2,
        width: 30,
    },

    text: {
        color: "#3A79FF",
        fontSize: 25,
    },

    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 0,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#D2E1FF",
    },
});
