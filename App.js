import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

const CustomButton = (props) => {

    const stylesCustomButton = StyleSheet.create({
        button: {
            width: props.width,
            height: 50,
            borderWidth: 2,
            borderColor: 'transparent',
            backgroundColor: props.color,
            borderRadius: 5,
            margin: 6,
            marginHorizontal: 10,
            alignSelf: 'center',
            opacity: 0.9,
        },
        view: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',

        },
        buttonText: {
            color: '#3b5998',
            fontSize: 16,
            fontWeight: 'bold',
        }
    });

    return (
        <TouchableOpacity style={stylesCustomButton.button} onPress={props.onPress}>
            <View style={stylesCustomButton.view}>
                <Text style={stylesCustomButton.buttonText}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );
}


const App = (props) => {
    const [bill, setBill] = useState('');
    const [tip, setTip] = useState(0);
    const [percent, setPercent] = useState('10');
    const [showResult, setShowResult] = useState(false);
    const [showCustomPercent, setShowCustomPercent] = useState(false);

    useEffect(() => {
        calculate();
    }, [percent, bill]);

    const handleChangeText = (enteredText) => {
        setBill(enteredText);
        if (!enteredText) {
            setTip(0);
            setShowResult(false);
        }
    }

    const handleOnPressCalculate = () => {
        if (bill) {
            calculate();
            setShowResult(true);
        }
    }

    const calculate = () => {
        let nBill = parseFloat(bill);
        let nPercent = parseFloat(percent);
        if (bill && percent) {
            setTip((nBill * nPercent / 100));
            setShowResult(true);
        }
        else {
            setTip(0);
            setShowResult(false);
        }
    }

    const handleOnPressCustomPercent = () => {
        setShowCustomPercent(!showCustomPercent);
    }

    const handleChangeTextCustomPercent = (enteredText) => {
        setPercent(enteredText);

        if (!enteredText) {
            setShowResult(false);
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? 'padding' : null} style={styles.container}>
            <Text style={[styles.textStyle, styles.textTitle]}>Tip Calculator</Text>
            <TextInput
                placeholder="What's the bill?"
                style={styles.input}
                clearButtonMode='always'
                underlineColorAndroid="transparent"
                keyboardType='numeric'
                color='#3b5998'
                onChangeText={handleChangeText}
                value={bill}
            />
            <View style={styles.percentContainer}>
                <CustomButton text='5%' color='white' width={50} onPress={() => setPercent('5')} />
                <CustomButton text='10%' color='white' width={50} onPress={() => setPercent('10')} />
                <CustomButton text='15%' color='white' width={50} onPress={() => setPercent('15')} />
                <CustomButton text='20%' color='white' width={50} onPress={() => setPercent('20')} />
            </View>

            <CustomButton text='Custom' color='white' width={150} onPress={handleOnPressCustomPercent} />

            {showCustomPercent &&
                <TextInput
                    placeholder="Percentage?"
                    style={styles.inputCustomPercentage}
                    clearButtonMode='always'
                    underlineColorAndroid="transparent"
                    keyboardType='numeric'
                    color='#3b5998'
                    onChangeText={handleChangeTextCustomPercent}
                    value={percent}
                />
            }

            {showResult &&
                <View style={styles.resultArea}>
                    <Text style={[styles.textStyle, styles.resultItemTitle]}>Bill</Text>
                    <Text style={[styles.textStyle, styles.resultItem]}>R$ {parseFloat(bill).toFixed(2)}</Text>

                    <Text style={[styles.textStyle, styles.resultItemTitle]}>Tip</Text>
                    <Text style={[styles.textStyle, styles.resultItem]}>R$ {tip.toFixed(2)} ({percent}%)</Text>

                    <Text style={[styles.textStyle, styles.resultItemTitle]}>Total</Text>
                    <Text style={[styles.textStyle, styles.resultItem]}>R$ {(parseFloat(bill) + tip).toFixed(2)}</Text>
                </View>
            }
        </KeyboardAvoidingView>
    );

}

export default React.memo(App);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3b5998',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
        color: 'white',
    },
    textTitle: {
        fontSize: 30,
        paddingTop: 10,
    },
    input: {
        height: 35,
        width: '70%',
        backgroundColor: 'white',
        borderBottomWidth: .5,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        borderRadius: 5,
        paddingHorizontal: 15,
    },
    inputCustomPercentage: {
        height: 35,
        width: 150,
        backgroundColor: 'white',
        borderBottomWidth: .5,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        borderRadius: 5,
        paddingHorizontal: 15,
    },
    percentContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
    },
    resultArea: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: '70%',
    },
    resultItemTitle: {
        color: '#3b5998',
        fontSize: 22,
        fontWeight: 'bold'
    },
    resultItem: {
        color: '#3b5998',
        fontSize: 18,
        paddingVertical: 10,
    }
});