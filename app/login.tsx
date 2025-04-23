import { View, Text, TextInput, Pressable, Image } from 'react-native';
import React from 'react';

const LoginScreen = () => {
  return (
    <>
      <View className="flex-1 justify-center items-center px-6 bg-white">
        <Image
          source={require('../assets/content/img-login.png')}
          className="mb-6 w-64 h-60"
        />

        {/* Login 텍스트 */}
        <Text className="text-2xl font-bold mb-6">Login</Text>

        {/* 이메일 입력 */}
        <TextInput
          placeholder="ID"
          className="w-full border border-gray-300 rounded px-4 py-3 mb-4"
        />

        <View className="w-full justify-between items-center mb-4">
          <TextInput
            placeholder="Password"
            secureTextEntry
            className="w-full border border-gray-300 rounded px-4 py-3"
          />
        </View>

        {/* 로그인 버튼 */}
        <Pressable className="w-full bg-blue-600 rounded py-3 items-center mb-4">
          <Text className="text-white font-semibold">Login</Text>
        </Pressable>

        {/* 구분선 */}
        <Text className="text-gray-400 mb-4">OR</Text>

        <View className="w-full flex-row justify-center">
          <Text className="text-sm text-gray-500">
            홈페이지에서 신청 후 사용가능합니다
          </Text>
          <Pressable><Text className="ml-3 text-sm text-blue-500">문의하기</Text></Pressable>
        </View>

      </View>
    </>
  );
};

export default LoginScreen;
