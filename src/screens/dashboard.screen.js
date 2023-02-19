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
import Dialog, { DialogContent, DialogTitle, DialogButton } from 'react-native-popup-dialog'
import Geolocation from '@react-native-community/geolocation';
import {
    accelerometer,
    gyroscope,
    setUpdateIntervalForType,
    SensorTypes
} from "react-native-sensors";

setUpdateIntervalForType(SensorTypes.accelerometer, 400); // defaults to 100ms


export default function Dashboard({ navigation }) {
    const [isRefFound, setRefFound] = useState(false);
    const [position, setPosition] = useState({ lat: null, lng: null });
    const [subscriptionId, setSubscriptionId] = useState(null);

    const watchPosition = () => {
        try {
            console.log("called");
            const watchID = Geolocation.watchPosition(
                (position) => {
                    console.log(position);
                    setPosition({
                        lat: position?.coords?.latitude ?? null,
                        lng: position?.coords?.longitude ?? null,
                    });
                },
                (error) => Alert.alert('WatchPosition Error', JSON.stringify(error)),
                { interval: 1 }
            );
            setSubscriptionId(watchID);
        } catch (error) {
            Alert.alert('WatchPosition Error', JSON.stringify(error));
        }
    };

    const subscription = accelerometer.subscribe(({ x, y, z, timestamp }) =>
        console.log({ x, y, z, timestamp })
    );

    const clearWatch = () => {
        subscriptionId !== null && Geolocation.clearWatch(subscriptionId);
        setSubscriptionId(null);
        setPosition(null);
    };

    useEffect(() => {
        watchPosition();
        return () => {
            subscription.unsubscribe();
            clearWatch();
        };
    }, []);

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
                            {'Dashboard'}
                        </Text>
                        <View style={{ flex: 2 }}>
                            <TouchableOpacity onPress={() => { setRefFound(true) }}>
                                <Text style={{ color: colors.Black, fontSize: 20 }}>
                                    {'Ref'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>


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
                            X : {position?.lat != null ? Number(position.lat).toFixed(6) : '-'}
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
                        }]}> Y : {position?.lng != null ? Number(position.lng).toFixed(6) : '-'}
                        </Text>
                    </View>

                    <Text style={[ms.mainButtion, {
                        color: colors.mainBlue,
                        fontSize: 18,
                        marginTop: dimensions.heightOf(8),
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
                        }]}>X : 12.214321</Text>
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
                        }]}>15</Text>
                    </View>

                    <Text style={[ms.mainButtion, {
                        color: colors.mainBlue,
                        fontSize: 18,
                        marginTop: dimensions.heightOf(5),
                        textAlign: 'center',
                        fontWeight: '700',
                        fontFamily: fonts.semiBold
                    }]}>Direction
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
                        }]}>-</Text>
                    </View>
                    <Dialog
                        visible={isRefFound}
                        onTouchOutside={() => { setRefFound(false) }}
                        dialogTitle={<DialogTitle title="Reference Point" />}
                    >
                        <DialogContent>
                            <View style={{ width: dimensions.widthOf(80) - 20 }}>
                                <Text style={[ms.mainButtion, {
                                    color: colors.Gray2,
                                    fontSize: 18,
                                    marginTop: 20,
                                    marginHorizontal: dimensions.widthOf(5),
                                    textAlign: 'left',
                                    fontWeight: '700',
                                    fontFamily: fonts.semiBold
                                }]}>You are now standing on reference point !
                                </Text>

                                <TouchableOpacity
                                    disabled={false}
                                    onPress={() => { }}
                                    activeOpacity={0.8}>
                                    <View style={[ms.mainButtionContainer, {
                                        backgroundColor: colors.mainBlue,
                                        marginHorizontal: dimensions.widthOf(5),
                                        marginTop: 25
                                    }]}>
                                        <Text style={[ms.mainButtion, {
                                            color: colors.White,
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            fontFamily: fonts.semiBold
                                        }]}>Save</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    disabled={false}
                                    onPress={() => { }}
                                    activeOpacity={0.8}>
                                    <View style={[ms.mainButtionContainer, {
                                        backgroundColor: colors.mainBlue,
                                        marginHorizontal: dimensions.widthOf(5),
                                        marginTop: 15
                                    }]}>
                                        <Text style={[ms.mainButtion, {
                                            color: colors.White,
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            fontFamily: fonts.semiBold
                                        }]}>Continue</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    disabled={false}
                                    onPress={() => { setRefFound(false) }}
                                    activeOpacity={0.8}>
                                    <Text style={[ms.mainButtion, {
                                        color: colors.mainBlue,
                                        fontSize: 18,
                                        marginTop: 20,
                                        marginHorizontal: dimensions.widthOf(5),
                                        textAlign: 'center',
                                        fontWeight: '700',
                                        fontFamily: fonts.semiBold
                                    }]}>Discard
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </DialogContent>
                    </Dialog>
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
