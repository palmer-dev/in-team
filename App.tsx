import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation/index";
import SplashScreen from "./components/SplashScreen";
import { Provider } from "react-redux";
import { store } from "./redux";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [isLoadad, setIsLoaded] = React.useState(false);
  setTimeout(() => {
    setIsLoaded(true);
  }, 3500);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          {/* Splashscreen avant le login */}
          {!isLoadad ? (
            <SplashScreen />
          ) : (
            <>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </>
          )}
        </SafeAreaProvider>
      </Provider>
    );
  }
}
