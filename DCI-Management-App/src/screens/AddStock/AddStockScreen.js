import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import styles from './styles';
import MenuImage from "../../components/MenuImage/MenuImage";
import { auth, db } from '../Login/LoginScreen';
import { getFirestore, collection, addDoc, doc, getDocs } from 'firebase/firestore';

export default function AddStockScreen(props) {
  const [nama, setNama] = useState('');
  const [supplier, setSupplier] = useState('');
  const [jumlah, setJumlah] = useState(0);
  const [keterangan, setKeterangan] = useState('');
  const [barangBaru, setBarangBaru] = useState(true);
  const [isNamaActive, setIsNamaActive] = useState(false); 
  const [isSupplierActive, setIsSupplierActive] = useState(false); 
  const [namaBarangRekomendasi, setNamaBarangRekomendasi] = useState([]);
  const [supplierRekomendasi, setSupplierRekomendasi] = useState([]);
  const [namaBarangList, setNamaBarangList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);

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

  const fetchInventory = async () => {
    try {
      const inventorySnapshot = await getDocs(collection(db, 'Inventory'));
      const namaBarangArray = [];
      inventorySnapshot.forEach((doc) => {
        const data = doc.data();
        const namaBarang = data?.NamaBarang;
        if (namaBarang) {
          namaBarangArray.push(namaBarang);
        }
      });
      namaBarangArray.sort();
      setNamaBarangList(namaBarangArray);
      //console.log('Nama Barang dalam Inventory:', namaBarangList);
    } catch (error) {
      console.log('Terjadi kesalahan saat mengambil data dari Firebase:', error);
    }
  };

  const fetchSupplier = async () => {
    try {
      const supplierSnapshot = await getDocs(collection(db, 'Supplier'));
      const supplierArray = [];
      const PTArray = [];
      const mixArray = [];
      supplierSnapshot.forEach((doc) => {
        const data = doc.data();
        const namaSupplier = data?.NamaSupplier;
        if (namaSupplier) {
          supplierArray.push(namaSupplier);
        }
        const namaPT = data?.NamaPT;
        if (namaPT) {
          PTArray.push(namaPT);
        }
      });
      supplierArray.forEach((supplier, index) => {
        const PT = PTArray[index] || '';
        const mix = `${supplier} - ${PT}`;
        mixArray.push(mix);
      });
      setSupplierList(mixArray);
      //console.log('Data Supplier:', supplierList);
    } catch (error) {
      console.log('Terjadi kesalahan saat mengambil data dari Firebase:', error);
    }
  };  
  
  useEffect(() => {
    fetchInventory();
    fetchSupplier();
  }, []);

  const handleAddStock = async () => {
    const data = {
      NamaBarang: nama,
      NamaSupplier: supplier,
      Jumlah: jumlah,
      Keterangan: keterangan,
      Status: barangBaru,
    };
  
    try {
      const docRef = await addDoc(collection(db, 'Inventory'), data);
      console.log('Data berhasil disimpan di Firestore dengan ID:', docRef.id);
    } catch (error) {
      console.log('Terjadi kesalahan saat menyimpan data ke Firestore:', error);
    }
  
    setNama('');
    setSupplier('');
    setJumlah(0);
    setKeterangan('');
  
    if (!barangBaru) {
      setBarangBaru(true);
    }
  
    navigation.navigate('Home');
  };    

  const handleCancel = () => {
    setNama('');
    setSupplier('');
    setJumlah(0);
    setKeterangan('');

    if (!barangBaru) {
      setBarangBaru(true);
      setBarangSisa(false);
    }
    
    navigation.navigate('Home');
  };

  const handleIncreaseJumlah = () => {
    if (jumlah === '') {
      setJumlah(1);
    } else {
      setJumlah(jumlah + 1);
    }
  };
  
  const handleDecreaseJumlah = () => {
    if (jumlah > 0) {
      setJumlah(jumlah - 1);
    }
  };

  const handleNamaChange = (text) => {
    setNama(text);
    let filteredNamaBarang = namaBarangList.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    if (text === '') {
      filteredNamaBarang = [];
    }
    setNamaBarangRekomendasi(filteredNamaBarang);
  };
  
  const handleSupplierChange = (text) => {
    setSupplier(text);
    let filteredSupplier = supplierList.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    if (text === '') {
      filteredSupplier = [];
    }
    setSupplierRekomendasi(filteredSupplier);
  };
  

  const renderNamaBarangRekomendasi = ({ item }) => (
    <TouchableOpacity onPress={() => setNama(item)}>
      <Text style={styles.rekomendasiText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderSupplierRekomendasi = ({ item }) => (
    <TouchableOpacity onPress={() => setSupplier(item)}>
      <Text style={styles.rekomendasiText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nama Barang"
        value={nama}
        onChangeText={handleNamaChange}
        autoCompleteType="off"
        autoCorrect={false}
        dataDetectorTypes="none"
        spellCheck={false}
        onFocus={() => setIsNamaActive(true)}
        onBlur={() => setIsNamaActive(false)}
      />
      {isNamaActive && namaBarangRekomendasi.length > 0 && (
        <FlatList
          data={namaBarangRekomendasi}
          renderItem={renderNamaBarangRekomendasi}
          keyExtractor={(item) => item}
          style={styles.rekomendasiContainer}
          keyboardShouldPersistTaps="always"
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Nama Supplier - PT Supplier"
        value={supplier}
        onChangeText={handleSupplierChange}
        autoCompleteType="off"
        autoCorrect={false}
        dataDetectorTypes="none"
        spellCheck={false}
        onFocus={() => setIsSupplierActive(true)}
        onBlur={() => setIsSupplierActive(false)}
      />
      {isSupplierActive && supplierRekomendasi.length > 0 && (
        <FlatList
          data={supplierRekomendasi}
          renderItem={renderSupplierRekomendasi}
          keyExtractor={(item) => item}
          style={styles.rekomendasiContainer}
          keyboardShouldPersistTaps="always"
        />
      )}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => {
          setBarangBaru(!barangBaru);
        }}
      >
        <Text style={styles.checkboxText}>Barang Baru?</Text>
        <Text style={styles.checkboxIcon}>{barangBaru ? '✓' : ''}</Text>
      </TouchableOpacity>
      <View style={styles.jumlahContainer}>
        <Text style={styles.jumlahText}>Jumlah</Text>
        <View style={styles.jumlahContainer2}>
          <TouchableOpacity style={styles.jumlahButton} onPress={handleIncreaseJumlah}>
            <Text style={styles.jumlahButtonText}>+</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.jumlahInput}
            value={jumlah.toString()}
            onChangeText={(text) => setJumlah(parseInt(text) || '')}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.jumlahButton} onPress={handleDecreaseJumlah}>
            <Text style={styles.jumlahButtonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        style={styles.additionalInfoInput}
        placeholder="Keterangan Tambahan"
        value={keterangan}
        onChangeText={setKeterangan}
        multiline={true}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddStock}>
        <Text style={styles.addButtonText}>Add Stock</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}