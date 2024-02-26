import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, Easing, StyleSheet } from 'react-native';

interface FadingLoaderProps {
    setRunOnce: React.Dispatch<React.SetStateAction<boolean>>;
}
const FadingLoader: React.FC<FadingLoaderProps> = ({ setRunOnce }) => {
    const logoScale = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Logo animation
        Animated.timing(logoScale, {
            toValue: 1,
            duration: 1000, // Adjust the duration as needed
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();

        // Text animation
        Animated.timing(textOpacity, {
            toValue: 1,
            duration: 2000, // Adjust the duration as needed
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();

        const timeoutId = setTimeout(() => {
            setRunOnce(false);
        }, 4000);
    }, [logoScale, textOpacity]);

    return (
        <View style={styles.container}>
            {/* Animated Logo */}
            <Animated.Image
                source={require('./logo1.png')}
                style={[styles.image, { transform: [{ scale: logoScale }] }]}
            />

            {/* Animated Text */}
            <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
                Whole Market at One Place
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: -5,
    },
});

export default FadingLoader;
