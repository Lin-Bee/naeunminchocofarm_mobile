import { Keyboard, SafeAreaView, View } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SafeAreaView className="flex-1 font-regular">
        <View>
          {children}
          
        </View>
      </SafeAreaView>
    </>)
  ;
};


// 쓰고있음 ncf