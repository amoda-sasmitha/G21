import { fonts, colors, dimensions } from './types'
import { StyleSheet, } from 'react-native';

export default StyleSheet.create({
    topCard: {
        paddingTop: 24,
        paddingHorizontal: 15,
        paddingBottom: 24,
    },
    mainTitle: {
        fontSize: 22,
        fontFamily: fonts.semiBold,
        fontWeight: "800"
    },
    ssTitle: {
        fontSize: 16,
        fontFamily: fonts.regular,
        fontWeight: "400"
    },
    mainPadding: {
        paddingHorizontal: 15
    },
    mainPaddingMin: {
        paddingHorizontal: 6
    },
    Title: {
        fontSize: 18,
        fontFamily: fonts.semiBold,
    },
    subTitle: {
        marginTop: 8,
        fontSize: 16,
        lineHeight: 22,
        fontFamily: fonts.medium,
    },
    topNavTitle: {
        fontSize: 16,
        fontFamily: fonts.semiBold,
    },
    searchInput: {
        fontFamily: fonts.medium,
        fontSize: 16,
        paddingHorizontal: 8
    },
    searchContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#FFFFFF40'
    },
    searchItem: {
        width: dimensions.widthOf(30),
        marginRight: dimensions.widthOf(1.5),
        flexDirection: 'row',
        alignContent: 'center',
        paddingHorizontal: 5,
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: 'center',
        borderColor: "#FFFFFF40",
        borderWidth: 1.5
    },
    hotelCard: {
        backgroundColor: colors.White,
    },
    p12: {
        padding: 12
    },
    p15: {
        padding: 15
    },
    px12: {
        paddingHorizontal: 12
    },
    px15: {
        paddingHorizontal: 15
    },
    py12: {
        paddingVertical: 12
    },
    py15: {
        paddingVertical: 15
    },
    br: {
        borderRadius: 8
    },
    brleft: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
    brright: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
    brtop: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    brbottom: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    hr: {
        borderBottomColor: colors.Gray,
        paddingVertical: 2,
        borderBottomWidth: 1,
    },
    badgegray: {
        backgroundColor: colors.background,
        padding: 4,
        borderRadius: 4,
    },
    badgedark: {
        backgroundColor: colors.darkBlue,
        padding: 4,
        borderRadius: 4,
    },
    autoSuggest: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontFamily: fonts.medium,
        fontSize: 12
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },
    mainInputContainer: {
        borderWidth: 2,
        borderColor: colors.Gray,
        marginTop: 4,
        borderRadius: 4
    },
    successBR: {
        borderColor: colors.Success
    },
    normalBR: {
        borderColor: colors.Gray
    },
    errorlBR: {
        borderColor: colors.ErrorRed
    },
    mainInput: {
        backgroundColor: colors.White,
        fontFamily: fonts.medium,
        fontSize: 16,
        paddingHorizontal: 12
    },
    mainButtion: {
        fontSize: 16,
        lineHeight: 22,
        marginTop: 2,
        fontFamily: fonts.medium,
        textAlign: 'center'
    },
    mainButtionContainer: {
        borderRadius: 40,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        elevation: 2,
        paddingVertical: 12
    },
    infoBarContainer: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 4,
        borderColor: '#000000BF',
        flex: 1,
        marginTop: 12,
        backgroundColor: colors.White
    },
    infoBarText: {
        fontFamily: fonts.medium,
        fontSize: 14,
        paddingVertical: 10,
        textAlign: 'center'
    },
    textLabel: {
        marginTop: 8,
        fontSize: 14,
        fontFamily: fonts.medium,
    },
    suggestion: {
        marginTop: 6,
        fontSize: 14,
        fontFamily: fonts.medium,
    },
    suggestionSub: {
        fontSize: 12,
        paddingBottom: 6,
        fontFamily: fonts.regular,
    },
    suggestionBR: {
        borderBottomColor: colors.Gray,
        borderBottomWidth: 1
    },
    error: {
        color: colors.ErrorRed,
        fontFamily: fonts.medium,
        fontSize: 13,
        marginLeft: 2,
        marginTop: 4
    },
    logoImage: {
        width: 130,
        height: 130,
        alignSelf: 'center',
        marginTop: '15%',
        marginBottom: '5%'
    },
    logoSImage: {
        marginTop: dimensions.heightOf(36),
        width: 80,
        height: 80,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    back: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
        alignSelf: 'center',
    },

});