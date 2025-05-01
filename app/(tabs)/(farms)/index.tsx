import React, { useEffect, useState } from 'react';
import PageLayout from '~/components/PageLayout';
import FarmList from '~/farms/components/FarmList';
import memberApi from '~/apis/member_api';
import { useLoginInfo } from '~/redux/store';
import { View } from 'react-native';
import { router } from 'expo-router';
import Loading from '~/app/loading';


const FarmIndex = () => {
  const [farms, setFarms] = useState([]);
  const loginInfo = useLoginInfo();

  useEffect(() => {
    bindFarms();
  }, []);

  function bindFarms() {
    memberApi.getFarms()
      .then(res => {
        const farms = res.data;
        setFarms(farms);
      })
      .catch(e => {console.log(e.response);
        console.log('받은 로그인정보:',loginInfo)
        if (loginInfo == null){
          router.replace('/auth/login');
        }
      });
  }

  if (!loginInfo) {
    return <Loading title={'회원정보를 확인 중입니다.'} />;
  }

  return (
    <PageLayout>
      <View className='pt-16'>
        <FarmList farms={farms} />
      </View>
    </PageLayout>
  );
};

export default FarmIndex;
