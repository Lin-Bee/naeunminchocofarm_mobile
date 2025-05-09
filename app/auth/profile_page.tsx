import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { useLoginInfo, logout } from '../../redux/store';
import { useRouter } from 'expo-router';
import memberApi, { MemberImgDTO } from '../../apis/member_api';
import SetProfileImage from '~/components/SetProfileImage';
import { axiosInstance } from '../../apis/axios_instance';
import { apiHost } from '~/lib/app_config';

export default function ProfilePage() {
  const loginInfo = useLoginInfo();
  const router = useRouter();
  const [profileImg, setProfileImg] = useState<MemberImgDTO | null>(null);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 로그아웃 처리
  const handleLogout = async () => {
    await logout();
    Alert.alert('로그아웃되었습니다.');
    router.replace('/auth/login');
  };

  // 프로필 이미지 조회
  const loadProfileImg = async () => {
    try {
      const result = await memberApi.getProfileImg();
      setProfileImg(result);
    } catch (error) {
      console.error('프로필 이미지 불러오기 실패:', error);
      Alert.alert('프로필 이미지 로드 실패');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loginInfo) {
      loadProfileImg();
    }
  }, [loginInfo]);

  // 서버에서 사용할 이미지 URL 구성
  const getProfileImageUrl = (): string | null => {
    if (previewUri) return previewUri;
    if (profileImg?.attachedFileName) {
      return `${apiHost}/uploads/${profileImg.attachedFileName}`;
    }
    return null;
  };

  // 프로필 이미지 변경 처리
  const handleImageChange = async (uri: string) => {
    try {
      setPreviewUri(uri);

      // 1. 이미지 업로드
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      } as any);

      const uploadRes = await axiosInstance.post<{
        originFileName: string;
        attachedFileName: string;
      }>('/member/profile-img/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { originFileName, attachedFileName } = uploadRes.data;

      // 2. DB에 insert 또는 update
      if (profileImg?.imgId) {
        await memberApi.updateProfileImg({
          imgId: profileImg.imgId,
          memberId: profileImg.memberId,
          originFileName,
          attachedFileName,
        });
      } else {
        await memberApi.insertProfileImg({ originFileName, attachedFileName });
      }

      Alert.alert('프로필 이미지가 변경되었습니다.');
      setPreviewUri(null);
      loadProfileImg();
    } catch (error) {
      console.error('이미지 변경 실패:', error);
      Alert.alert('이미지 변경 실패', '다시 시도해주세요.');
    }
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
    <View className="flex-1 bg-white px-6 pt-12">
      {/* 프로필 이미지 */}
      <View className="items-center mb-8">
        {!loading && (
          <SetProfileImage imageUrl={getProfileImageUrl()} onChange={handleImageChange} />
        )}
      </View>

      {/* 프로필 정보 */}
      <View>
        <Text className="text-center mb-2 text-lg">{loginInfo.name}님 환영합니다</Text>
        <Text className="text-center mb-2 text-lg">아이디 : {loginInfo.loginId}</Text>
        <Text className="text-center mb-2 text-lg">연락처: {loginInfo.tell}</Text>
        <Text className="text-center mb-2 text-lg">email: {loginInfo.email}</Text>
      </View>

      {/* 로그아웃 버튼 */}
      <View className="mt-6 items-center">
        <Pressable onPress={handleLogout}>
          <Text className="font-bold text-lg text-red-500">Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}
