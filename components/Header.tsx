import { useRouter, usePathname } from 'expo-router';
import { View, Text, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLoginInfo } from '../redux/store'; //추가


interface HeaderProps{
  scrollY:Animated.Value;
}

export default function Header({scrollY}:HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const loginInfo = useLoginInfo(); //현재 로그인 정보

  const headerBgColor = scrollY.interpolate({
    inputRange:[0,100],
    outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
    extrapolate: 'clamp',
  })

  const cleanPathname = pathname.replace(/\/$/, '');
  const isWhiteTitle = cleanPathname === '/' || cleanPathname === '/home';


  const hideBackButtonPages = [
    '/',
    '/home',
    '/farms',
    '/setting',
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
    <Animated.View className="absolute bg-inherit z-50">
      <View className='w-full flex-row items-center justify-between px-4 py-5 '>
        <View className="flex-row items-center">
          {showBackButton && (
            <Pressable onPress={() => router.back()} className="mr-2">
              <Ionicons name="chevron-back" size={28} color="black" />
            </Pressable>
          )}
          <Text className={`text-2xl font-bold ${isWhiteTitle ? 'text-white' : 'text-black'}`}>
          title
        </Text>
        </View>

        <View className="flex-row">
        <Ionicons className='mr-2' name="notifications-outline" size={24} color="black" />
        <Pressable onPress={()=>{router.push('/auth/login')}}>
          <Ionicons name="person-outline" size={24} color="black" />
        </Pressable>
      </View>
      </View>
    </Animated.View>
  );
}
