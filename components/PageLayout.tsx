import React, { ReactNode } from 'react'
import Header from './Header'
import { Container } from './Container'

interface PageLayoutProps{
  children: ReactNode;
}
const PageLayout = ({children}:PageLayoutProps) => {
  return (
    <>
      <Header />
      <Container>
        {children}
      </Container>
    </>
 );
}

export default PageLayout
