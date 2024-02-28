import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Touchable,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import CustomButton from '../../utils/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import React, {useState} from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const CELL_COUNT = 4;

function Verification({route, navigation}) {
  // const PROPS = {...props};
  const {otp, email} = route.params;
  console.log(otp);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [PROPS = {...props}, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const NavigateToLogin = () => {
    if (value === otp) {
      navigation.navigate('passwordchange', {
        Email: email,
      });
    } else {
      ToastAndroid.show('Invalid Otp', ToastAndroid.SHORT);
    }
  };
  // const navigation = props.navigation;

  function AuthUserAndRedirect() {
    navigation.navigate('HomeStack');
  }

  return (
    <SafeAreaView>
      <FontAwesome
        name="arrow-left"
        size={17}
        color="#D10404"
        onPress={() => {
          navigation.goBack();
        }}
        style={{top: 10, left: 10, zIndex: 7}}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.Title}>Verification</Text>
        <Text style={styles.baseDescription}>
          Please enter the Verification code{'\n'}we sent to your email address
        </Text>
        <View style={styles.codeBody}>
          <CodeField
            ref={ref}
            {...PROPS}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          <CustomButton
            OnPRESS={() => NavigateToLogin()}
            btnTitleStyle={styles.btnTitleStyle}
            style={styles.outBody}
            title="Verify"
            bgColor="red"
          />
        </View>

        <TouchableOpacity style={styles.btnResendBody}>
          <Text style={styles.btnResendTitle}>Resend Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Verification;
