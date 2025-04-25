import React, { useEffect, useState } from 'react';
import PageLayout from '../../../components/PageLayout';
import FarmList from '../../../farms/components/FarmList';
import memberApi from '../../../apis/memberApi';

const FarmIndex = () => {
  const [farms, setFarms] = useState([]);
  
  useEffect(() => {
    memberApi.getFarms()
      .then((res) => {
        setFarms(res.data);
      })
      .catch((err) => {
        console.error('스마트팜 목록 로딩 실패:', err);
      });
  }, []);

  return (
    <PageLayout>
      <FarmList farms={farms} />
    </PageLayout>
  );
};

export default FarmIndex;
