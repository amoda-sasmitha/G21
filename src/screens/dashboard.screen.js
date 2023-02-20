import React, { useEffect } from 'react';
import useState from 'react-usestateref';
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
// import { landmarks } from '../util/landmarks'
import { distanceCalc } from '../util/distance.cal'
import Dialog, { DialogContent, DialogTitle, DialogButton } from 'react-native-popup-dialog'
import Geolocation from '@react-native-community/geolocation';
import { accelerometer, setUpdateIntervalForType, SensorTypes, gyroscope } from "react-native-sensors";
import { useSelector, useDispatch } from 'react-redux'
import { startCounter, stopCounter } from 'react-native-accurate-step-counter';

setUpdateIntervalForType(SensorTypes.accelerometer, 400); // defaults to 100ms

export default function Dashboard({ navigation }) {
    const [isRefFound, setRefFound, curRefFound] = useState(false);
    const [refData, setRef, curRef] = useState(null);
    const [position, setPosition, curPosition] = useState({ lat: null, lng: null });
    const [accelerometer_data, setAccelerometer, curAccelerometer] = useState({ x: null, y: null, z: null });
    const [gyroscope_data, setGyroscope, curGyroscope] = useState({ x: null, y: null, z: null });
    const [steps, setSteps, curSteps] = useState(0);
    const [turn, setTurn, curTurn] = useState('-');
    const [c, setc, curc] = useState(0);
    const dispatch = useDispatch()

    const data_land = useSelector((state) => state.ref.landmarks);
    const landmarks = JSON.parse(JSON.stringify(data_land));

    useEffect(() => {
        const subscription_acc = accelerometer.subscribe(({ x, y, z }) => {
            setTurn(decideTurn(curAccelerometer.current, { x, y, z }));
            setAccelerometer({ x, y, z })
        });
        const subscription_gyro = accelerometer.subscribe(({ x, y, z }) =>
            setGyroscope({ x, y, z })
        );

        const config = {
            default_threshold: 10.0,
            default_delay: 150000000,
            cheatInterval: 3000,
            onStepCountChange: (stepCount) => { setSteps(curSteps.current + stepCount) },
            onCheat: () => { console.log("Stopped") }
        }

        startCounter(config);
        const watchID = Geolocation.watchPosition(
            (res_position) => {
                const lat = res_position?.coords?.latitude ?? null;
                const lng = res_position?.coords?.longitude ?? null;
                if (lat != null && lng != null) {
                    setPosition({ lat, lng });

                    for (let i = 0; i < landmarks.length; i++) {
                        const mark = landmarks[i];
                        const dis = distanceCalc(lat, lng, mark.x, mark.y);
                        if (dis <= 15 && !isRefFound) {
                            setRefFound(true);
                            setRef({
                                accelerometer: curAccelerometer.current,
                                gyroscope: curGyroscope.current,
                                position: curPosition.current,
                                point: i,
                                turn: curTurn.current,
                                steps: curSteps.current
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
        //             if (lat != null && lng != null) {
        //                 setPosition({ lat, lng });

        //                 for (let i = 0; i < landmarks.length; i++) {
        //                     const mark = landmarks[i];
        //                     const dis = distanceCalc(lat, lng, mark.x, mark.y);
        //                     if (dis <= 15 && !isRefFound) {
        //                         setRefFound(true);
        //                         setRef({
        //                             accelerometer: curAccelerometer.current,
        //                             gyroscope: curGyroscope.current,
        //                             position: curPosition.current,
        //                             point: i,
        //                             turn: curTurn.current,
        //                             steps: curSteps.current
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
            stopCounter();
        };
    }, []);

    const decideTurn = (current, now) => {
        const NOISE = 2.0;
        let deltaX = Math.abs(current.x - now.x);
        let deltaY = Math.abs(current.y - now.y);
        let deltaZ = Math.abs(current.z - now.z);
        // if (deltaX < NOISE) deltaX = 0.0;
        // if (deltaY < NOISE) deltaY = 0.0;
        // if (deltaZ < NOISE) deltaZ = 0.0;

        if (deltaX > deltaY) {
            if (deltaX < NOISE * -1)
                return 'RIGHT';
            else
                return 'LEFT';
        } else {
            return '-';
        }
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
                            {'Dashboard'}
                        </Text>
                        <View style={{ flex: 2 }}>
                            <TouchableOpacity onPress={() => { navigation.navigate('Ref') }}>
                                <Text style={{ color: colors.Black, fontSize: 20 }}>
                                    {'Ref'}
                                </Text>
                            </TouchableOpacity>
                        </View>
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

                        <TouchableOpacity activeOpacity={1} onPress={() => {
                            setRefFound(true);
                            setRef({
                                accelerometer: curAccelerometer.current,
                                gyroscope: curGyroscope.current,
                                position: curPosition.current,
                                point: curc.current,
                                turn: curTurn.current,
                                steps: curSteps.current
                            })
                        }}>
                            <Text style={[ms.mainButtion, {
                                color: colors.mainBlue,
                                fontSize: 18,
                                marginTop: dimensions.heightOf(5),
                                textAlign: 'center',
                                fontWeight: '700',
                                fontFamily: fonts.semiBold
                            }]}>Accelerometer
                            </Text>
                        </TouchableOpacity>

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
                            }]}>{steps}</Text>
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
                            }]}>{turn}</Text>
                        </View> */}
                    </ScrollView>
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
                                }]}>You are now standing on Reference Point {curRef?.current?.point ? " - " + String(curRef.current.point + 1).padStart(2, '0') : ''}
                                </Text>

                                <TouchableOpacity
                                    disabled={false}
                                    onPress={() => {
                                        setRefFound(false);
                                        dispatch({
                                            type: 'ADD',
                                            payload: refData
                                        })
                                        setc(refData.point + 1);
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
                                        setc(refData.point + 1);
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
