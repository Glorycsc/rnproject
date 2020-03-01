import React from 'react';
import {
    FlatList,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    TouchableHighlight,
    Alert
} from 'react-native';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getIngredientName, getCategoryName, getCategoryById } from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';

import * as SecureStore from 'expo-secure-store';
import {LoginView, adService} from 'ad-b2c-react-native';

const { width: viewportWidth } = Dimensions.get('window');

export default class LoginScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTransparent: 'true',
            headerLeft: (
                <BackButton
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
            )
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0
        };
    }

    renderImage = ({ item }) => (
        <TouchableHighlight>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item }} />
            </View>
        </TouchableHighlight>
    );

    onPressIngredient = item => {
        var name = getIngredientName(item);
        let ingredient = item;
        this.props.navigation.navigate('Ingredient', { ingredient, name });
    };

    render() {
        const { navigation } = this.props;

        return (
            <LoginView
                appId="41ff4807-b364-4f45-a10b-e69d124d326d"
                // redirectURI="dataintegration://auth"
                redirectURI="http://localhost:3001"
                // redirectURI="cn.onmschina.partner.dataintegration.dataintegration%3A%2F%2Foauth%2Fredirect"
                // redirectURI="https://jwt.ms"
                tenant="dataintegration"
                loginPolicy="b2c_1a_signup_signin_phone"
                passwordResetPolicy="b2c_1a_signup_signin_phone"
                profileEditPolicy="b2c_1a_signup_signin_phone"
                // onSuccess={() => Alert.alert('登录成功'+adService.getAccessTokenAsync())}
                onSuccess={async () => {
                    const tokenResult = await adService.getAccessTokenAsync();
                    console.log('登录成功');
                    console.log(tokenResult.data);
                    navigation.navigate('Search');
                    Alert.alert('登录成功' + tokenResult.data);
                }}
                onFail={(reason) => Alert.alert(reason)}
                secureStore={SecureStore}
                // renderLoading={this.spinner}
            />
        );
    }
}
