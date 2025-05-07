import React, { useEffect } from 'react';
import { View, Image, Alert, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTailwind } from 'tailwind-rn';

type SetProfileImageProps = {
  imageUrl?: string | null;
  onChange?: (uri: string) => void;
};

const SetProfileImage = ({ imageUrl, onChange }: SetProfileImageProps) => {
  const tailwind = useTailwind();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('권한 오류', '사진 접근 권한이 필요합니다.');
        }
      }
    })();
  }, []);

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1],
      });

      if (!result.canceled && result.assets?.length > 0) {
        const uri = result.assets[0].uri;
        if (uri && onChange) {
          onChange(uri);
        }
      } else {
        Alert.alert('이미지 선택이 취소되었습니다.');
      }
    } catch (error) {
      console.error('이미지 선택 오류:', error);
      Alert.alert('이미지 선택 중 오류가 발생했습니다.');
    }
  };

  return (
    <TouchableOpacity onPress={handlePickImage} activeOpacity={0.8}>
      <View style={tailwind('items-center justify-center')}>
        <Image
          source={
            imageUrl && imageUrl.trim() !== ''
              ? { uri: imageUrl }
              : require('../assets/content/default_profile.png')
          }
          onError={(e) => {
            console.warn('이미지 로딩 실패:', imageUrl, e.nativeEvent.error);
          }}
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            backgroundColor: '#e5e7eb',
          }}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

export default SetProfileImage;
