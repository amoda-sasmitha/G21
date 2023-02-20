import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Radi
} from 'react-native';
import ms from '../util/main.styles'
import { fonts, colors, dimensions } from '../util/types'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import SelectDropdown from 'react-native-select-dropdown'
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux'

export default function RefPoint({ navigation }) {
    const route = useRoute();
    const point = route?.params?.point ?? null;
    const refs = useSelector((state) => state.ref.ref);
    const ref_data = refs.reverse().find(ref => ref.point === (point + 1));
    console.log(ref_data);
    if (!ref_data) {
        return (
            <SafeAreaView style={{ backgroundColor: colors.White }}>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: colors.White }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={colors.White} />
            <View>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', paddingTop: 12, alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                                <Image source={require('../../assets/images/back.png')} style={ms.back} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ ...ms.mainTitle, ...styles.main }}>
                            {`Reference point ${String(point + 1).padStart(2, '0')}`}
                        </Text>
                    </View>

                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 180 }}
                        style={{ paddingHorizontal: 15 }}>

                        <View style={[ms.mainButtionContainer, {
                            backgroundColor: colors.Gray,
                            marginHorizontal: dimensions.widthOf(5),
                            marginTop: dimensions.heightOf(5)
                        }]}>
                            <Text style={[ms.mainButtion, {
                                color: colors.White,
                                fontSize: 20,
                                fontWeight: 'bold',
                                fontFamily: fonts.semiBold
                            }]}>
                                X : {ref_data.position?.lat != null ? Number(ref_data.position.lat).toFixed(6) : '-'}
                            </Text>
                        </View>

                        <View style={[ms.mainButtionContainer, {
                            backgroundColor: colors.Gray,
                            marginHorizontal: dimensions.widthOf(5),
                            marginTop: 20
                        }]}>
                            <Text style={[ms.mainButtion, {
                                color: colors.White,
                                fontSize: 20,
                                fontWeight: 'bold',
                                fontFamily: fonts.semiBold
                            }]}>Y : {ref_data.position?.lng != null ? Number(ref_data.position.lng).toFixed(6) : '-'}
                            </Text>
                        </View>

                        <Text style={[ms.mainButtion, {
                            color: colors.mainBlue,
                            fontSize: 18,
                            marginTop: dimensions.heightOf(5),
                            textAlign: 'center',
                            fontWeight: '700',
                            fontFamily: fonts.semiBold
                        }]}>Accelerometer
                        </Text>

                        <View style={[ms.mainButtionContainer, {
                            backgroundColor: colors.Gray,
                            marginTop: 10,
                            marginHorizontal: dimensions.widthOf(5),
                        }]}>
                            <Text style={[ms.mainButtion, {
                                color: colors.White,
                                fontSize: 20,
                                fontWeight: 'bold',
                                fontFamily: fonts.semiBold
                            }]}>{
                                    `X : ${ref_data?.accelerometer.x != null ? Number(ref_data?.accelerometer.x).toFixed(6) : '0:00'}\nY : ${ref_data?.accelerometer.y != null ? Number(ref_data?.accelerometer.y).toFixed(6) : '0:00'}`
                                }</Text>
                        </View>

                        <Text style={[ms.mainButtion, {
                            color: colors.mainBlue,
                            fontSize: 18,
                            marginTop: dimensions.heightOf(5),
                            textAlign: 'center',
                            fontWeight: '700',
                            fontFamily: fonts.semiBold
                        }]}>Gyroscopes
                        </Text>

                        <View style={[ms.mainButtionContainer, {
                            backgroundColor: colors.Gray,
                            marginTop: 10,
                            marginHorizontal: dimensions.widthOf(5),
                        }]}>
                            <Text style={[ms.mainButtion, {
                                color: colors.White,
                                fontSize: 20,
                                fontWeight: 'bold',
                                fontFamily: fonts.semiBold
                            }]}>{
                                    `X : ${ref_data?.gyroscope.x != null ? Number(ref_data?.gyroscope.x).toFixed(6) : '0:00'}\nY : ${ref_data?.gyroscope.y != null ? Number(ref_data?.gyroscope.y).toFixed(6) : '0:00'}\nZ : ${ref_data?.gyroscope.z != null ? Number(ref_data?.gyroscope.z).toFixed(6) : '0:00'}`
                                }</Text>
                        </View>

                        <Text style={[ms.mainButtion, {
                            color: colors.mainBlue,
                            fontSize: 18,
                            marginTop: dimensions.heightOf(5),
                            textAlign: 'center',
                            fontWeight: '700',
                            fontFamily: fonts.semiBold
                        }]}>Steps Count
                        </Text>

                        <View style={[ms.mainButtionContainer, {
                            backgroundColor: colors.Gray,
                            marginTop: 10,
                            marginHorizontal: dimensions.widthOf(5),
                        }]}>
                            <Text style={[ms.mainButtion, {
                                color: colors.White,
                                fontSize: 20,
                                fontWeight: 'bold',
                                fontFamily: fonts.semiBold
                            }]}>{ref_data.steps}</Text>
                        </View>

                        {/* <Text style={[ms.mainButtion, {
                            color: colors.mainBlue,
                            fontSize: 18,
                            marginTop: dimensions.heightOf(5),
                            textAlign: 'center',
                            fontWeight: '700',
                            fontFamily: fonts.semiBold
                        }]}>Direction
                        </Text> */}

                        {/* <View style={[ms.mainButtionContainer, {
                            backgroundColor: colors.Gray,
                            marginTop: 10,
                            marginHorizontal: dimensions.widthOf(5),
                        }]}>
                            <Text style={[ms.mainButtion, {
                                color: colors.White,
                                fontSize: 20,
                                fontWeight: 'bold',
                                fontFamily: fonts.semiBold
                            }]}>-</Text>
                        </View> */}

                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    rightprop: {
        backgroundColor: '#E8E8E8',
        textAlign: 'center',
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
        flex: 1,
        width: dimensions.widthOf(25)
    },
    txinput: {
        color: colors.Black,
        textAlignVertical: 'center',
        width: dimensions.widthOf(75) - 30,
        backgroundColor: colors.Gray
    },
    main: {
        flex: 15,
        paddingLeft: 10,
        color: colors.Black,
    },
    ss: {
        fontSize: 18,
        paddingBottom: 20,
        fontWeight: '700',
        color: colors.Gray2,
        paddingTop: dimensions.heightOf(25),
        textAlign: 'center'
    },
    subTag: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: '#212121',
    },
    titleTag: {
        fontSize: 15,
        fontFamily: fonts.semiBold,
    },
    card: {
        alignSelf: 'flex-start',
        backgroundColor: colors.White,
        width: '100%',
        height: dimensions.heightOf(100),
        paddingVertical: 6,
        marginVertical: 0,
    },
    types: {
        backgroundColor: colors.Success,
        padding: 6,
        marginTop: 6,
        marginBottom: 10,
        fontSize: 12,
        alignSelf: 'baseline',
        color: colors.White,
        fontWeight: '900',
        borderRadius: 6
    }

})
