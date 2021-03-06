import {
  Image,
  Platform,
  StatusBar,
  Text,
  View,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme/appTheme";
import * as Animatable from "react-native-animatable";
import { Lotierror } from "./component/lottie";

const altura = Platform.OS === "ios" ? 22 : 25;

const EnviarCantidad = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { pinN } = route.params;
  const { titleMoneda } = route.params;
  const { abrev } = route.params;
  const { msg, mon } = route.params;
  const { pmsg } = route.params;
  const mnemonic = route.params?.memo;
  const mint = route.params?.mint;

  const [pinNumerico, setPinnumerico] = useState("");
  const numbers = pinNumerico;
  const last2 = numbers.slice(0, -1);
  //Modales
  const [anmt, setanmt] = useState("");
  const [vacioModal, setVacioModal] = useState(false);
  const [MostrarError, setError] = useState("");

  const ima = () => {
    if (pmsg == "Condorcoin") {
      return (
        <Image
          style={styles.imgmoneda}
          source={require("./img/billeteras/logocondor.png")}
        />
      );
    } else if (pmsg == "Solana") {
      return (
        <Image
          style={styles.imgmoneda}
          source={require("./img/billeteras/solana.png")}
        />
      );
    } else if (pmsg == "Tether") {
      return (
        <Image
          style={styles.imgmoneda}
          source={require("./img/billeteras/tether.png")}
        />
      );
    }
  };

  function borrar() {
    if (pinNumerico != "") {
      setPinnumerico(last2);
    } else if (pinNumerico == "") {
      console.log("====================================");
      console.log("No hay nada que borrar");
      console.log("====================================");
    }
  }

  function enviar_data(){
    if (pinNumerico != "" && pinNumerico != "0"){
      navigation.navigate("EnviarDireccion", {
        pinN: pinNumerico,
        titleMoneda: pmsg,
        abrev: mon,
        memo: mnemonic,
        mint: mint,
      })
    }else{
      setVacioModal(true);
      setError("Ingrese cantidad.");
      setanmt("fadeInDownBig");
      setTimeout(() => {
        setanmt("fadeOutUp");
        setTimeout(() => {
          setVacioModal(false);
        }, 100);
      }, 1850);
    }
  }

  console.log(pinNumerico);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar
        backgroundColor={'#FBF7FF'}
        barStyle={"dark-content"}
      />
      <Modal
        visible={vacioModal}
        transparent
        onRequestClose={() => setVacioModal(false)}
        hardwareAccelerated
      >
        <Animatable.View animation={anmt} duration={600}>
          <View style={styles.bodymodal}>
            <View style={styles.ventanamodal}>
              <View style={styles.icontext}>
                <View style={styles.contenedorlottie}>
                  <Lotierror/>
                </View>
              </View>
              <View style={styles.textnoti}>
                <View style={styles.contenedortext}>
                  <Text style={styles.texticon}>Error</Text>
                </View>
                <View>
                  <Text style={styles.notificacion}>{MostrarError}</Text>
                </View>
              </View>
            </View>
          </View>
        </Animatable.View>
      </Modal>
      <View style={styles.completo}>
        <View style={styles.titlecc}>
          <Text style={styles.titletx}>Enviar {pmsg}</Text>
        </View>
        <View style={styles.logorb}>{ima()}</View>
        <View style={styles.cajaatras}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btndo}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={altura} color="#440577" />
          </TouchableOpacity>
        </View>

        <View style={styles.textInput}>
          <Text style={styles.icnt}>Ingresar cantidad</Text>
          <View style={styles.txtAjustables}>
            {/* <ScrollView horizontal={true}> */}
            <Text
              style={styles.cantidadRecibe}
              numberOfLines={1}
              ellipsizeMode="tail"
              minimumFontScale={0.5}
              adjustsFontSizeToFit={true}
              allowFontScaling
            >
              {pinNumerico}
            </Text>
            {/* </ScrollView> */}
          </View>
        </View>
        <View style={styles.contCndr}>
          <Text style={styles.cndrR}>{mon}</Text>
        </View>
        <View style={styles.tecladoIngresar}>
          <View style={{ width: "55%" }}>
            {/* fila uno */}
            <View style={styles.numpadUno}>
              <TouchableOpacity
                onPress={() => setPinnumerico(`${pinNumerico}1`)}
              >
                <Text style={styles.number}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPinnumerico(`${pinNumerico}2`)}
              >
                <Text style={styles.number}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPinnumerico(`${pinNumerico}3`)}
              >
                <Text style={styles.number}>3</Text>
              </TouchableOpacity>
            </View>
            {/* fila dos */}
            <View style={styles.numpadDos}>
              <TouchableOpacity
                onPress={() => setPinnumerico(`${pinNumerico}4`)}
              >
                <Text style={styles.number}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPinnumerico(`${pinNumerico}5`)}
              >
                <Text style={styles.number}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPinnumerico(`${pinNumerico}6`)}
              >
                <Text style={styles.number}>6</Text>
              </TouchableOpacity>
            </View>
            {/* fila tres */}
            <View style={styles.numpadTres}>
              <TouchableOpacity
                onPress={() => setPinnumerico(`${pinNumerico}7`)}
              >
                <Text style={styles.number}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPinnumerico(`${pinNumerico}8`)}
              >
                <Text style={styles.number}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPinnumerico(`${pinNumerico}9`)}
              >
                <Text style={styles.number}>9</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.numpadCuatro}>
              <TouchableOpacity
                onPress={() => setPinnumerico(`${pinNumerico}.`)}
              >
                <Text style={styles.punto}>.</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPinnumerico(`${pinNumerico}0`)}
              >
                <Text style={styles.numberCero}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => borrar()}>
                <Icon name="backspace" style={styles.btnBorrar} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.logoMountain}>
            <Image
              style={styles.mountainLogo}
              source={require("./img/logocolor.png")}
            />
            <TouchableOpacity
              style={styles.ingresar}
              onPress={() =>
                enviar_data()
              }
            >
              <Text style={styles.txtingresar}>Ingresar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EnviarCantidad;
