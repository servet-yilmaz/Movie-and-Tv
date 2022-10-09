import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, LogBox, ActivityIndicator } from 'react-native';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Film from '../Components/Films';
import { TextInput } from 'react-native-gesture-handler';
import Tv from '../Components/Tv';

const Index = () => {
    const [data, setData] = useState('');
    const [tvData, setTvData] = useState('');
    const [loading, setLoading] = useState(true);
    const [typing, setTyping] = useState(false);
    const [search, setSearch] = useState('');
    const [searchTimer, setSearchTimer] = useState(null);

    const getItems = (text) => {
        if (searchTimer) {
            clearTimeout(searchTimer);
        }
        setSearchTimer(setTimeout(() => {
            if (!text.trim()) {
                setTimeout(() => {
                    Axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=42db031dffb4737611798f6d1f0b84bd&language=tr-TR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
                        .then(({ data }) => {
                            setTyping(false);
                            setData(data.results)
                        });
                    Axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=42db031dffb4737611798f6d1f0b84bd&language=tr-TR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
                        .then(({ data }) => {
                            setTvData(data.results)
                        });
                }, 1000);

            } else {
                Axios.get('https://api.themoviedb.org/3/search/movie?api_key=42db031dffb4737611798f6d1f0b84bd&language=tr&certification_country=TR&sort_by=popularity.asc&query=' + text)
                    .then(({ data }) => {
                        setTyping(false);
                        setData(data.results);

                    });
                Axios.get('https://api.themoviedb.org/3/search/tv?api_key=42db031dffb4737611798f6d1f0b84bd&language=tr&certification_country=TR&sort_by=popularity.asc&query=' + text)
                    .then(({ data }) => {
                        setTvData(data.results)
                    });
            }

        }, 500),
        );

    }


    useEffect(() => {
        LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
        if (loading) {
            setLoading(false);
            Axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=42db031dffb4737611798f6d1f0b84bd&language=tr-TR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
                .then(({ data }) => {
                    setData(data.results)
                });
            Axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=42db031dffb4737611798f6d1f0b84bd&language=tr-TR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
                .then(({ data }) => {
                    setTvData(data.results)
                });
        }
    });

    const renderItem = ({ item }) => {
        return <Film item={item}></Film>
    };

    const tvrenderItem = ({ item }) => {
        return <Tv item={item}></Tv>
    };

    return (
        <ScrollView>
            <View style={style.header}>

                <TextInput value={search} onChangeText={(text) => {
                    setSearch(text); setTyping(true); getItems(text);
                }} placeholder='Search movie or tv show' style={style.header_search} />

                <Icon style={{ padding: 10, position: 'absolute', right: 10, top: 40 }} onPress={() => getItems()} name='search' size={30} color='black' />
            </View>
            <View style={style.body}>
                <Text style={style.body_title}>FILMS</Text>
                {
                    typing ? <ActivityIndicator size="large" /> : <FlatList
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={data}
                        renderItem={renderItem}
                    />
                }
                {
                    (tvData.length == 0) ? <Text style={style.no_result}>{data.length == 0 ? 'Movie not found' : ''}</Text> : ''
                }
                <Text style={style.body_title}>TV SHOWS</Text>
                {
                    typing ? <ActivityIndicator size="large" /> : <FlatList
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={tvData}
                        renderItem={tvrenderItem}
                    />
                }
                {
                    (tvData.length == 0) ? <Text style={style.no_result}>{tvData.length == 0 ? 'Tv show not found' : ''}</Text> : ''
                }
            </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 40,
        alignItems: 'center'
    },

    no_result: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        paddingVertical: 20
    },

    header_search: {
        fontSize: 20,
        color: 'black',
        fontWeight: '400',
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '85%'
    },

    body: {
        paddingHorizontal: 15,
    },
    body_title: {
        fontSize: 15,
        fontWeight: '500',
        color: 'black',
        marginBottom: 10
    }
});



export default Index;
