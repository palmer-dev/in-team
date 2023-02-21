import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Demande d'accès à votre caméra</Text>;
  }
  if (hasPermission === false) {
    return <Text>Veuillez donné accès à votre caméra</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.square_topright}>
      </View>
      <View style={styles.square_topright2}>
      </View>
      <View style={styles.square_topleft}>
      </View>
      <View style={styles.square_topleft2}>
      </View>
      <View style={styles.square_bottomleft}>
      </View>
      <View style={styles.square_bottomleft2}>
      </View>
      <View style={styles.square_bottomright}>
      </View>
      <View style={styles.square_bottomright2}>
      </View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Appuyez pour scanner à nouveau'} onPress={() => setScanned(false)} />}
     


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: "yellow"
  },
  square_topright:{
    position: 'absolute',
    left: "60%",
    top: "30%",
    zIndex: 10,
    width: 90,
    height: 10,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  square_topright2:{
    position: 'absolute',
    left: "81%",
    top: "30%",
    zIndex: 10,
    width: 10,
    height: 90,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10
  },
  square_topleft:{    
    position: 'absolute',
    right: "81%",
    top: "30%",
    zIndex: 10,
    width: 10,
    height: 90,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10},

    square_topleft2:{    
    position: 'absolute',
    right: "60%",
    top: "30%",
    zIndex: 10,
    width: 90,
    height: 10,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10},

    square_bottomleft:{
     position: 'absolute',
    right: "60%",
    bottom: "30%",
    zIndex: 10,
    width: 90,
    height: 10,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10},

    square_bottomleft2:{
     position: 'absolute',
    right: "81%",
    bottom: "30%",
    zIndex: 10,
    width: 10,
    height: 90,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
   },
   square_bottomright:{ 
    position: 'absolute',
    left: "81%",
    bottom: "30%",
    zIndex: 10,
    width: 10,
    height: 90,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
   },
    square_bottomright2:{ 
    position: 'absolute',
    left: "60%",
    bottom: "30%",
    zIndex: 10,
    width: 90,
    height: 10,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
   },
});
