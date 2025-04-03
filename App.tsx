import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/login/index.tsx';
import WorkOrder from './src/screens/workOrder/index.tsx';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="WorkOrder" component={WorkOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
