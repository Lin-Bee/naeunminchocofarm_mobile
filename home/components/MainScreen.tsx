import { Pressable, Text, View } from 'react-native';
import HomeTop from './HomeTop';
import HomeCard from './HomeCard';
import { useLoginInfo } from '~/redux/store';
import { useRouter } from 'expo-router';
import { Farm } from '~/apis/member_api';
import HomeBottom from './HomeBottom';
import HomeAlert from './HomeAlert';
import HomeFarm from './HomeFarm';
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

        <View className='px-4'>
          <View className="mt-4 space-y-3">
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

          <HomeFarm farms={farms}/>

          <HomeAlert/>

          <HomeBottom />
        </View>
      </View>
    </>
  );
};

export default MainScreen;
