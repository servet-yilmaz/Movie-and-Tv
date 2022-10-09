import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Cast = ({ item }) => {
    const navigation = useNavigation();
    return (<View style={{ backgroundColor: 'white', }} onPress={() => { navigation.navigate("DetailScreen", { item }) }}>
        <View style={style.image_container}>
            <Image style={style.image} source={{ uri: 'https://image.tmdb.org/t/p/w300/' + item.profile_path }} />
        </View>
        <Text style={style.text} >{item.name}</Text>
    </View>)
}

const style = StyleSheet.create({
    image: {
        width: 130,
        height: 190,
        borderRadius: 20,
    },
    image_container: {
        marginRight: 20,
        marginLeft: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        height: 190,
        width: 130,
        elevation: 9,
        marginVertical: 5,
    },
    text: {
        width: 170,
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: '400',
        color: 'black',
        flexWrap: "wrap",
        flex: 1,
        marginBottom: 20
    }
});

export default Cast;