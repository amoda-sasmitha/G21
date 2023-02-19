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

export default function REF({ navigation }) {

    return (
        <SafeAreaView style={{ backgroundColor: colors.White }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={colors.White} />
            <View>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                                <Image source={require('../../assets/images/back.png')} style={ms.back} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ ...ms.mainTitle, ...styles.main }}>
                            {'Ref'}
                        </Text>
                    </View>

                    <TouchableOpacity
                        disabled={false}
                        onPress={() => { navigation.navigate("Landmark") }}
                        activeOpacity={0.8}>
                        <View style={[ms.mainButtionContainer, {
                            backgroundColor: colors.mainBlue,
                            marginHorizontal: dimensions.widthOf(5),
                            marginTop: dimensions.heightOf(15)
                        }]}>
                            <Text style={[ms.mainButtion, {
                                color: colors.White,
                                fontSize: 20,
                                fontWeight: 'bold',
                                fontFamily: fonts.semiBold
                            }]}>Landmarks</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={false}
                        onPress={() => { navigation.navigate("Recorded") }}
                        activeOpacity={0.8}>
                        <View style={[ms.mainButtionContainer, {
                            backgroundColor: colors.mainBlue,
                            marginHorizontal: dimensions.widthOf(5),
                            marginTop: dimensions.heightOf(15)
                        }]}>
                            <Text style={[ms.mainButtion, {
                                color: colors.White,
                                fontSize: 20,
                                fontWeight: 'bold',
                                fontFamily: fonts.semiBold
                            }]}>Recorded paths</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={false}
                        onPress={() => { navigation.navigate("BMI") }}
                        activeOpacity={0.8}>
                        <View style={[ms.mainButtionContainer, {
                            backgroundColor: colors.mainBlue,
                            marginHorizontal: dimensions.widthOf(5),
                            marginTop: dimensions.heightOf(15)
                        }]}>
                            <Text style={[ms.mainButtion, {
                                color: colors.White,
                                fontSize: 20,
                                fontWeight: 'bold',
                                fontFamily: fonts.semiBold
                            }]}>Calculate BMI</Text>
                        </View>
                    </TouchableOpacity>

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
        paddingHorizontal: 15,
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
