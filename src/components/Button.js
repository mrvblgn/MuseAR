import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../constants/color'
import { ScaledSheet } from "react-native-size-matters"

const Button = (props) => {
    const filledBgColor = props.color || COLORS.primary;
    const outlinedColor = COLORS.white;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? COLORS.white : COLORS.primary;

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{ backgroundColor: bgColor },
                ...props.style
            }}
            onPress={props.onPress}
        >
            <Text style={{ fontSize: '18@s', ... { color: textColor } }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = ScaledSheet.create({
    button: {
        paddingBottom: '16@s',
        paddingVertical: '10@s',
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: '12@s',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    }
})
export default Button