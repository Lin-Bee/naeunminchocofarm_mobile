import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { useLoginInfo, logout } from '../../redux/store'; // logout 추가
import { useRouter } from 'expo-router';

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
      <Text className="mb-4 font-bold text-2xl">프로필</Text>
      <Text className="mb-2 text-lg">id: {loginInfo.id}</Text>
      <Text className="mb-2 text-lg">roleName: {loginInfo.roleName}</Text>
      <Text className="mb-2 text-lg">roleFlag: {loginInfo.roleFlag}</Text>
      <Text className="mb-2 text-lg">loginId: {loginInfo.loginId}</Text>
      <Text className="mb-2 text-lg">name: {loginInfo.name}</Text>

      {/* 로그아웃 버튼 */}
      <View className="mt-6 flex-row">
        <Pressable onPress={handleLogout}>
          <Text className="font-bold text-lg text-red-500">Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}
