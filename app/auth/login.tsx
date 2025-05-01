import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, Alert } from 'react-native';
import { login } from '../../redux/store';
import { LoginData } from '../../apis/member_api';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

const LoginScreen: React.FC = () => {
  const router = useRouter();

  const [loginData, setLoginData] = useState<LoginData>({
    loginId: '',
    password: '',
  });

  type LoginKey = keyof LoginData;

  const handleLoginData = (value: string, loginKey: LoginKey) => {
    setLoginData({
      ...loginData,
      [loginKey]: value,
    });
  };

  const loginCheck = async () => {
    try {
      const loginInfo = await login(loginData);
      Alert.alert('환영합니다', `${loginInfo.name}님`);

      router.replace('/');
    } catch (error) {
      console.error('로그인 실패:', error);
      Alert.alert('로그인 실패', '아이디 또는 비밀번호를 다시 확인해주세요.');
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Image source={require('~/assets/images/content/img-login.png')} className="mb-6 h-60 w-64" />

      <View className="w-full text-left">
        <Text className="mb-6 font-bold text-2xl">Login</Text>
      </View>

      <TextInput
        placeholder="ID"
        className="mb-4 w-full rounded border border-gray-300 px-4 py-3"
        value={loginData.loginId}
        onChangeText={(text) => handleLoginData(text, 'loginId')}
      />

      <View className="mb-4 w-full">
        <TextInput
          placeholder="Password"
          secureTextEntry
          className="w-full rounded border border-gray-300 px-4 py-3"
          value={loginData.password}
          onChangeText={(text) => handleLoginData(text, 'password')}
        />
      </View>

      <Pressable className="mb-4 w-full items-center rounded bg-green-500 py-3" onPress={loginCheck}>
        <Text className="font-semibold text-white">로그인</Text>
      </Pressable>

      <Text className="mb-4 text-gray-400">OR</Text>

      <View className="w-full flex-row justify-center">
        <Text className="text-sm text-gray-500">홈페이지에서 신청 후 사용가능합니다</Text>
        <Pressable>
          <Text className="ml-3 text-sm text-green-500">문의하기</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
