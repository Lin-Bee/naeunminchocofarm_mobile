import { router } from 'expo-router';
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Farm } from '~/apis/member_api';
const memTomato = require('~/assets/images/content/ico-farm.png');

interface FarmListProps {
  farms: Farm[];
}

const FarmList = ({ farms }: FarmListProps) => {
  const getStatusStyle = (status?: string) => {
    switch (status) {
      case '운영중':
        return { backgroundColor: '#D1FAE5', color: '#059669' }; 
      case '점검중':
        return { backgroundColor: '#FEF3C7', color: '#D97706' }; 
      case '폐쇄':
        return { backgroundColor: '#FECACA', color: '#DC2626' }; 
      default:
        return { backgroundColor: '#E5E7EB', color: '#6B7280' }; 
    }
  };
  
  return (
    <ScrollView className="px-4 py-4" contentContainerStyle={{ flexGrow: 1 }}>
      {farms?.length > 0 ? (
        farms.map((farm, i) => (
          <Pressable key={farm.id || i}
                    onPress={() => router.push(`/(tabs)/(farms)/detail/${farm.id}`) }
                    style={styles.card} >
             <View style={styles.badgeContainer}>
              <Text style={[styles.badge, getStatusStyle(farm.status)]}>
                {farm.status}
              </Text>
            </View>

            {/* 본문 영역 */}
            <View className="flex-row items-center">
              <View className="mr-2">
                <Image source={memTomato} style={styles.farmImage} resizeMode="contain" />
              </View>

              <View className="ml-2">
                
                <Text className="mb-2 font-bold text-lg">{farm.name || `스마트팜 ${i + 1}`}</Text>
                <Text className="text-sm text-gray-700">작물: {farm.cropName}</Text>
                <Text className="mt-1 text-sm text-gray-500">주소: {farm.address}</Text>
                <Text className="mt-1 text-sm text-gray-500">운영시작일: {farm.useDate}</Text>
              </View>
            </View>

            {/* 하단: 상세보기 버튼 */}
            <View className="mt-4 items-center">
              <Text className="font-semibold text-blue-600">GO DETAIL →</Text>
            </View>
          </Pressable>
        ))
      ) : (
        <View className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <Text className="text-center text-gray-600">운영 중인 스마트팜이 없습니다.</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 16,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  badge: {
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
    fontWeight: 'bold',
  },
  farmImage: {
    width: 80,
    height: 80,
  },
});

export default FarmList;
