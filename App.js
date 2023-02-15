import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [numero, setNumero] = useState("00:00:00");
  const [botao, setBotao] = useState("INICIAR");
  const [ultimo, setUltimo] = useState(null);

  function iniciar() {
    if (timer !== null) {
      clearInterval(timer);

      timer = null;

      setBotao("INICIAR");
    } else {
      timer = setInterval(() => {
        ss++;

        if (ss == 60) {
          ss = 0;
          mm++;
        }

        if (mm == 60) {
          mm = 0;
          hh++;
        }

        let format =
          (hh < 10 ? "0" + hh : hh) +
          ":" +
          (mm < 10 ? "0" + mm : mm) +
          ":" +
          (ss < 10 ? "0" + ss : ss);

        setNumero(format);
      }, 1000);

      setBotao("PARAR");
    }
  }

  function limpar() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }

    setUltimo(numero);
    setNumero("00:00:00");

    ss = 0;
    mm = 0;
    hh = 0;

    setBotao("INICIAR");
  }

  return (
    <View style={styles.container}>
      <Image source={require("./assets/crono.png")} />
      <Text style={styles.tempo}>{numero}</Text>
      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.btn} onPress={iniciar}>
          <Text style={styles.btnTexto}>{botao}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={styles.btnTexto}>LIMPAR</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerTempo}>
        <Text style={styles.tempoFinal}>
          {ultimo ? "Último tempo: " + ultimo : ""}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00aeef",
    alignItems: "center",
    justifyContent: "center",
  },
  tempo: {
    marginTop: -170,
    fontSize: 45,
    fontWeight: "bold",
    color: "#fff",
  },
  containerButtons: {
    flexDirection: "row",
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 50,
    margin: 17,
    borderRadius: 9,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#525252",
  },
  containerTempo: {
    marginTop: 50,
  },
  tempoFinal: {
    fontSize: 25,
    color: "#fff",
  },
});
