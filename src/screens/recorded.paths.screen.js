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
import { useSelector } from 'react-redux'

export default function RecordedPath({ navigation }) {

    const refs = useSelector((state) => state.ref.ref);
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
                            {'Recorded paths'}
                        </Text>
                    </View>
                    <Text style={{ ...ms.ssTitle, ...styles.ss }}>
                        {'Select the Landmark'}
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {
                            [...Array(25).keys()].map((value, i) => {
                                const current = (i + 1);
                                const found = refs.find(ref => ref.point === current);
                                let obj = { backgroundColor: colors.Gray }
                                if (found) {
                                    obj = { backgroundColor: colors.Gray2 }
                                }
                                return (
                                    <TouchableOpacity key={i}
                                        onPress={() => { navigation.navigate("RefPoint", { point: current }) }}
                                        activeOpacity={found ? 0.8 : 1}
                                        style={{ ...styles.iconwrap, ...obj }}>
                                        <Text style={styles.icon}>{i + 1}</Text>
                                    </TouchableOpacity>
                                );
                            }
                            )}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    iconwrap: {
        marginHorizontal: dimensions.widthOf(3),
        marginBottom: dimensions.widthOf(2),
        alignItems: 'center',
        justifyContent: 'center',
        width: dimensions.widthOf(12),
        height: dimensions.widthOf(12),
        borderRadius: 50,
    },
    icon: {
        color: colors.Black,
        fontFamily: fonts.semiBold,
        fontWeight: '700'
    },
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
        paddingLeft: 20,
        paddingBottom: 20,
        fontWeight: '700',
        color: colors.Gray2,
        paddingTop: dimensions.heightOf(10),
        textAlign: 'left'
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
