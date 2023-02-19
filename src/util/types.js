import { Dimensions } from 'react-native';

export const fonts = {
    light: 'Poppins-Light',
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    extraBold: 'Poppins-Bold',
}

export const colors = {
    mainBlue: '#5D70B0',
    mainPurple: '#542188',
    darkBlue: '#111D37',
    Gray2: '#666666',
    background: '#F4F4F4',
    White: '#FFFFFF',
    Gray: '#E5E5E5',
    Gray3: '#E8E8E8',
    Black: "#000000",
    TR: "transparent",
    ErrorRed: "#FF4040",
    Success: "#16a08590",
}

export const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    widthOf: (size) => Dimensions.get('window').width * size / 100,
    heightOf: (size) => Dimensions.get('window').height * size / 100,
}