import React from "react";
import { useState, useEffect } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import { Dimensions } from "react-native";
import axios from "axios";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Pressable,
    Linking,
} from "react-native";

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from "react-native-chart-kit";

export const Body = () => {
    const [image, setImage] = useState(null);
    const [sendImage, setSendImage] = useState("");
    const [result, setResult] = useState("");
    const [classes, setClasses] = useState([]);
    const [data, setData] = useState(null);
    const [diagram, setDiagram] = useState("");
    const [diagramData, setDiagramData] = useState({});
    const [accuracy, setAccuracy] = useState();
    const [showAccuracy, setShowAccuracy] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {});

    const choosePhoto = () => {
        const options = {
            storageOptions: {
                path: "images",
                mediaType: "photo",
            },
            includeBase64: true,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
                console.log(
                    "User tapped custom button: ",
                    response.customButton
                );
            } else {
                const source = { uri: response.assets[0].uri };
                setImage(source);
                setSendImage(response.assets[0]);
            }
        });
    };

    const getMaxOfArray = (numArray) => {
        return Math.round(Math.max.apply(null, numArray) * 100);
    };

    const getConfig = () => {
        axios
            .get(
                "https://neuralapplication.herokuapp.com/api/config/"
            )
            .then((config) => {
                setShowAccuracy(config.data[0].accuracy);
                setDiagram(config.data[0].diagram);
                console.log(showAccuracy);
                console.log(diagram);
            });
    };

    const handleSendImage = () => {
        let form_data = new FormData();
        form_data.append("image", sendImage.base64);
        form_data.append("title", sendImage.fileName);
        let url =
            "https://neuralapplication.herokuapp.com/api/image/";
        axios
            .post(url, form_data, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((res) => {
                let newRes =
                    res.data[0][0][0].toUpperCase() +
                    res.data[0][0].slice(1);
                console.log(newRes);
                setResult(newRes);
                setAccuracy(getMaxOfArray(res.data[0][2]));
                const diagramData = {
                    labels: res.data[0][1],
                    datasets: [
                        {
                            data: res.data[0][2].map(
                                (number) => number * 100
                            ),
                        },
                    ],
                };
                setDiagramData(diagramData);
                setData(res.data[0][2]);
                getConfig();
                console.log(data);
                console.log(diagramData);
            })
            .catch((err) => console.log(err));
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.button}
                    onPress={choosePhoto}
                >
                    <Text style={styles.text}>Upload File</Text>
                </Pressable>
            </View>
            {image ? (
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={image} />
                </View>
            ) : (
                <View></View>
            )}
            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.button}
                    onPress={handleSendImage}
                >
                    <Text style={styles.text}>Predict</Text>
                </Pressable>
                {result ? (
                    <View style={styles.buttonContainer}>
                        <Text style={styles.text}>
                            Prediction: {result}
                            {showAccuracy === "ON" ? (
                                <Text style={styles.text}>
                                    , Accuracy:{accuracy}%
                                </Text>
                            ) : null}
                        </Text>
                    </View>
                ) : (
                    <View></View>
                )}
            </View>
            {diagram === "Bar" ? (
                <View style={styles.imageContainer}>
                    <BarChart
                        data={diagramData}
                        width={Dimensions.get("window").width} // from react-native
                        height={270}
                        yAxisSuffix="%"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundGradientFrom: "#EEE",
                            backgroundGradientTo: "#EEE",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: () => `#3A79FF`,
                            labelColor: () => `#3A79FF`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 1,
                            borderRadius: 16,
                        }}
                    />
                </View>
            ) : diagram === "Pie" ? (
                <View>
                    <PieChart
                        data={[
                            {
                                name: diagramData.labels[0],
                                population: Math.round(data[0] * 100),
                                color: "rgba(131, 167, 234, 1)",
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15,
                            },
                            {
                                name: diagramData.labels[1],
                                population: Math.round(data[1] * 100),
                                color: "#F00",
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15,
                            },
                            {
                                name: diagramData.labels[2],
                                population: Math.round(data[2] * 100),
                                color: "red",
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15,
                            },
                            {
                                name: diagramData.labels[3],
                                population: Math.round(data[3] * 100),
                                color: "#ffffff",
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15,
                            },
                            {
                                name: diagramData.labels[4],
                                population: Math.round(data[4] * 100),
                                color: "rgb(0, 0, 255)",
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15,
                            },
                            {
                                name: diagramData.labels[5],
                                population: Math.round(data[5] * 100),
                                color: "rgb(100, 0, 255)",
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15,
                            },
                            {
                                name: diagramData.labels[6],
                                population: Math.round(data[6] * 100),
                                color: "rgb(50, 150, 100)",
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15,
                            },
                            {
                                name: diagramData.labels[7],
                                population: Math.round(data[7] * 100),
                                color: "rgb(10, 200, 50)",
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15,
                            },
                            {
                                name: diagramData.labels[8],
                                population: Math.round(data[8] * 100),
                                color: "rgb(10, 200, 150)",
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15,
                            },
                            {
                                name: diagramData.labels[9],
                                population: Math.round(data[9] * 100),
                                color: "rgb(100, 100, 50)",
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15,
                            },
                        ]}
                        width={Dimensions.get("window").width}
                        height={250}
                        chartConfig={{
                            backgroundGradientFrom: "#EEE",
                            backgroundGradientTo: "#EEE",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: () => `#3A79FF`,
                            labelColor: () => `#3A79FF`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[10, 20]}
                        absolute
                    />
                </View>
            ) : (
                <View></View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
    },

    buttonContainer: {
        width: 350,
        margin: 5,
    },

    text: {
        color: "#3A79FF",
        fontSize: 25,
        margin: 10,
        textAlign: "center",
    },

    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        backgroundColor: "#D2E1FF",
    },

    imageContainer: {
        margin: 2,
    },

    image: {
        width: 220,
        height: 220,
    },

    diagram: {
        width: 300,
        height: 300,
    },
});
