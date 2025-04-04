import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/login/index.tsx';
import WorkOrderScreen from './src/screens/workOrder/index.tsx';
import MenuScreen from './src/screens/menu/menu.tsx';

type RootStackParamList = {
  Login: undefined;
  WorkOrder: undefined;
  Menu: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Tắt header toàn app
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="WorkOrder" component={WorkOrderScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
