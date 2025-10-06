import colors from '@/constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: colors.brand,
      tabBarInactiveTintColor: colors.inactive,
      tabBarStyle: {
        backgroundColor: colors.card,
      },
      headerShown: false,
      tabBarShowLabel: false,
    }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="brain"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="lightbulb-o" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="neurotransmitters"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="flask" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="emotions"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="heart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
} 