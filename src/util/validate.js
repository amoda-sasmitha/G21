import React from 'react';
import ms from './main.styles'
import { Text } from 'react-native';
export const hasError = (errors, touched, title) => errors[title] && touched[title];

export const hasSuccess = (errors, values, title) => {
    return (!errors[title] && values[title].length != 0)
        ? ms.successBR : ms.normalBR
};
export const ErrorMessage = ({ errors, touched, name }) => {
    if (errors[name] && touched[name]) {
        return <Text style={ms.error}>*{errors[name]}</Text>
    } else {
        return <></>
    }
};