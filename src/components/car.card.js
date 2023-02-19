import React from 'react';
import {
    ImageBackground,
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { fonts, colors, dimensions } from '../util/types'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import ms from '../util/main.styles';

export default CarCard = ({ car, navigation }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("SingleVehical", { id: car.id })}
        >
            <View style={{ flexDirection: 'row', marginTop: 12, elevation: 4 }}>
                {car.images.length > 0 && <ImageBackground
                    style={{ flex: 3 }}
                    imageStyle={ms.brleft}
                    source={{ uri: car.images[0] }}
                />}
                {car.images.length == 0 && <ImageBackground
                    style={[ms.brleft, { flex: 3, backgroundColor: colors.Gray }]}
                    imageStyle={ms.brleft}
                    source={require('../../assets/images/placeholder.png')}
                />}
                <View style={[ms.p12, ms.brright, { flex: 5, backgroundColor: colors.White }]}>
                    <View style={{ flexDirection: 'column', flexGrow: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Badge title={`${car.doors} Doors`} ></Badge>
                            <Badge title={`${car.passengers} Passengers`} ></Badge>
                        </View>
                        <Text style={styles.titleTag}>
                            {car.title}
                        </Text>
                        <Text style={styles.locationTag}>
                            {car.location_name}
                        </Text>
                        <Badge title={`LKR ${car.price}`} border={true}></Badge>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export const Badge = ({ title, icon, dark, border }) => (
    <View style={[
        { borderColor: border ? colors.darkBlue : colors.White, borderWidth: 0.5, borderRadius: 4 },
        dark ? ms.badgedark : border ? ms.White : ms.badgegray, { marginBottom: 12, alignSelf: 'baseline', flexDirection: 'row', marginRight: 6 }]}>
        {icon && <Icon name={icon} size={13} color={dark ? colors.White : colors.darkBlue} style={{ paddingRight: 3 }} />}
        <Text style={[styles.typeTag, { color: dark ? colors.White : colors.Black }]}>
            {title}
        </Text>
    </View>
)

const styles = StyleSheet.create({
    moreInfoCon: {
        flex: 1,
        backgroundColor: colors.mainBlue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    moreInfoText: {
        fontFamily: fonts.semiBold,
        fontSize: 12,
        color: colors.White,
        paddingVertical: 6
    },
    priceTag: {
        fontFamily: fonts.semiBold,
        fontSize: 16,
        color: '#212121FA'
    },
    priceTagCon: {
        flex: 2,
        justifyContent: 'flex-end'
    },
    locationTag: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: '#212121',
        marginBottom: 6
    },
    titleTag: {
        fontFamily: fonts.medium,
        fontSize: 16,
        color: '#212121FA',
        lineHeight: 20
    },
    typeTag: {
        fontFamily: fonts.medium,
        fontSize: 14,
        paddingHorizontal: 4
    }
})
