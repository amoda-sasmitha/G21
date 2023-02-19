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
    Radi,
    DeviceEventEmitter
} from 'react-native';
import ms from '../util/main.styles'
import { fonts, colors, dimensions } from '../util/types'
import { landmarks } from '../util/landmarks'
import { distanceCalc } from '../util/distance.cal'
import Dialog, { DialogContent, DialogTitle, DialogButton } from 'react-native-popup-dialog'
import Geolocation from '@react-native-community/geolocation';
import { accelerometer, setUpdateIntervalForType, SensorTypes, gyroscope } from "react-native-sensors";
import { useSelector, useDispatch } from 'react-redux'

setUpdateIntervalForType(SensorTypes.accelerometer, 400); // defaults to 100ms

export default function Dashboard({ navigation }) {
    const [isRefFound, setRefFound] = useState(false);
    const [refData, setRef] = useState(null);
    const [position, setPosition] = useState({ lat: null, lng: null });
    const [accelerometer_data, setAccelerometer] = useState({ x: null, y: null, z: null });
    const [gyroscope_data, setGyroscope] = useState({ x: null, y: null, z: null });
    const [c, setc] = useState(0);
    const dispatch = useDispatch()

    useEffect(() => {
        const subscription_acc = accelerometer.subscribe(({ x, y, z }) =>
            setAccelerometer({ x, y, z })
        );
        const subscription_gyro = accelerometer.subscribe(({ x, y, z }) =>
            setGyroscope({ x, y, z })
        );

        const watchID = Geolocation.watchPosition(
            (position) => {
                const lat = position?.coords?.latitude ?? null;
                const lng = position?.coords?.longitude ?? null;
                if (lat != null && lng != null) {
                    setPosition({ lat, lng });
                    setc(c + 1);
                    for (let i = 0; i < landmarks.length; i++) {
                        const mark = landmarks[i];
                        const dis = distanceCalc(lat, lng, mark.x, mark.y);
                        if (dis <= 15 && !isRefFound) {
                            setRefFound(true);
                            setRef({
                                accelerometer: { x: accelerometer_data.x, y: accelerometer_data.y, z: accelerometer_data.z },
                                gyroscope: gyroscope_data,
                                position,
                                point: i,
                                steps: 0
                            })
                            break;
                        }

                    }
                }
            },
            (error) => Alert.alert('WatchPosition Error', JSON.stringify(error)),
            { enableHighAccuracy: false, timeout: 15000, maximumAge: 0 },
        );
        // const locationInterval = setInterval(() => {
        //     Geolocation.getCurrentPosition(
        //         position => {
        //             const lat = position?.coords?.latitude ?? null;
        //             const lng = position?.coords?.longitude ?? null;
        //             if (lat != null && lng != null && !isRefFound) {
        //                 console.log({ lat, lng });
        //                 setPosition({ lat, lng });
        //                 for (let i = 0; i < landmarks.length; i++) {
        //                     const mark = landmarks[i];
        //                     const dis = distanceCalc(lat, lng, mark.x, mark.y);
        //                     if (dis <= 15 && !isRefFound) {
        //                         setRefFound(true);
        //                         setRef({
        //                             accelerometer: accelerometer_data,
        //                             gyroscope: gyroscope_data,
        //                             position
        //                         })
        //                         break;
        //                     }

        //                 }
        //             }
        //         },
        //         (error) => Alert.alert('WatchPosition Error', JSON.stringify(error)),
        //         { enableHighAccuracy: false, timeout: 15000, maximumAge: 0 },
        //     );
        // }, 1000);

        return () => {
            subscription_acc.unsubscribe();
            subscription_gyro.unsubscribe();
            // clearInterval(locationInterval);
            Geolocation.clearWatch(watchID);
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
                            {'Dashboard ' + c}
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
                                `X : ${accelerometer_data.x != null ? Number(accelerometer_data.x).toFixed(6) : '0:00'}\nY : ${accelerometer_data.y != null ? Number(accelerometer_data.y).toFixed(6) : '0:00'}`
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
                                `X : ${gyroscope_data.x != null ? Number(gyroscope_data.x).toFixed(6) : '0:00'}\nY : ${gyroscope_data.y != null ? Number(gyroscope_data.y).toFixed(6) : '0:00'}\nZ : ${gyroscope_data.z != null ? Number(gyroscope_data.z).toFixed(6) : '0:00'}`
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
                                    onPress={() => {
                                        setRefFound(false);
                                        dispatch({
                                            type: 'ADD',
                                            payload: refData
                                        })
                                        setRef(null);
                                        navigation.goBack();
                                    }}
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
                                    onPress={() => {
                                        setRefFound(false);
                                        dispatch({
                                            type: 'ADD',
                                            payload: refData
                                        })
                                        setRef(null);
                                    }}
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
                                    onPress={() => { setRefFound(false); setRef(null); }}
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
