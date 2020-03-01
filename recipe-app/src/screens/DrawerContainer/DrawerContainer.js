import React from 'react';
import {Alert, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';
import {ADService} from "../../../ad-b2c-react-native/src/ADService";
import {adService} from "../../../ad-b2c-react-native";

export default class DrawerContainer extends React.Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.content}>
                <View style={styles.container}>
                    <MenuButton
                        title="ABB LOGIN"
                        source={require('../../../assets/icons/home.png')}
                        onPress={() => {
                            navigation.navigate('Login');
                            navigation.closeDrawer();
                        }}
                    />
                    <MenuButton
                        title="SWITCH ORGANIZATION"
                        source={require('../../../assets/icons/category.png')}
                        onPress={() => {
                            navigation.navigate('SwitchOrg');
                            navigation.closeDrawer();
                        }}
                    />
                    <MenuButton
                        title="GET TOKEN"
                        source={require('../../../assets/icons/home.png')}
                        onPress={async () => {
                            const tokenResult = await adService.getAccessTokenAsync();
                            Alert.alert(tokenResult.data);
                        }}
                    />
                    <MenuButton
                        title="CATEGORIES"
                        source={require('../../../assets/icons/category.png')}
                        onPress={() => {
                            navigation.navigate('Categories');
                            navigation.closeDrawer();
                        }}
                    />
                    <MenuButton
                        title="RECIPES"
                        source={require('../../../assets/icons/home.png')}
                        onPress={() => {
                            navigation.navigate('Recipes');
                            navigation.closeDrawer();
                        }}
                    />
                    <MenuButton
                        title="SEARCH"
                        source={require('../../../assets/icons/search.png')}
                        onPress={() => {
                            navigation.navigate('Search');
                            navigation.closeDrawer();
                        }}
                    />
                </View>
            </View>
        );
    }
}

DrawerContainer.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    })
};
