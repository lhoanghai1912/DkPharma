import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/login/login_index.tsx';
import WorkOrderScreen from './src/screens/workOrder/workOrder_index.tsx';
import MenuScreen from './src/screens/menu/menu_index.tsx';
import TransferScreen from './src/screens/transfer/transfer_index.tsx';
import UserInfo from './src/screens/userInfo/UserInfo.tsx';

type RootStackParamList = {
  Login: undefined;
  WorkOrder: undefined;
  Menu: undefined;
  Transfer: undefined;
  UserInfo: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login" //Set default screen
        screenOptions={{
          headerShown: false, // Tắt header toàn app
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="WorkOrder" component={WorkOrderScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Transfer" component={TransferScreen} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
