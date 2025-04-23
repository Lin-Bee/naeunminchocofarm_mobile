import { useRouter, usePathname } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({title}) {
  const router = useRouter();
  const pathname = usePathname();

  const hideBackButtonPages = [
    '/(tabs)/(home)',
    '/(tabs)/(farms)',
    '/(tabs)/(setting)',
  ];
  const showBackButton = !hideBackButtonPages.includes(pathname);

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white">
      <View className="flex-row items-center">
        {showBackButton && (
          <Pressable onPress={() => router.back()} className="mr-2">
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
        )}
        <Text className="text-lg font-bold">{title}</Text>
      </View>

      <View className="flex-row space-x-4">
        <Ionicons className='mr-2' name="notifications-outline" size={24} color="black" />
        <Pressable onPress={()=>{router.push('/login')}}>
          <Ionicons name="person-outline" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}
