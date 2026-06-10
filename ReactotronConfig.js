import Reactotron from 'reactotron-react-native';

const reactotron = Reactotron.configure({
  name: 'newBrokerageApp',
  // host: '192.168.1.3',
  host: "192.168.1.12",
})
  .useReactNative({
    // Capture axios/fetch traffic in the Reactotron timeline.
    networking: {
      ignoreUrls: /symbolicate|logs|generate_204/,
    },
  })
  .connect();

reactotron.clear?.();

// Expose for quick logging anywhere: console.tron.log(...)
console.tron = reactotron;

export default reactotron;
