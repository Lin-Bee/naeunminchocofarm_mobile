import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import PageLayout from '~/components/PageLayout';
import FarmDetail from '~/farms/components/FarmDetail';


const detail = ({}) => {
  const { id } = useLocalSearchParams();
    
    return (
    <>
      <PageLayout>
        {id && <FarmDetail farmId={Number(id)} />}
      </PageLayout>
    </>
  )
}

export default detail