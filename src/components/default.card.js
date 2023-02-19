import React from 'react';
import {
    ImageBackground,
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import { fonts, colors, dimensions } from '../util/types'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import ms from '../util/main.styles';

export default DefaultCard = ({ params, navigation }) => {
    const redirect = params.td == "HOTEL" ? "HostSingleHotel" : "HostSingleVehicle";
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate(redirect, { id: params.id })}
        >
            <View style={{ flexDirection: 'row', marginTop: 12, elevation: 4 }}>

                {params.images.length > 0 && <ImageBackground
                    style={{ flex: 2 }}
                    imageStyle={ms.brleft}
                    source={{ uri: params.images[0] }}
                />}
                {params.images.length == 0 && <ImageBackground
                    style={[ms.brleft, { flex: 2, backgroundColor: colors.Gray }]}
                    imageStyle={ms.brleft}
                    source={require('../../assets/images/placeholder.png')}
                />}
                <View style={[ms.p12, ms.brright, { flex: 5, backgroundColor: colors.White }]}>
                    <View style={{ flexDirection: 'column', flexGrow: 1 }}>
                        <View style={{ flex: 3 }}>

                            <Text style={styles.titleTag}>
                                {params.title}
                            </Text>
                            <View style={[ms.badgegray, { marginBottom: 8, alignSelf: 'baseline' }]}>
                                <Text style={styles.typeTag}>
                                    {params.type}
                                </Text>
                            </View>
                            <View style={ms.hr} />
                            <Text style={styles.locationTag}>
                                {params.location_name}
                            </Text>
                            <Text style={styles.priceTag}>
                                {`LKR ${params.price}`}
                            </Text>
                        </View>

                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

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
        fontSize: 12,
        color: colors.Black
    }
})
