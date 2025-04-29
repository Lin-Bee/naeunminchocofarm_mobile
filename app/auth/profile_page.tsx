import React from 'react';
import { View, Text, Pressable, Alert, SafeAreaView } from 'react-native';
import { useLoginInfo, logout } from '../../redux/store'; // logout 추가
import { useRouter } from 'expo-router';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; //imame-picker

export default function ProfilePage() {
  const loginInfo = useLoginInfo();
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); // 서버 요청 + SecureStore 삭제 + 스토어 초기화
    Alert.alert('로그아웃되었습니다.');
    router.replace('/auth/login'); // 로그인 화면으로 이동
  };

  if (!loginInfo) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Pressable onPress={() => router.push('/auth/login')}>
          <Text className="font-bold text-lg">로그인 정보가 없습니다.</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="mb-4 font-bold text-2xl">마이페이지</Text>
      <SafeAreaView>
        <View>
          
        </View>
      </SafeAreaView>
      <Text className="mb-2 text-lg">{loginInfo.name}님 안녕하세요</Text>
      <Text className="mb-2 text-lg">아이디: {loginInfo.loginId}</Text>
      <Text className="mb-2 text-lg">이메일: {loginInfo.email}</Text>
      <Text className="mb-2 text-lg">연락처: {loginInfo.tell}</Text>

      {/* 로그아웃 버튼 */}
      <View className="mt-6 flex-row">
        <Pressable onPress={handleLogout}>
          <Text className="font-bold text-lg text-red-500">Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}
