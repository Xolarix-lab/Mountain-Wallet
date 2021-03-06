import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Appearance,
} from "react-native";
import { getBalance, getToken, readPublicKey } from "../../api";
import { styles } from "../theme/appTheme";
import { readMnemonic } from "../../api";

const Balance = ({ navigation }: { navigation: any }) => {
  const [mnemonic, setMnemonic] = useState("");

  async function leerMnemonic() {
    const palabras = readMnemonic();
    palabras.then((value) => {
      setMnemonic(value);
    });
  }

  leerMnemonic();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  //Funcion obtener balance solana
  const [balance, setBalance] = useState(0);

  async function obtenerBalance(publicKey: string) {
    getBalance(publicKey)
      .then((value) => {
        setBalance(value);
      })
      .catch((error) => {
        return "error";
      });
  }

  //Funcion de obtener balance splToken
  const [tokenBalance, setTokenBalance] = useState(0);

  async function obtenerTokenB(publicKey: string, mint: string) {
    const bala = getToken(publicKey, mint).then((value) => {
      setTokenBalance(value);
    });
  }

  //Funcion de obtener balance splToken USDT
  const [tokenBalanceUSDT, setTokenBalanceUSDT] = useState(0);

  async function obtenerTokenBUSDT(publicKey: string, mint: string) {
    const bala = getToken(publicKey, mint).then((value) => {
      setTokenBalanceUSDT(value);
    });
  }

  //funcion obtener llave publica
  const [pKey, setPKey] = useState("");
  readPublicKey().then((val) => {
    setPKey(val);
  });

  useEffect(() => {
    //obtener token de USDT(ESTO SOLO SE USA EN LA MAINNET)
    obtenerTokenBUSDT(pKey, "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");
    //obtener balance del token
    obtenerTokenB(pKey, "8XkS7ZDPR9zXcNcYR884tBScnQRyFcWRb7WcLtCR6zEZ");
    //obtener balance solanas
    obtenerBalance(pKey);
  });

  // // refresco
  const [refresh, setRefresh] = useState(false);

  const onRefre = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar
        backgroundColor={'#FBF7FF'}
        barStyle={"dark-content"}
      />
      <View style={styles.completo}>
        <Image
          style={styles.logocolorB}
          source={require("./img/logocolor.png")}
        />
        <SafeAreaView style={styles.balancecry}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={onRefre}
                tintColor="#5b298a"
                colors={["#5b298a", "#7e54a7"]}
              />
            }
            horizontal={false}
            showsVerticalScrollIndicator={false}
          >
            {/* CONDOR */}
            <TouchableOpacity
              style={styles.tablacry}
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate("Moneda", {
                  msg: "Condorcoin",
                  mon: "(CNDR)",
                  mint: "8XkS7ZDPR9zXcNcYR884tBScnQRyFcWRb7WcLtCR6zEZ",
                  memo: mnemonic,
                  moneda: "condorcoin",
                })
              }
            >
              <View style={styles.logocry}>
                <Image
                  style={styles.imgcry}
                  source={require("./img/billeteras/logocondor.png")}
                />
              </View>
              <View style={styles.nombrecry}>
                <Text style={styles.ntxtcry}>CONDORCOIN</Text>
              </View>
              <View style={styles.smcry}>
                <View style={styles.saldocry}>
                  <Text numberOfLines={1} style={styles.stxtcry}>
                    {tokenBalance}
                  </Text>
                </View>
                <View style={styles.monedacry}>
                  <Text style={styles.mtxtcry}>CNDR</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* SOLANA */}
            <TouchableOpacity
              style={styles.tablacry}
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate("Moneda", {
                  msg: "Solana",
                  mon: "(SOL)",
                  mint: "So11111111111111111111111111111111111111112",
                  memo: mnemonic,
                  moneda: "solana",
                })
              }
            >
              <View style={styles.logocry}>
                <Image
                  style={styles.imgcry}
                  source={require("./img/billeteras/solana.png")}
                />
              </View>
              <View style={styles.nombrecry}>
                <Text style={styles.ntxtcry}>SOLANA</Text>
              </View>
              <View style={styles.smcry}>
                <View style={styles.saldocry}>
                  <Text numberOfLines={1} style={styles.stxtcry}>
                    {balance}
                  </Text>
                </View>
                <View style={styles.monedacry}>
                  <Text style={styles.mtxtcry}>SOL</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* USDT */}
            <TouchableOpacity
              style={styles.tablacry}
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate("Moneda", {
                  msg: "Tether",
                  mon: "(USDT)",
                  mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
                  memo: mnemonic,
                  moneda: "tether",
                })
              }
            >
              <View style={styles.logocry}>
                <Image
                  style={styles.imgcry}
                  source={require("./img/billeteras/tether.png")}
                />
              </View>
              <View style={styles.nombrecry}>
                <Text style={styles.ntxtcry}>TETHER</Text>
              </View>
              <View style={styles.smcry}>
                <View style={styles.saldocry}>
                  <Text numberOfLines={1} style={styles.stxtcry}>
                    {tokenBalanceUSDT}
                  </Text>
                </View>
                <View style={styles.monedacry}>
                  <Text style={styles.mtxtcry}>USDT</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

export default Balance;
