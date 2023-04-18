import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ScrollView } from 'react-native';


//npx expo start

const Screen1 = () => {

  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [insertSuccess, setInsertSuccess] = useState("");
  const [readSuccess, setReadSuccess] = useState("");

  const [avatarPersonaje, setAvatarPersonaje] = useState("");
  const [especiePersonaje, setEspeciePersonaje] = useState("");
  const [estadoPersonaje, setEstadoPersonaje] = useState("");
  const [nombrePersonaje, setNombrePersonaje] = useState("");

  const [nickName, setNickName] = useState("");
  const [name, setName] = useState("");
  const [surnames, setSurname] = useState("");
  const [location, setLocation] = useState("");
  const [typeContract, setTypeContract] = useState("");
  const [hireDate, setHireName] = useState("");
  const [numSAP, setNumSAP] = useState("");
  const [idSAP, setIdSAP] = useState("");
  const [profile, setProfile] = useState("");
  const [imagen, setImagen] = useState("");

  const [InsertNickName, setInsertNickName] = useState("");
  const [InsertName, setInsertName] = useState("");
  const [InsertSurnames, setInsertSurnames] = useState("");
  const [InsertLocation, setInsertLocation] = useState("");
  const [InsertTypeContract, setInsertTypeContract] = useState("");
  const [InsertHireDate, setInsertHireDate] = useState("");
  const [InsertNumSAP, setInsertNumSAP] = useState("");
  const [InsertIdSAP, setInsertIdSAP] = useState("");
  const [InsertProfile, setInsertProfile] = useState("");

  const [PutName, setPutName] = useState("");
  const [PutSurnames, setPutSurnames] = useState("");
  const [PutLocation, setPutLocation] = useState("");
  const [PutTypeContract, setPutTypeContract] = useState("");
  const [PutHireDate, setPutHireDate] = useState("");
  const [PutNumSAP, setPutNumSAP] = useState("");
  const [PutIdSAP, setPutIdSAP] = useState("");
  const [PutProfile, setPutProfile] = useState("");

  const [text, setText] = useState("");
  const [textBddRead, setTextBddRead] = useState("");
  const [textBddDelete, setTextBddDelete] = useState("");
  const [textBddUpdate, setTextBddUpdate] = useState("");

  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");
  const [skill4, setSkill4] = useState("");
 



  useEffect(() => {
    consultaAPI()
  }, [])


  let consultaAPI = async () => {
    try {
      const response = await fetch("http://192.168.125.50:9000/test?index=" + text, {
        method: "GET"
      });

      if (response.ok) {
        console.log("Recibiendo datos")
        const data = await response.json();
        setNombrePersonaje(data.Nombre)
        setEspeciePersonaje(data.Especie)
        setEstadoPersonaje(data.Estado)
        setAvatarPersonaje(data.Avatar)
        setTextBddRead("")
      }
    } catch (error) {
      console.log(error);
    }

  };

  let leerBDD = async () => {
    try {
      const response = await fetch("http://192.168.125.50:9000/user?nickname=" + textBddRead, {
        method: "GET"
      });
      if (response.ok) {

        console.log("Recibiendo datos")
        const data = await response.json();
        setNickName(data.nickname)
        setName(data.name)
        setSurname(data.surnames)
        setLocation(data.location)
        setTypeContract(data.type_of_contract)
        setHireName(data.hire_date)
        setNumSAP(data.hire_date)
        setIdSAP(data.idSAP)
        setProfile(data.profile)
        setImagen(data.imagen)

        setReadSuccess("El usuario está en la base de datos");

      } else{
        setReadSuccess("No se ha encontrado ese usuario en la bdd");
      }

      setTextBddRead("");
      setInsertNickName("");
      setInsertName("");
      setInsertSurnames("");
      setInsertLocation("");
      setInsertTypeContract("");
      setInsertHireDate("");
      setInsertNumSAP("");
      setInsertIdSAP("");
      setProfile("")
      leerBDDskills()

      setTimeout(() => {
        setReadSuccess("");
      }, 3000);

    } catch (error) {
      console.log(error);
    }



  };

  let leerBDDskills = async () => {
    try {
      const response = await fetch("http://192.168.125.50:9000/user/skill?nickname=" + textBddRead, {
        method: "GET"
      });
      if (response.ok) {
        console.log("Recibiendo datos")
        const data = await response.json();
        setSkill1(data[1])
        setSkill2(data[2])
        setSkill3(data[3])
        setSkill4(data[4])

        setReadSuccess("El usuario está en la base de datos");

      } else{
        setReadSuccess("No se ha encontrado ese usuario en la bdd");
      }

      setTextBddRead("");
      setInsertNickName("");
      setInsertName("");
      setInsertSurnames("");
      setInsertLocation("");
      setInsertTypeContract("");
      setInsertHireDate("");
      setInsertNumSAP("");
      setInsertIdSAP("");
      setProfile("")
      
      setTimeout(() => {
        setReadSuccess("");
      }, 3000);

    } catch (error) {
      console.log(error);
    }

  };


  let eliminarBDD = async () => {
    try {
      const response = await fetch("http://192.168.125.50:9000/user?nickname=" + textBddDelete, {
        method: "DELETE"
      });

      if (response.ok) {
        setDeleteSuccess("Se ha eliminado correctamente");
       
      } else{
        setDeleteSuccess("No se ha encontrado ese usuario en la bdd");
      }

      setTextBddDelete("")

      setTimeout(() => {
        setDeleteSuccess("");
      }, 3000);


    } catch (error) {

      console.log(error);
    }

  };

  let insertarBDD = async () => {
    try {
      const params = {
        nickname: InsertNickName,
        name: InsertName,
        surnames: InsertSurnames,
        location: InsertLocation,
        type_of_contract: InsertTypeContract,
        hire_date: InsertHireDate,
        numSAP: InsertNumSAP,
        idSAP: InsertIdSAP,
        profile: InsertProfile,
      };

      const encodedParams = JSON.stringify(params);

      const response = await fetch("http://192.168.125.50:9000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: encodedParams
      });

      if (response.ok) {
        setInsertSuccess("Se ha insertado correctamente");

      } else {
        setInsertSuccess("Los campos nickName, nombre, apellido y profile son obligatorios");
      }

      setInsertNickName("");
      setInsertName("");
      setInsertSurnames("");
      setInsertLocation("");
      setInsertTypeContract("");
      setInsertHireDate("");
      setInsertNumSAP("");
      setInsertIdSAP("");
      setInsertProfile("");

      setTimeout(() => {
        setInsertSuccess("");
      }, 3000);


    } catch (error) {
      console.log(error);
    }
  };

  let actualizarBDD = async () => {
    try {
      const params2 = {
        name: PutName,
        surnames: PutSurnames,
        location: PutLocation,
        type_of_contract: PutTypeContract,
        hire_date: PutHireDate,
        numSAP: PutNumSAP,
        idSAP: PutIdSAP,
        profile: PutProfile,
      };

      const encodedParams2 = (JSON.stringify(params2));


      const response = await fetch("http://192.168.125.50:9000/user?nickname=" + textBddUpdate, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: encodedParams2
      });

      if (response.ok) {
        setUpdateSuccess("Se ha actualizado correctamente");

      } else {
        setUpdateSuccess("Ese usuario no existe en la bdd o no has rellenado los campos obligatorios");
      }

      setTextBddUpdate("")
      setPutName("");
      setPutSurnames("");
      setPutLocation("");
      setPutTypeContract("");
      setPutHireDate("");
      setPutNumSAP("");
      setPutIdSAP("");
      setPutProfile("");

      setTimeout(() => {
        setUpdateSuccess("");
      }, 3000);

    } catch (error) {
      console.log(error);
    }

  };




  return (

    <View style={styles.container}>
      <ScrollView style={{ width: 350 }}>
        <View style={styles.cabecera_Rick_Morty}>
          <Image style={styles.image} source={{ uri: avatarPersonaje }} />
          <Text>Nombre: {nombrePersonaje}</Text>
          <Text>Estado: {estadoPersonaje}</Text>
          <Text>Especie: {especiePersonaje}</Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta el id del personaje..."
            onChangeText={(newText) => setText(newText)}
          />
          <Button
            onPress={consultaAPI}
            title="API Rick y Morty"
            color="#841584"
          />
        </View>



        <View style={styles.boxes}>
          <Text style={styles.text_boxes}>Introduce el nickname a mostrar: </Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta tu consulta..."
            onChangeText={(text) => setTextBddRead(text)}
            defaultValue={textBddRead}
          />
          <Text style={{ paddingVertical: 20, fontWeight: 'bold', color: 'green' }}>Usuario</Text>
          <Text style={{fontWeight: 'bold'}}>Nickname: </Text>
          <Text>{nickName}</Text>
          <Text style={{fontWeight: 'bold'}}>Name: </Text>
          <Text>{name}</Text>
          <Text style={{fontWeight: 'bold'}}>Surnames: </Text>
          <Text>{surnames}</Text>
          <Text style={{fontWeight: 'bold'}}>Location: </Text>
          <Text>{location}</Text>
          <Text style={{fontWeight: 'bold'}}>Type of contract: </Text>
          <Text>{typeContract}</Text>
          <Text style={{fontWeight: 'bold'}}>Hire date: </Text>
          <Text>{hireDate}</Text>
          <Text style={{fontWeight: 'bold'}}>Num.SAP: </Text>
          <Text>{numSAP}</Text>
          <Text style={{fontWeight: 'bold'}}>Id.SAP: </Text>
          <Text>{idSAP}</Text>
          <Text style={{fontWeight: 'bold'}}>Profile: </Text>
          <Text>{profile}</Text>
          <Text style={{fontWeight: 'bold'}}>Skills: </Text>
          <Text style={{fontWeight: 'bold'}}>1: {skill1}</Text>
          <Text style={{fontWeight: 'bold'}}>2: {skill2}</Text>
          <Text style={{fontWeight: 'bold'}}>3: {skill3}</Text>
          <Text style={{fontWeight: 'bold'}}>4: {skill4}</Text>

          <View style={{ width: 300, height: 50 }}>
            <Text style={{ color: "blue", fontWeight: 'bold' }}>{readSuccess}</Text>
          </View>

          <Button
            onPress={leerBDD}
            title="Leer BDD"
            color="#841584"
          />

        </View>

        <View style={styles.boxes}>
          <Text style={styles.text_boxes}>Introduce el nickname a eliminar: </Text>

          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta tu consulta..."
            onChangeText={(text) => setTextBddDelete(text)}
            defaultValue={textBddDelete}
          />
          <Button
            onPress={eliminarBDD}
            title="Eliminar BDD"
            color="#841584"
          />


          <View style={{ width: 300, height: 50 }}>
            <Text style={{ color: "blue", fontWeight: 'bold' }}>{deleteSuccess}</Text>
          </View>

        </View>

        <View style={styles.boxes}>
          <Text style={styles.text_boxes}>Introduce persona a insertar: </Text>
          <TextInput
            style={{ height: 40, }}
            placeholder="Inserta el Nickname..."
            onChangeText={(text) => setInsertNickName(text)}
            defaultValue={InsertNickName}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta su nombre..."
            onChangeText={(text) => setInsertName(text)}
            defaultValue={InsertName}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta su apellido..."
            onChangeText={(text) => setInsertSurnames(text)}
            defaultValue={InsertSurnames}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta su localización..."
            onChangeText={(text) => setInsertLocation(text)}
            defaultValue={InsertLocation}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta su tipo de contrato..."
            onChangeText={(text) => setInsertTypeContract(text)}
            defaultValue={InsertTypeContract}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta su fecha de contratación..."
            onChangeText={(text) => setInsertHireDate(text)}
            defaultValue={InsertHireDate}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta su num. de SAP..."
            onChangeText={(text) => setInsertNumSAP(text)}
            defaultValue={InsertNumSAP}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta su id. de SAP..."
            onChangeText={(text) => setInsertIdSAP(text)}
            defaultValue={InsertIdSAP}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta su profile..."
            onChangeText={(text) => setInsertProfile(text)}
            defaultValue={InsertProfile}
          />
          <Button
            onPress={insertarBDD}
            title="Insertar BDD"
            color="#841584"
          />

          <View style={{ width: 300, height: 50 }}>
            <Text style={{ color: "blue", fontWeight: 'bold' }}>{insertSuccess}</Text>
          </View>
        </View>


        <View style={{ marginBottom: 50, borderColor: "black", borderWidth: 2 }}>
          <Text style={styles.text_boxes}>Introduce persona a actualizar: </Text>
          <TextInput
            style={{ height: 40, backgroundColor: "#8eecf5" }}
            placeholder="Inserta el nickName que quieres actualizar..."
            onChangeText={(text) => setTextBddUpdate(text)}
            defaultValue={textBddUpdate}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta nuevo nombre..."
            onChangeText={(text) => setPutName(text)}
            defaultValue={PutName}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta nuevos apellidos..."
            onChangeText={(text) => setPutSurnames(text)}
            defaultValue={PutSurnames}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta la nueva localización..."
            onChangeText={(text) => setPutLocation(text)}
            defaultValue={PutLocation}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta el nuevo tipo de contrato..."
            onChangeText={(text) => setPutTypeContract(text)}
            defaultValue={PutTypeContract}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta la nueva fecha de contratación..."
            onChangeText={(text) => setPutHireDate(text)}
            defaultValue={PutHireDate}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta el nuevo número SAP..."
            onChangeText={(text) => setPutNumSAP(text)}
            defaultValue={PutNumSAP}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta el nuevo ID SAP..."
            onChangeText={(text) => setPutIdSAP(text)}
            defaultValue={PutIdSAP}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Inserta el nuevo profile..."
            onChangeText={(text) => setPutProfile(text)}
            defaultValue={PutProfile}
          />
          <Button
            onPress={actualizarBDD}
            title="Actualizar BDD"
            color="#841584"
          />

          <View style={{ width: 300, height: 50 }}>
            <Text style={{ color: "blue", fontWeight: 'bold' }}>{updateSuccess}</Text>
          </View>

        </View>
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cabecera_Rick_Morty: {
    marginBottom: 20,
    marginTop: 100,
    borderColor: "black",
    borderWidth: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#f5cba7",
  },
  boxes: {
    marginBottom: 50,
    borderColor: "black",
    borderWidth: 2,
  },
  text_boxes: {
    paddingVertical: 20,
    fontWeight: 'bold'
  }

});

export default Screen1;