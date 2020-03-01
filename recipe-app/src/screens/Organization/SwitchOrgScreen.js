import React from 'react';
import {
    FlatList,
    Text,
    View,
    Image,
    TouchableHighlight,
} from 'react-native';
import styles from './styles';
import {Button} from "@ant-design/react-native";
import {ListItem, SearchBar} from 'react-native-elements';
import MenuImage from '../../components/MenuImage/MenuImage';
import {
    getCategoryName,
    getRecipesByRecipeName,
    getRecipesByCategoryName,
    getRecipesByIngredientName
} from '../../data/MockDataAPI';

export default class SwitchOrgScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            headerRight: (
                <Button style={{color:'cyan'}}>完成</Button>
            ),
            headerTitle: (
                <Text style={{fontSize:20}}>切换组织</Text>
            )
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            data: []
        };
    }

    componentDidMount() {
        const {navigation} = this.props;
        navigation.setParams({
            handleSearch: this.handleSearch,
            data: this.getValue
        });
    }

    handleSearch = text => {
        var recipeArray1 = getRecipesByRecipeName(text);
        var recipeArray2 = getRecipesByCategoryName(text);
        var recipeArray3 = getRecipesByIngredientName(text);
        var aux = recipeArray1.concat(recipeArray2);
        var recipeArray = [...new Set(aux)];
        if (text == '') {
            this.setState({
                value: text,
                data: []
            });
        } else {
            this.setState({
                value: text,
                data: recipeArray
            });
        }
    };

    getValue = () => {
        return this.state.value;
    };

    onPressRecipe = item => {
        this.props.navigation.navigate('Recipe', {item});
    };

    renderRecipes = ({item}) => (
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
            <View style={styles.container}>
                <Image style={styles.photo} source={{uri: item.photo_url}}/>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
            </View>
        </TouchableHighlight>
    );

    render() {
        return (
            <View>
                <FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={this.state.data}
                    renderItem={this.renderRecipes}
                    keyExtractor={item => `${item.recipeId}`}
                />
            </View>
        );
    }
}
