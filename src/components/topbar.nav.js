import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
} from 'react-native';
import { fonts, colors, dimensions } from '../util/types'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import ms from '../util/main.styles';

export default TopNav = ({ title, rooms, users, navigation, children }) => {
    return (
        <View style={styles.topbar}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon
                        style={ms.px15}
                        name="chevron-left" size={24} color={"#212121BF"} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 4 }}>
                <Text style={ms.topNavTitle}>{title}</Text>
            </View>
            <View style={styles.rightIcons}>
                {rooms && <Icon
                    style={{ paddingRight: 8 }}
                    name="bed" size={16} color={colors.Black} />}
                {rooms && <Text style={ms.topNavTitle}>{rooms}</Text>}
                {users && <Icon
                    style={{ paddingLeft: 16, paddingRight: 8 }}
                    name="user" size={16} color={colors.Black} />}
                {users && <Text style={ms.topNavTitle}>{users}</Text>}
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topbar: {
        height: 56,
        borderBottomColor: colors.Gray,
        borderBottomWidth: 1,
        paddingVertical: 16,
        flexDirection: 'row'
    },
    rightIcons: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 16
    }
})
