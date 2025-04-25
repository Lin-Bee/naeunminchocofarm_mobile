import { useRouter, usePathname } from 'expo-router';
import { View, Text, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


interface HeaderProps{
  scrollY:Animated.Value;
}

export default function Header({scrollY}:HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const headerBgColor = scrollY.interpolate({
    inputRange:[0,100],
    outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
    extrapolate: 'clamp',
  })


  const hideBackButtonPages = [
    '/(tabs)/(home)/index.jsx',
    '/(tabs)/(farms)/index.jsx',
    '/(tabs)/(setting)/index.jsx',
  ];
  const showBackButton = !hideBackButtonPages.includes(pathname);

  return (
    <Animated.View className="absolute bg-inherit z-50">
      <View className='w-full flex-row items-center justify-between px-4 py-5 '>
        <View className="flex-row items-center">
          {showBackButton && (
            <Pressable onPress={() => router.back()} className="mr-2">
              <Ionicons name="chevron-back" size={28} color="black" />
            </Pressable>
          )}
          <Text className="text-2xl font-bold">title</Text>
        </View>

        <View className="flex-row">
          <Ionicons className='mr-2' name="notifications-outline" size={28} color="black" />
          <Pressable onPress={()=>{router.push('/login')}}>
            <Ionicons name="person-outline" size={28} color="black" />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}
