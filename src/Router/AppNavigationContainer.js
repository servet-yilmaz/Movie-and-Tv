import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Index from '../Screens/index';
import Details from "../Screens/Details";
import TvDetails from "../Screens/TvDetails";


const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="index" screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
            <Stack.Screen options={{ headerShown: false }} name="index" component={Index} />
            <Stack.Screen options={{ headerShown: true, headerTransparent: true, headerTintColor: '#fff', title: '' }} name="DetailScreen" component={Details} />
            <Stack.Screen options={{ headerShown: true, headerTransparent: true, headerTintColor: '#fff', title: '' }} name="TvDetailScreen" component={TvDetails} />
        </Stack.Navigator>
    )
}

const AppNavigationContainer = () => {
    return <HomeStack />;
}

export default AppNavigationContainer;