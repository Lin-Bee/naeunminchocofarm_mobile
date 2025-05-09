import { router } from 'expo-router';
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Farm } from '~/apis/member_api';
import { getStatusStyle } from '~/utils/StatusStyle'
const memTomato = require('~/assets/images/content/ico-farm.png');
interface FarmListProps {
  farms: Farm[];
}

const FarmList = ({ farms }: FarmListProps) => {
  return (
    <ScrollView className="px-4 py-4" contentContainerStyle={{ flexGrow: 1 }}>
      {farms?.length > 0 ? (
        farms.map((farm, i) => (
          <Pressable key={farm.id || i}
                    onPress={() => router.push(`/(tabs)/(farms)/detail/${farm.id}`) }
                    style={styles.card} >
             <View style={styles.badgeContainer}>
              <Text style={getStatusStyle(farm.status)}>
                {farm.status}
              </Text>
            </View>

            {/* 본문 영역 */}
            <View className="flex-row items-center">
              <View className="mr-2">
                <Image source={memTomato} style={styles.farmImage} resizeMode="contain" />
              </View>

              <View className="ml-2">
                
                <Text className="mb-2 font-semibold text-2xl">{farm.name || `스마트팜 ${i + 1}`}</Text>
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
  farmImage: {
    width: 80,
    height: 80,
  },
});

export default FarmList;
