import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Animated, {
  makeMutable,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import {ReanimatedScrollEvent} from 'react-native-reanimated/lib/typescript/hook/commonTypes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  stickyItemContainer: {
    zIndex: 1,
    padding: 32,
    backgroundColor: 'yellow',
  },
  itemContainer: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

const scrollPosition: SharedValue<number> = makeMutable(0);

function StickyItem() {
  const stickyStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: scrollPosition.get(),
        },
      ],
    };
  });

  return (
    <Animated.View
      key={'sticky'}
      style={[styles.stickyItemContainer, stickyStyle]}>
      <Text style={styles.itemText}>{'STICKY'}</Text>
    </Animated.View>
  );
}

function ScrollSandbox() {
  const handleScroll = useAnimatedScrollHandler(
    (event: ReanimatedScrollEvent) => {
      scrollPosition.set(event.contentOffset.y);
    },
    [],
  );

  return (
    <Animated.ScrollView onScroll={handleScroll}>
      <StickyItem />
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemText}>{item}</Text>
        </View>
      ))}
    </Animated.ScrollView>
  );
}

const items = Array.from({length: 50}, (_, i) => `Item ${i + 1}`);
const App = () => {
  return (
    <SafeAreaView>
      <ScrollSandbox />
    </SafeAreaView>
  );
};

export default App;
