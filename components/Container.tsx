import { Keyboard, SafeAreaView, TouchableNativeFeedback } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 bg-white">{children}</SafeAreaView>
      </TouchableNativeFeedback>
    </>)
  ;
};


// 쓰고있음 ncf