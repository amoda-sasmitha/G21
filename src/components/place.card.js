import React from 'react';
import {
    ImageBackground,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
} from 'react-native';
import { fonts, colors, dimensions } from '../util/types'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import ms from '../util/main.styles';

export default PlaceCard = ({ place, navigation }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("SinglePlace", { id: place.id })}
        >
            <View style={{ flexDirection: 'row', marginTop: 12, elevation: 4 }}>
                {place.images.length > 0 && <ImageBackground
                    style={{ flex: 3, minHeight: dimensions.heightOf(25), justifyContent: 'flex-end' }}
                    imageStyle={ms.brleft}
                    source={{ uri: place.images[0] }}
                />}
                {place.images.length == 0 && <ImageBackground
                    style={[ms.brleft, { flex: 3, backgroundColor: colors.Gray, minHeight: dimensions.heightOf(25), justifyContent: 'flex-end' }]}
                    imageStyle={ms.brleft}
                    source={require('../../assets/images/placeholder.png')}
                />}
                <View style={[styles.bgCover, ms.brright]}>
                    <Text style={styles.titleTag}>
                        {place.title}
                    </Text>
                    <Text
                        numberOfLines={8}
                        style={styles.locationTag} >
                        {place.description}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({

    locationTag: {
        fontFamily: fonts.regular,
        fontSize: 12,
        lineHeight: 16,
        color: colors.Black,
    },
    titleTag: {
        fontFamily: fonts.medium,
        fontSize: 16,
        color: colors.Black,
        marginBottom: 4,
        lineHeight: 20
    },
    bgCover: {
        paddingHorizontal: 8,
        paddingVertical: 12,
        flex: 2,
        borderColor: "#21212150",
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: colors.White
    },
    badge: {
        backgroundColor: colors.darkBlue,
        marginHorizontal: 12,
        color: colors.White,
        marginVertical: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        fontFamily: fonts.medium,
        fontSize: 14,
        borderRadius: 4,
        alignSelf: 'baseline'
    }

})
