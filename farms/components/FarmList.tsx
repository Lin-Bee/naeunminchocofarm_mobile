import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
const memFarmer = require('~/assets/images/layout/mem-farmer.png');

interface Member {
  id: number;
  loginId: string;
  name: string;
  email: string;
  tell: string;
}
interface FarmBasicProps {
  id: number;
  uuidId: number;
  uuid: string;
  farmName: string;
  farmAddr: string;
  useDate: string;
  crop: string;
  status: string;
  member: Member;
}

interface FarmListProps {
  farms: FarmBasicProps[];
}

const getStatusColor = (status?: string) => {
  switch (status) {
    case '운영중': return 'bg-green-100 text-green-600';
    case '점검중': return 'bg-yellow-100 text-yellow-600';
    case '폐쇄': return 'bg-red-100 text-red-600';
    default: return 'bg-gray-200 text-gray-700';
  }
};

const FarmList = ({ farms }: FarmListProps) => {
  const router = useRouter();

  // 15번 help씨꺼 임시로 데려오기
  const filteredFarms = farms.filter(farm => farm.member?.id === 15);

  return (
    <ScrollView className="px-4 py-4" contentContainerStyle={{ flexGrow: 1 }}>
      {filteredFarms.length > 0 ? (
        filteredFarms.map((farm, i) => (
          <Pressable
            key={farm.id || i}
            onPress={() => router.push('/detail')}
            className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm relative"
          >
            <View className={`self-start rounded-full px-2 py-0.5 ${getStatusColor(farm.status)}`}>
              <Text className="text-xs font-semibold">{farm.status}</Text>
            </View>

            <View className="flex-row justify-between items-start mt-2">
              <View className="flex-1 pr-2">
                <Text className="font-semibold text-lg border-b pb-1">{farm.farmName || `스마트팜 ${i + 1}`}</Text>
                <Text className="text-sm text-gray-800 mt-1">작물 이름: {farm.crop}</Text>
                <Text className="text-sm text-gray-600 mt-1">주소: {farm.farmAddr}</Text>
                <Text className="text-sm text-gray-500 mt-1">운영 시작일: {farm.useDate}</Text>
              </View>

              {/* <Image source={memFarmer} /> */}
            </View>

            <View className="items-end pt-4">
              <Text className="text-sm font-semibold text-blue-600">상세보기</Text>
            </View>
          </Pressable>
        ))
      ) : (
        <View className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <Text className="text-center text-gray-600">운영 중인 스마트팜이 없습니다.</Text>
        </View>
      )}

          <Pressable
            onPress={() => router.push('/detail')}
            className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm relative"
          >
            <View className={`self-start rounded-full px-2 py-0.5 `}>
              <Text className="text-xs font-semibold">ddd</Text>
            </View>

            <View className="flex-row justify-between items-start mt-2">
              <View className="flex-1 pr-2">
                <Text className="font-semibold text-lg border-b pb-1">스마트팜 </Text>
                <Text className="text-sm text-gray-800 mt-1">작물 이름: </Text>
                <Text className="text-sm text-gray-600 mt-1">주소: </Text>
                <Text className="text-sm text-gray-500 mt-1">운영 시작일: </Text>
              </View>

              <Image
                source={memFarmer}
                className="w-12 h-12"
                resizeMode="contain"
              /> 
            </View>

            <View className="items-end pt-4">
              <Text className="text-sm font-semibold text-blue-600">상세보기</Text>
            </View>
          </Pressable>
    </ScrollView>
  );
};

export default FarmList;
