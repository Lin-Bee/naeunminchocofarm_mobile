import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import Header from '~/components/Header';
import { Container } from '~/components/Container';
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store';



export default function TabLayout({ children }: { children: React.ReactNode }) {
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  //로그인이 필요한 탭 목록
  const protectedTabs = ['farms', 'home', 'setting'];

  //탭 접근 권한 확인 함수
  const checkAuthForTab = (tabName: string) => {
    if (protectedTabs.includes(tabName) && !auth.loginInfo) {
      console.log(`${tabName} 탭은 로그인이 필요합니다`);
      return false;
    }
    return true;
  };

  
  return (
      <>
        <Header/>
        <Container className="flex-1">
          {children}
        </Container>
        {/* footer */}
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {  //없어서 
              position: 'fixed',
              height: 60,
              backgroundColor: '#fff',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 10,
              overflow: 'visible'
            },
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
            listeners={{
              tabPress: (e) => {
                if (!checkAuthForTab('home')) {
                  e.preventDefault();
                  router.push('/auth/login');
                }
              }
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
            listeners={{
              tabPress: (e) => {
                if (!checkAuthForTab('farms')) {
                  e.preventDefault();
                  router.push('/auth/login');
                }
              }
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
            listeners={{
              tabPress: (e) => {
                if (!checkAuthForTab('setting')) {
                  e.preventDefault();
                  router.push('/auth/login');
                }
              }
            }}
          />
        </Tabs>
      </>
  );
}
