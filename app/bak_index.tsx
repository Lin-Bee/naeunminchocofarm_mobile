import { Stack, Link } from 'expo-router';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import NcfSubscriberTestComponent from '~/lib/websocket/NcfSubscriberTestComponent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/index.tsx" title="Home" />
        <NcfSubscriberTestComponent />
        <Link href={{ pathname: '/details', params: { name: 'Danny' } }} asChild>
          <Button title="Show Details" />
        </Link>
      </Container>
    </>
  );
}
