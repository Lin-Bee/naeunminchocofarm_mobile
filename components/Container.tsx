import { Animated, Keyboard, ScrollView, View } from 'react-native';

interface ContainerProps{
  children:React.ReactNode,
  scrollY:Animated.Value;
}

export const Container = ({ children, scrollY }: ContainerProps) => {
  return (
    <>
      <Animated.ScrollView 
        scrollEventThrottle={4}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset:{ y :scrollY}}}],
          {useNativeDriver:false}
        )}>
        <View>
          {children}
        </View>
      </Animated.ScrollView>
    </>
    )
  ;
};
