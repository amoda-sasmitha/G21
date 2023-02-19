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

export default HotelCard = ({ hotel, navigation }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("SingleHotel", { id: hotel.id })}
        >
            <View style={{ flexDirection: 'row', marginTop: 12, elevation: 4 }}>
                {hotel.images.length > 0 && <ImageBackground
                    style={{ flex: 3 }}
                    imageStyle={ms.brleft}
                    source={{ uri: hotel.images[0] }}
                />}
                {hotel.images.length == 0 && <ImageBackground
                    style={[ms.brleft, { flex: 3, backgroundColor: colors.Gray }]}
                    imageStyle={ms.brleft}
                    source={require('../../assets/images/placeholder.png')}
                />}
                <View style={[ms.p12, ms.brright, { flex: 5, backgroundColor: colors.White }]}>
                    <View style={{ flexDirection: 'column', flexGrow: 1 }}>
                        <View style={{ flex: 3 }}>
                            <View style={[ms.badgegray, { marginBottom: 12, alignSelf: 'baseline' }]}>
                                <Text style={styles.typeTag}>
                                    {hotel.type}
                                </Text>
                            </View>
                            <Text style={styles.titleTag}>
                                {hotel.title}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                {[...Array(hotel.stars).keys()].map((key) => (
                                    <Icon key={key} name="star" size={13} color={colors.mainBlue} style={{ paddingRight: 3 }} />
                                ))}
                            </View>
                            <View style={ms.hr} />
                            <Text style={styles.locationTag}>
                                {hotel.location_name}
                            </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.priceTagCon}>
                                    <Text style={styles.priceTag}>
                                        {`LKR ${hotel.price}`}
                                    </Text>
                                </View>
                                <View style={styles.moreInfoCon}>
                                    <Text style={styles.moreInfoText}>
                                        More Info
                                    </Text>
                                </View>
                            </View>

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
        marginBottom: 36
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
