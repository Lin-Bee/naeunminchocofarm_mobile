import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
      <>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: tabStyles.bar
          }}>
          <Tabs.Screen
            name="(home)"
            options={{
              tabBarButton: (props) => (
                <Pressable {...props} className="flex-1 items-center justify-end pt-2">
                  <Ionicons name="home-outline" size={24} color="#ccc" />
                  <Text className="mt-1 text-xs text-gray-400">HOME</Text>
                </Pressable>
              ),
            }}
          />

          <Tabs.Screen
            name="(farms)"
            options={{
              tabBarButton: (props) => (
                <View className="relative flex-1 items-center justify-end z-50">
                  <View className="absolute -top-5 h-[80px] w-[80px] items-center justify-center rounded-full bg-white z-40 shadow-md">
                    
                    <Pressable
                      onPress={props.onPress} 
                      accessible
                      accessibilityRole="button"
                      className="h-[70px] w-[70px] items-center justify-center rounded-full bg-green-600 shadow-xl z-50"
                    >
                      <Ionicons name="leaf" size={24} color="#fff" />
                      <Text className="mt-1 text-[10px] font-semibold text-white">MY FARM</Text>
                    </Pressable>

                  </View>
                </View>
              ),
            }}
          />


          <Tabs.Screen
            name="(setting)"
            options={{
              tabBarButton: (props) => (
                <Pressable {...props} className="flex-1 items-center justify-end pt-2">
                  <Ionicons name="settings-outline" size={24} color="#ccc" />
                  <Text className="mt-1 text-xs text-gray-400">SETTING</Text>
                </Pressable>
              ),
            }}
          />
        </Tabs>
      </>
  );
}

const tabStyles = StyleSheet.create({
  bar: {
    position: 'absolute',
    height: 60,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'visible',
  },
});