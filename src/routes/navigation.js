import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import MainStackNavigator from './main-stack.navigator'

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Loading'}
                screenOptions={{
                    headerShown: false
                }}
            >
                {MainStackNavigator({ Stack: Stack })}
            </Stack.Navigator>
        </NavigationContainer>
    );
}



