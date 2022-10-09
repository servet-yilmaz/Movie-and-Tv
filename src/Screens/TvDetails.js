//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image, ScrollView, LogBox } from 'react-native';
import { useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
import Cast from '../Components/Cast';

const TvDetails = () => {
    const route = useRoute();
    const item = route.params.item;
    const [cast, setCast] = useState('');
    const [loadingData, setLoadingData] = useState(true);
    const renderItem = ({ item }) => {
        return <Cast item={item} />
    };

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        if (loadingData) {
            setLoadingData(false);
            Axios.get('https://api.themoviedb.org/3/tv/' + item.id + '/credits?api_key=42db031dffb4737611798f6d1f0b84bd&language=en-US')
                .then(({ data }) => {
                    setCast(data.cast)
                });
        }
    });
    return (
        <View style={styles.body}>
            <View style={styles.image_container}>
                <Image style={[styles.image]} source={{ uri: 'https://image.tmdb.org/t/p/original/' + item.backdrop_path }} />
                <LinearGradient colors={['rgba(0, 0, 0, 0.58)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.58)']} style={styles.image_shadow} />
            </View>
            <View style={styles.scroll_continer}>
                <ScrollView overScrollMode='never' style={styles.scroll}>
                    <View style={styles.desc_container}>
                        <View style={styles.play}>
                            <Icon style={styles.play_icon} name="play-outline" size={40} />
                        </View>
                        <View style={styles.text_container}>
                            <Text style={styles.title}>{item.name} </Text>
                            <Text style={styles.desc}>{item.overview ? item.overview : 'Açıklama bulunamadı!'}</Text>
                            <Text style={styles.title}>CAST</Text>
                            <FlatList
                                scrollEnabled={false}
                                numColumns={2}
                                data={cast}
                                renderItem={renderItem}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({

    body: {
        backgroundColor: 'white'
    },

    image_container: {
        position: 'absolute',

    },
    image: {
        width: 500,
        height: 400,
    },

    image_shadow: {
        width: 500,
        height: 450,
        position: 'absolute',
        top: 0
    },

    scroll_continer: {
        overflow: 'hidden',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'relative',
        top: 60,
        width: '100%'

    },
    scroll: {
        position: 'relative',
        top: 0,
        height: '100%',

    },

    play: {
        width: 60,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 30,
        top: 30,
        zIndex: 1,
        elevation: 9,
        alignItems: 'center',
        justifyContent: 'center'
    },

    play_icon: {
        color: 'black',
        width: 35,
        height: 45,
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
        width: '100%'

    },

    average: {
        justifyContent: 'center',
        border: 'solid',
        borderWidth: 3,
        borderColor: '#4a4949',
        width: 45,
        height: 45,
        padding: 5,
        borderRadius: 40,
        alignItems: 'center',
        position: 'absolute',
        right: 30
    },

    average_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },

    desc_container: {
        paddingTop: 200,
        paddingBottom: 70,
        alignItems: 'center',
    },

    desc: {
        color: 'black',
        fontSize: 17,
        lineHeight: 30,
        marginBottom: 20

    },
    text_container: {
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingTop: 30,
        width: '100%',
        minHeight: 400,
        alignItems: 'center'



    }
})

export default TvDetails;
