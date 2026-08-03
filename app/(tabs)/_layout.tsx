import { Tabs } from 'expo-router';

import { AppTabBar } from '@/components/navigation/app-tab-bar';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      backBehavior="history"
      tabBar={(props) => <AppTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="feed" options={{ title: 'Feed' }} />
      <Tabs.Screen name="discover" options={{ title: 'Discover' }} />
      <Tabs.Screen name="index" options={{ title: 'Studio' }} />
      <Tabs.Screen name="ai-lab" options={{ title: 'AI Lab' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="spaces" options={{ title: 'Spaces' }} />
    </Tabs>
  );
}
