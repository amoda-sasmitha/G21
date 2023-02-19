import React from "react";
import { CardStyleInterpolators } from '@react-navigation/stack';

import LoadingPage from "../screens/common/loading.screen";
import BMIPage from "../screens/bmi.screen";
import StartPage from "../screens/start.screen";
import RefPage from "../screens/ref.screen";
import LandmarkPage from "../screens/landmarks.screen";
import DashboardPage from "../screens/dashboard.screen";
import RefPointPage from "../screens/refpoint.screen";
import RecordedPathPage from "../screens/recorded.paths.screen";


export default MainStackNavigator = ({ Stack }) => {
    return (
        <Stack.Group>
            <Stack.Screen name="Loading" component={LoadingPage}
                options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
            />
            <Stack.Screen name="BMI" component={BMIPage}
                options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
            />
            <Stack.Screen name="Start" component={StartPage}
                options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
            />
            <Stack.Screen name="Ref" component={RefPage}
                options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
            />
            <Stack.Screen name="Landmark" component={LandmarkPage}
                options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
            />
            <Stack.Screen name="Dashboard" component={DashboardPage}
                options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
            />
            <Stack.Screen name="RefPoint" component={RefPointPage}
                options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
            />
            <Stack.Screen name="Recorded" component={RecordedPathPage}
                options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
            />
        </Stack.Group>
    );
}




