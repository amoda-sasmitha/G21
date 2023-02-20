import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    FlatList,
    Image,
    Text,
    ToastAndroid,
    TextInput,
    TouchableOpacity,
    View,
    Radi
} from 'react-native';
import ms from '../util/main.styles'
import { fonts, colors, dimensions } from '../util/types'
import SelectDropdown from 'react-native-select-dropdown'

export default function BMI({ navigation }) {
    const data = ['Male', 'Female'];
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [bmi, setBMI] = useState(null);
    const [gender, setGender] = useState('');

    handleBMI = () => {
        setBMI(null);
        if (height == '' || isNaN(height)) {
            handleToast('Please add correct Height!');
            return;
        }

        if (weight == '' || isNaN(weight)) {
            handleToast('Please add correct Weight!');
            return;
        }

        if (age == '' || isNaN(age)) {
            handleToast('Please add correct Age!');
            return;
        }

        if (gender == '') {
            handleToast('Please select a Gender!');
            return;
        }
        const bmi = (weight / Math.pow((height / 100), 2)).toFixed(2);
        let category = '';
        let color = '#FFFFFF';

        if (bmi < 18.5) {
            category = "Underweight";
            color = "#ffc44d";
        }
        //If BMI is >=18.5 and <=24.9
        else if (bmi >= 18.5 && bmi <= 24.9) {
            category = "Normal Weight";
            color = "#0be881";
        }
        //If BMI is >= 25 and <= 29.9 
        else if (bmi >= 25 && bmi <= 29.9) {
            category = "Overweight";
            color = "#ff884d";
        }
        //If BMI is <= 30
        else {
            category = "Obese";
            color = "#ff5e57";
        }
        setBMI({
            bmi: bmi,
            category,
            color
        })
    }

    handleToast = (msg) => {
        ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
        );
    }
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
                            {'Please Enter Your Details'}
                        </Text>
                    </View>
                    <Text style={{ ...ms.ssTitle, ...styles.ss }}>
                        {'Weight, Height and Age details needs to calculate Your BMI'}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: dimensions.heightOf(5) }}>
                        <TextInput
                            name={"height"}
                            placeholderTextColor={colors.Black}
                            style={[ms.mainInput, styles.txinput]}
                            value={height}
                            keyboardType={'decimal-pad'}
                            placeholder="Height"
                            onChangeText={(text) => setHeight(text)}
                        />
                        <View style={styles.rightprop}>
                            <Text style={{ ...ms.ssTitle, ...{ textAlign: 'center', } }}>
                                {'cm'}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: dimensions.heightOf(3) }}>
                        <TextInput
                            name={"weight"}
                            placeholderTextColor={colors.Black}
                            style={[ms.mainInput, styles.txinput]}
                            value={weight}
                            keyboardType={'decimal-pad'}
                            placeholder="Weight"
                            onChangeText={(text) => setWeight(text)}
                        />
                        <View style={styles.rightprop}>
                            <Text style={{ ...ms.ssTitle, ...{ textAlign: 'center', } }}>
                                {'kg'}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: dimensions.heightOf(3) }}>
                        <TextInput
                            name={"age"}
                            placeholderTextColor={colors.Black}
                            style={[ms.mainInput, styles.txinput]}
                            value={age}
                            keyboardType={'decimal-pad'}
                            placeholder="Age"
                            onChangeText={(text) => setAge(text)}
                        />
                        <View style={styles.rightprop}>
                            <Text style={{ ...ms.ssTitle, ...{ textAlign: 'center', } }}>
                                {'Years'}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: dimensions.heightOf(3) }}>
                        <SelectDropdown
                            buttonStyle={{
                                backgroundColor: colors.Gray,
                                width: dimensions.widthOf(75) - 30
                            }}
                            dropdownStyle={{
                                width: dimensions.widthOf(100) - 30
                            }}
                            rowStyle={{
                                backgroundColor: colors.White
                            }}
                            data={data}
                            onSelect={(selectedItem, index) => {
                                setGender(selectedItem);
                            }}
                            buttonTextStyle={{
                                textAlign: 'left',
                                backgroundColor: colors.Gray,
                                fontSize: 16
                            }}
                            defaultButtonText={'Gender'}
                            defaultValue={gender}
                        />
                        <View style={styles.rightprop}>
                            <Text style={{ ...ms.ssTitle, ...{ textAlign: 'center', } }}>
                                {'Gender'}
                            </Text>
                        </View>
                    </View>
                    <View style={{ height: dimensions.heightOf(20) }}>
                        {bmi != null && <View>
                            <Text style={{
                                paddingTop: 35,
                                textAlign: 'center', fontWeight: 'bold', color: colors.Black,
                                fontFamily: fonts.extraBold, fontSize: 26
                            }}>{`BMI : ${bmi.bmi}`}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 20, color: bmi.color }}>{`${bmi.category}`}</Text>
                        </View>}
                    </View>
                    <TouchableOpacity
                        disabled={false}
                        onPress={() => { handleBMI(); }}
                        activeOpacity={0.8}>
                        <View style={[ms.mainButtionContainer, { backgroundColor: colors.mainBlue, marginTop: 16 }]}>
                            <Text style={[ms.mainButtion, {
                                color: colors.White,
                                fontSize: 20,
                                fontWeight: 'bold',
                                fontFamily: fonts.extraBold
                            }]}>Calculate</Text>
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
        color: colors.Black,
        flex: 15,
        paddingLeft: 10,
    },
    ss: {
        color: colors.mainBlue,
        paddingTop: 4
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
