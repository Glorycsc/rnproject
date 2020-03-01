import React from 'react';
import {
    FlatList,
    Text,
    View,
    Image,
    TouchableHighlight,
    Alert,
} from 'react-native';
import styles from './styles';
import {categories} from '../../data/dataArrays';
import {getNumberOfRecipes} from '../../data/MockDataAPI';
import MenuImage from '../../components/MenuImage/MenuImage';
import {PickerView} from "@ant-design/react-native";

export default class CategoriesScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Categories',

        headerLeft: (
            <MenuImage
                onPress={() => {
                    navigation.openDrawer();
                }}
            />
        ),
        headerRight: (
            <MenuImage
                onPress={() => {
                    Alert.alert('筛选条件');
                }} s
            />
        )
    });


    onPressCategory = item => {
        const title = item.name;
        const category = item;
        this.props.navigation.navigate('RecipesList', {category, title});
    };

    renderCategory = ({item}) => (
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressCategory(item)}>
            <View style={styles.categoriesItemContainer}>
                <Image style={styles.categoriesPhoto} source={{uri: item.photo_url}}/>
                <Text style={styles.categoriesName}>{item.name}</Text>
                <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} recipes</Text>
            </View>
        </TouchableHighlight>
    );

    render() {
        return (
            <View>
                <FlatList
                    data={categories}
                    renderItem={this.renderCategory}
                    keyExtractor={item => `${item.id}`}
                />
            </View>
        );
    }
}
