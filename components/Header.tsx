import { useRouter, usePathname } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLoginInfo } from '../redux/store'; 

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const loginInfo = useLoginInfo(); 

  const hideBackButtonPages = [
    '/(tabs)/(home)',
    '/(tabs)/(farms)',
    '/(tabs)/(setting)',
  ];
  const showBackButton = !hideBackButtonPages.includes(pathname);

  const handleProfilePress = () => {
    if (loginInfo) {
      // 로그인 되어 있으면 profile_page로 이동
      router.push('/auth/profile_page');
    } else {
      // 로그인 안 되어 있으면 로그인 페이지로 이동
      router.push('/auth/login');
    }
  };

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white">
      <View className="flex-row items-center">
        {showBackButton && (
          <Pressable onPress={() => router.back()} className="mr-2">
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
        )}
        <Text className="text-lg font-bold">title</Text>
      </View>

      <View className="flex-row">
        <Ionicons className='mr-2' name="notifications-outline" size={24} color="black" />
        <Pressable onPress={()=>{router.push('/auth/login')}}>
          <Ionicons name="person-outline" size={24} color="black" />
        </Pressable>
      </View>

      <View className="flex-row">
        <Pressable onPress={()=>{router.push('/auth/profile_page')}}>
          <Ionicons name="person-outline" size={24} color="black" />
        </Pressable>
      </View>
      
    </View>
  );
}
