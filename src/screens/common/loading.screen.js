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
import axios from 'axios';
import { landmarks } from '../../util/landmarks'
import { useSelector, useDispatch } from 'react-redux'

export default function LoadingPage({ navigation }) {

    const dispatch = useDispatch();

    useEffect(() => {
        LoadData();
    }, [])

    const LoadData = async () => {
        try {
            const results = await axios.get('https://raw.githubusercontent.com/amoda-sasmitha/landmark-dataset/main/data.json');
            if (results.data) {
                dispatch({
                    type: 'LANDMARKS',
                    payload: results.data
                })
            } else {
                dispatch({
                    type: 'LANDMARKS',
                    payload: landmarks
                })
            }
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Start" }]
                })
            );
        } catch (err) {
            console.log(err)
            dispatch({
                type: 'LANDMARKS',
                payload: landmarks
            });
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Start" }]
                })
            );
        }


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
