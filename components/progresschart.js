<ProgressChart
    data={{
        labels: diagramData.labels,
        data: data,
    }}
    width={Dimensions.get("window").width}
    height={220}
    strokeWidth={16}
    radius={32}
    chartConfig={{
        backgroundGradientFrom: "#EEE",
        backgroundGradientTo: "#EEE",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(58,121,255, ${opacity})`,
        labelColor: () => `#3A79FF`,
        style: {
            borderRadius: 16,
        },
    }}
    hideLegend={false}
/>;
