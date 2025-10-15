
import Navigator from "./src/navigators/bottomTab"
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  return (
    <NavigationContainer style={{ flex: 1, backgroundColor: "#000000" }} >
    <Navigator/>
    </NavigationContainer>

  );
}
