import {createDrawerNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import RecipesScreen from '../screens/Recipes/RecipesScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import RecipeScreen from '../screens/Recipe/RecipeScreen';
import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import IngredientScreen from '../screens/Ingredient/IngredientScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';
import LoginScreen from "../screens/Login/LoginScreen";
import SwitchOrgScreen from "../screens/Organization/SwitchOrgScreen";

const MainNavigator = createStackNavigator(
    {
        Categories: CategoriesScreen,
        Recipes: RecipesScreen,
        Recipe: RecipeScreen, //食谱
        Login: LoginScreen, //食谱
        RecipesList: RecipesListScreen,
        Ingredient: IngredientScreen,
        Search: SearchScreen,
        SwitchOrg: SwitchOrgScreen,
        IngredientsDetails: IngredientsDetailsScreen
    },
    {
        initialRouteName: 'Categories',
        // headerMode: 'float',
        defaulfNavigationOptions: ({navigation}) => ({
            headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: 'center',
                alignSelf: 'center',
                flex: 1,
            }
        })
    }
);

const DrawerStack = createDrawerNavigator(
    {
        Main: MainNavigator
    },
    {
        drawerPosition: 'left',
        initialRouteName: 'Main',
        drawerWidth: 250,
        contentComponent: DrawerContainer
    }
);

export default AppContainer = createAppContainer(DrawerStack);

console.disableYellowBox = true;
