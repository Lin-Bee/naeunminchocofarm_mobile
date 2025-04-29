import { Pressable, Text, View } from 'react-native';
import HomeTop from './HomeTop';
import HomeCard from './HomeCard';
import { useLoginInfo } from '~/redux/store';
import { useRouter } from 'expo-router';
import { Farm } from '~/apis/member_api';
import HomeBottom from './HomeBottom';
import HomeAlert from './HomeAlert';
const farmImage = require('~/assets/images/content/ico-m-sec2-1.png');

interface MainScreenProps {
  farms:Farm[];
  total?:number;
  warning?:number;
}

const MainScreen = ({farms, total, warning}:MainScreenProps) => {
  const loginInfo = useLoginInfo();
  const router = useRouter();

  return (
    <>
      <View>
        <HomeTop name={String(loginInfo?.name ?? '')} />

        <View className="mt-4 space-y-3 px-4">
          <View className="mb-4 flex-row justify-between space-x-2">
            <HomeCard
              title="운영 농장 수"
              value={String(total)}
              unit="개"
              colorType="green"
            />
            <HomeCard
              title="이슈 발생"
              value={String(warning)}
              unit="건"
              colorType="warning"
            />
          </View>
        </View>

        <View className="mb-4 mt-4 space-y-3 px-4">
          <View className="align-center flex-row justify-between">
            <Text className="semibold mb-2 font-semibold text-xl">내 농장 리스트</Text>
            <Pressable onPress={() => router.push('(farms)')}>
              <Text>전체 보기 +</Text>
            </Pressable>
          </View>

          {/* here */}
          {farms.length === 0 ? (
            <Text>등록된 농장이 없습니다.</Text>
          ) : (
            farms.map((farm) => (
              <Pressable key={farm.id} className="p-2 border rounded mb-2">
                <Text className="font-bold">{farm.name}</Text>
                <Text>상태: {farm.status}</Text>
              </Pressable>
            ))
          )}
          {/* here */}
        </View>

        <HomeAlert/>

        <HomeBottom />
      </View>
    </>
  );
};

export default MainScreen;
