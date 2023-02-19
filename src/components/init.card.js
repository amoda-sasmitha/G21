import React from 'react';
import {
    ImageBackground,
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { fonts, colors, dimensions } from '../util/types'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import ms from '../util/main.styles';

export default InitCard = ({ type, loading, visible, tryagain }) => {

    if (!loading && visible) {
        return <></>
    }
    return (
        <View style={{ flexDirection: 'row', marginTop: 12, elevation: 4 }}>
            <View style={[ms.p12, ms.brright, { flex: 5, backgroundColor: colors.White }]}>
                <View style={{ flexDirection: 'column', flexGrow: 1 }}>
                    {loading ?
                        <View style={{ flex: 3, alignSelf: 'center' }}>
                            <ActivityIndicator size={30} color={colors.darkBlue} />
                            <Text style={styles.titleTag, { marginTop: 5 }}>
                                {`${type ? type : 'Items'} Loading..`}
                            </Text>
                        </View>
                        :
                        <View style={{ flex: 3, alignSelf: 'center' }}>
                            <Image
                                style={{ height: dimensions.heightOf(25), width: 130 }}
                                source={require('../../assets/images/NotFound.jpg')} />
                            <Text style={styles.titleTag}>
                                {`No ${type ? type : 'Items'} Found!`}
                            </Text>
                            {(tryagain == undefined || tryagain != false) && <Text style={styles.locationTag}>
                                {"Please try again..."}
                            </Text>
                            }
                        </View>
                    }
                </View>
            </View>
        </View>
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
        textAlign: 'center',
        color: '#212121',
        marginBottom: 12
    },
    titleTag: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: fonts.semiBold,
    },
    typeTag: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.Black
    }
})
