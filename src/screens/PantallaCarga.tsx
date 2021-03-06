import React, { useState } from "react";
import { View, Appearance, SafeAreaView, StatusBar } from "react-native";
import { readMnemonic, createAccount, fetchSecret, saveUser } from "../../api";
import { useTheme } from "react-native-paper";
import { styles } from "../theme/appTheme";
import { Lotiecarga, LotiecargaDark } from "./component/lottie";

const PantallaCarga = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  //Detecta el modo del sistema
  // const [theme, setTheme] = useState(Appearance.getColorScheme());
  // Appearance.addChangeListener((scheme) => {
  //   setTheme(scheme.colorScheme);
  // });
  // const { colors } = useTheme();

  const [palabras, setPalabras] = useState("");

  async function leerMnemonic() {
    const mnemonic = readMnemonic();
    mnemonic.then((value) => {
      setPalabras(value);
    });
  }

  leerMnemonic();

  //Crear cuenta
  async function crearCuenta(mnemonic: string) {
    const acc = createAccount(mnemonic);
    fetchSecret(mnemonic);
    acc.then((value) => {
      setTimeout(() => {
        navigation.navigate("Barra");
      }, 2000);
    });
  }

  setTimeout(() => {
    crearCuenta(palabras);
  }, 2000);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar
        backgroundColor={'#FBF7FF'}
        barStyle={"dark-content"}
      />
      <View
        style={[
          styles.completo,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Lotiecarga />
      </View>
    </SafeAreaView>
  );
};

export default PantallaCarga;
