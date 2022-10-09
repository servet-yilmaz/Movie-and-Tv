import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Film = ({ item }) => {
    const navigation = useNavigation();
    return (<TouchableOpacity onPress={() => { navigation.navigate("DetailScreen", { item }) }}>
        <View style={style.image_container}>
            <Image style={style.image} source={{ uri: 'https://image.tmdb.org/t/p/w300/' + item.poster_path }} />
        </View>
        <Text style={style.text} >{item.title}</Text>
    </TouchableOpacity>)
}

const style = StyleSheet.create({
    image: {
        width: 130,
        height: 190,
        borderRadius: 20,
    },
    image_container: {
        marginRight: 10,
        marginLeft: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        height: 190,
        width: 130,
        elevation: 9,
        marginVertical: 5,
    },
    text: {
        width: 130,
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: '400',
        color: 'black',
        flexWrap: "wrap",
        flex: 1,
    }
});

export default Film;