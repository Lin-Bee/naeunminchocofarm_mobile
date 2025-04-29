import PageLayout from 'components/PageLayout';
import MainScreen from '~/home/components/MainScreen';
import React, { useEffect, useState } from 'react';
import memberApi from '~/apis/member_api';
import { useLoginInfo } from '~/redux/store';

const AppHome = () => {
  const [farms, setFarms] = useState([]);
  const [summary, setSummary] = useState({ total: 0, warning: 0 });
  const loginInfo = useLoginInfo();

  useEffect(() => {
    bindFarms();
  }, []);

  function bindFarms() {
    memberApi.getFarms()
      .then(res => {
        const farms = res.data;
        console.log('받은 farms:', res.data);
        console.log('farms:', res);
        setFarms(farms);
        const total = farms.length;
        const warning = farms.filter((x:any) => x.status === '경고').length;
        setSummary({ total, warning });
      })
      .catch(e => {console.log('받은 farms:', e.response);
        console.log(loginInfo)
      });
  }
  return (
    <PageLayout>
      <MainScreen farms={farms} total={summary.total} warning={summary.warning}/>
    </PageLayout>
  );
};

export default AppHome;
