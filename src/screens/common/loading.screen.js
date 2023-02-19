import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    TextInput,
    Image,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import ms from '../../util/main.styles'
import { fonts, colors, dimensions } from '../../util/types'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import TopNav from '../../components/topbar.nav'
import { Formik } from 'formik'
import { loginSchema } from '../../schemas/login.schema'
import { hasSuccess, ErrorMessage } from '../../util/validate'
import { CommonActions } from '@react-navigation/native';


export default function LoadingPage({ navigation }) {

    useEffect(() => {
        LoadData();
    }, [])

    const LoadData = async () => {
        setTimeout(function () {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Start" }]
                })
            );
        }, 1500);

    }
    return (
        <SafeAreaView style={{ backgroundColor: colors.White }}>
            <StatusBar barStyle={'light-content'} backgroundColor={colors.darkBlue} />
            <View style={[ms.mainPadding, { flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }]}>
                <View style={{ flex: 1, height: dimensions.heightOf(100) }}>
                    <Image source={require('../../../assets/images/logo.png')} style={ms.logoSImage} />
                    <Text style={[ms.mainButtion, {
                        color: colors.Gray2,
                        fontSize: 18,
                        marginTop: dimensions.heightOf(10),
                        textAlign: 'center',
                        fontWeight: '500',
                        fontFamily: fonts.semiBold
                    }]}>{`Developed by group 21\n(G21)`}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};
