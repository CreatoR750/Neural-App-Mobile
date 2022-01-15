import React from "react";
import { StyleSheet, Text, View, Image, Button, Pressable, Linking } from "react-native";

export const Result = () => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>Result</Text>
                </Pressable>
            </View>
            <View>
                <Text style={styles.resultText}>Diagram</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require("./bmw.jpg")} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        textAlign: "center",
        flexDirection: "column",
        height: 370,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonContainer: {
        flex: 1,
        width: 380,
        marginRight: 15,
        marginLeft: 15,
    },

    text: {
        color: "#3A79FF",
        fontSize: 25,
    },

    resultText: {
        color: "black",
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
    imageContainer: {
        flex: 3,
    },

    image: {
        width: 300,
        height: 200,
    },
});
