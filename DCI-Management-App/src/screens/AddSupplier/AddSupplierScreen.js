import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import styles from './styles';
import MenuImage from "../../components/MenuImage/MenuImage";
import { auth, db } from '../Login/LoginScreen';
import { getFirestore, collection, addDoc, doc, getDocs } from 'firebase/firestore';

export default function AddStockScreen(props) {
  const [nama, setNama] = useState('');
  const [PT, setPT] = useState('');
  const [alamat, setAlamat] = useState('');
  const [noTelp, setNoTelp] = useState('');
  const [isPTActive, setIsPTActive] = useState(false);
  const [PTRekomendasi, setPTRekomendasi] = useState([]);
  const [PTList, setPTList] = useState([]);

  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        top: 0,
      },
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const fetchPT = async () => {
    try {
      const PTSnapshot = await getDocs(collection(db, 'Supplier'));
      const PTArray = [];
      PTSnapshot.forEach((doc) => {
        const data = doc.data();
        const namaPT = data?.NamaPT;
        if (namaPT) {
          PTArray.push(namaPT);
        }
      });
      PTArray.sort();
      setPTList(PTArray);
      //console.log('Nama PT Supplier dalam data:', PTList);
    } catch (error) {
      console.log('Terjadi kesalahan saat mengambil data dari Firebase:', error);
    }
  };
  
  useEffect(() => {
    fetchPT();
  }, []);

  const handleAddSupplier = async () => {
    const supplierRef = collection(db, 'Supplier');
    
    // Mengecek apakah namaSupplier sudah ada dalam database
    const supplierQuery = await getDocs(query(supplierRef, where('NamaSupplier', '==', nama)));
    if (!supplierQuery.empty) {
      console.log('Nama Supplier sudah ada dalam database');
      return; // Menghentikan proses jika sudah ada
    }
    
    // Mengecek apakah namaPT sudah ada dalam database
    const PTQuery = await getDocs(query(supplierRef, where('NamaPT', '==', PT)));
    if (!PTQuery.empty) {
      console.log('Nama PT sudah ada dalam database');
      return; // Menghentikan proses jika sudah ada
    }
  
    // Menambahkan data ke database
    const data = {
      NamaSupplier: nama,
      NamaPT: PT,
      NoTelp: noTelp,
      Alamat: alamat,
    };
  
    try {
      const docRef = await addDoc(supplierRef, data);
      console.log('Data berhasil disimpan di Firestore dengan ID:', docRef.id);
    } catch (error) {
      console.log('Terjadi kesalahan saat menyimpan data ke Firestore:', error);
    }
  
    setNama('');
    setPT('');
    setNoTelp('');
    setAlamat('');
  
    navigation.navigate('Home');
  };   

  const handleCancel = () => {
    setNama('');
    setPT('');
    setNoTelp('');
    setAlamat('');
    
    navigation.navigate('Home');
  };
  
  const handlePTChange = (text) => {
    setPT(text);
    let filteredPT = PTList.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    if (text === '') {
      filteredPT = [];
    }
    setPTRekomendasi(filteredPT);
  };

  const renderPTRekomendasi = ({ item }) => (
    <TouchableOpacity onPress={() => setPT(item)}>
      <Text style={styles.rekomendasiText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nama Supplier"
        value={nama}
        onChangeText={setNama}
      />
      <TextInput
        style={styles.input}
        placeholder="Nama PT Supplier"
        value={PT}
        onChangeText={handlePTChange}
        autoCompleteType="off"
        autoCorrect={false}
        dataDetectorTypes="none"
        spellCheck={false}
        onFocus={() => setIsPTActive(true)}
        onBlur={() => setIsPTActive(false)}
      />
      {isPTActive && PTRekomendasi.length > 0 && (
        <FlatList
          data={PTRekomendasi}
          renderItem={renderPTRekomendasi}
          keyExtractor={(item) => item}
          style={styles.rekomendasiContainer}
          keyboardShouldPersistTaps="always"
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="No. Telp"
        value={noTelp}
        onChangeText={setNoTelp}
      />
      <TextInput
        style={styles.additionalInfoInput}
        placeholder="Alamat"
        value={alamat}
        onChangeText={setAlamat}
        multiline={true}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddSupplier}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}