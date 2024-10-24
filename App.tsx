
import { NativeBaseProvider, StatusBar } from 'native-base';
import { Custom } from './src/style/custom';
import Rotas from './src/Rotas';

export default function App() {
  return (
    <NativeBaseProvider theme={Custom}>
      <StatusBar backgroundColor={Custom.colors.blue[800]} />
      <Rotas />
    </NativeBaseProvider>
  );
}