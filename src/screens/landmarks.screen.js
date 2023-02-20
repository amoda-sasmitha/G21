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
import { landmarks } from '../util/landmarks'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import SelectDropdown from 'react-native-select-dropdown'

export default function Landmark({ navigation }) {
    return (
        <SafeAreaView style={{ backgroundColor: colors.White }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={colors.White} />
            <View>
                <View>
                    <View style={{ flexDirection: 'row', paddingTop: 15, paddingHorizontal: 15 }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                                <Image source={require('../../assets/images/back.png')} style={ms.back} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ ...ms.mainTitle, ...styles.main }}>
                            {'Landmarks'}
                        </Text>
                    </View>
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 180 }}
                        style={{ paddingHorizontal: 15 }}>
                        {
                            landmarks.map((value, i) => (
                                <View key={i} style={{ paddingVertical: 12 }}>
                                    <Text style={[ms.mainButtion, {
                                        color: colors.mainBlue,
                                        fontSize: 18,
                                        textAlign: 'center',
                                        fontWeight: '700',
                                        fontFamily: fonts.semiBold
                                    }]}>Point {String(i + 1).padStart(2, '0')}
                                    </Text>
                                    <TouchableOpacity
                                        disabled={false}
                                        onPress={() => { }}
                                        activeOpacity={0.95}>
                                        <View style={[ms.mainButtionContainer, {
                                            backgroundColor: colors.Gray3,
                                            borderRadius: 5,
                                            paddingHorizontal: 25,
                                            justifyContent: 'space-between',
                                            flexDirection: 'row',
                                            marginTop: 10
                                        }]}>
                                            <Text style={[ms.mainButtion, {
                                                color: colors.Black,
                                                fontSize: 16,
                                                fontWeight: '500',
                                                fontFamily: fonts.regular
                                            }]}>X: {(value.x).toFixed(7)}
                                            </Text>
                                            <Text style={[ms.mainButtion, {
                                                color: colors.Black,
                                                fontSize: 16,
                                                fontWeight: '500',
                                                fontFamily: fonts.regular
                                            }]}>Y: {(value.y).toFixed(7)}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
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
        paddingBottom: 8,
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
