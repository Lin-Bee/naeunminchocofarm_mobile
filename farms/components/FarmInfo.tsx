import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { Farm } from '~/apis/member_api';

interface FarmInfoProps {
  farm: Farm | undefined;
}

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

const FarmInfo = ({ farm }: FarmInfoProps) => {
  return (
    <View className='px-4'>
      <View className="bg-white rounded py-4" style={styles.underline}>
        <View className='flex-row items-center'>
          <View className='flex-row flex-end mb-8'>
            <Text style={[styles.badge, getStatusStyle(farm?.status)]}>
              {farm?.status} 
            </Text>
          </View>
          <Text className="items-center flex-row text-xs text-gray-400">
            <Text> {farm?.cropName}</Text>
          </Text>
        </View>
        <Text className="font-bold text-2xl mb-2">{farm?.name}</Text>
        
        <Text className="items-center flex-row text-xs text-gray-400">
          <Octicons name="location" size={16} />
          <Text> {farm?.address}</Text>
        </Text>
        <Text className="items-center flex-row text-xs text-gray-400">
          <MaterialIcons name="date-range" size={15} />
          <Text> {farm?.useDate}</Text>
        </Text>
        <Text className="text-xs items-center flex-row text-gray-400 ">
          <Octicons name="key" size={14} /> 
          <Text> {farm?.uuid}</Text>
        </Text>
      </View>
    </View>
  );
};

export default FarmInfo;

const styles = StyleSheet.create({
  underline:{
    borderBottomColor:'#333',
    borderBottomWidth:0.4
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
});

