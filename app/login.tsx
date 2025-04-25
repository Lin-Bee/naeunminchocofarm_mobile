import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { api_login } from '../apis/memberApi';

const LoginScreen = () => {
  //우리 회원가입아이디랑 비번은 저거에욤
  const [loginData, setLoginData] = useState({
    loginId: '',
    password: '',
  });

  //두개만 받으니까 두개만 받게 변수
  type LoginKey = keyof typeof loginData;

  const handleLoginData = (value: string, loginKey: LoginKey) => {
    setLoginData({
      ...loginData,
      [loginKey]: value,
    });
  };

  const login = () => {
    api_login(loginData)
      .then((res) => {
        alert('환영합니다.' + loginData.loginId);
        const token = res.headers.authorization;
        console.log(token);
      })
      .catch((error) => {
        console.error(error);
        alert('로그인 실패');
      });
  };

  return (
    <>
      <View className="flex-1 items-center justify-center bg-white px-6 font-bold">
        <Image source={require('../assets/content/img-login.png')} className="mb-6 h-60 w-64" />

        <View className="w-full text-left">
          <Text className="mb-6 font-bold text-2xl">Login</Text>
        </View>

        <TextInput
          placeholder="ID"
          className="mb-4 w-full rounded border border-gray-300 px-4 py-3"
          value={loginData.loginId}
          onChangeText={(text) => handleLoginData(text, 'loginId')}
        />

        <View className="mb-4 w-full items-center justify-between">
          <TextInput
            placeholder="Password"
            secureTextEntry
            className="w-full rounded border border-gray-300 px-4 py-3"
            value={loginData.password}
            onChangeText={(text) => handleLoginData(text, 'password')}
          />
        </View>

        {/* 로그인 버튼 */}
        <Pressable
          className="mb-4 w-full items-center rounded bg-blue-600 py-3"
          onPress={() => {
            login();
          }}>
          <Text className="font-semibold text-white">로그인</Text>
        </Pressable>

        <Text className="mb-4 text-gray-400">OR</Text>

        <View className="w-full flex-row justify-center">
          <Text className="text-sm text-gray-500">홈페이지에서 신청 후 사용가능합니다</Text>
          <Pressable>
            <Text className="ml-3 text-sm text-blue-500">문의하기</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;
