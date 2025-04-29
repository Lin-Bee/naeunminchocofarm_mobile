import React, { useEffect, useState } from 'react';
import PageLayout from '~/components/PageLayout';
import FarmList from '~/farms/components/FarmList';
import memberApi from '~/apis/member_api';
import { useLoginInfo } from '~/redux/store';
import { View } from 'react-native';


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
      .catch(e => {console.log('받은 farms:', e.response);
        console.log(loginInfo)
      });
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
