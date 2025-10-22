import colors from '@/constants/colors';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{
      drawerActiveTintColor: colors.brand,
      drawerInactiveTintColor: colors.inactive,
      drawerStyle: {
        backgroundColor: colors.card,
      },
      headerShown: false,
      drawerLabelStyle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
      },
    }}>
      <Drawer.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="brain"
        options={{
          title: "Cérebro",
        }}
      />
      <Drawer.Screen
        name="neurotransmitters"
        options={{
          title: "Neurotransmissores",
        }}
      />
      <Drawer.Screen
        name="emotions"
        options={{
          title: "Emoções",
        }}
      />
      <Drawer.Screen
        name="saved"
        options={{
          title: "Capítulos Salvos",
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: "Perfil",
        }}
      />
    </Drawer>
  );
} 