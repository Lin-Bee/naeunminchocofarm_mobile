import React, { ReactNode, useRef } from 'react'
import Header from './Header'
import { Container } from './Container'
import { Animated, SafeAreaView } from 'react-native';

interface PageLayoutProps{
  children: ReactNode;
}

const PageLayout = ({children}:PageLayoutProps) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <>
      <SafeAreaView className="flex-1 font-regular">
        <Header scrollY={scrollY}/>
        <Container scrollY={scrollY}>
          {children}
        </Container>
      </SafeAreaView>
    </>
 );
}

export default PageLayout
