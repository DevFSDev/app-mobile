class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        form: {}
      };
      this.handleSkillSelection = this.handleSkillSelection.bind(this);
    }
  
    handleSkillSelection(skill, level) {
      this.setState(prevState => ({
        form: {
          ...prevState.form,
          [skill]: level
        }
      }));
    }
  
    render() {
      return (
        <ScrollView style={{ width: 350, flex: 1 }}>
        <View /* View para que en el caso de que tenga skills se mostrarán por pantalla*/ >
            {skills.length > 0 ? (
                skills.map((item, index) => (
                    <View key={index}>
                        <View style={{
                            flexDirection: "row", borderColor: "black", marginBottom: 10, padding: 10, borderRadius: 10, borderWidth: 2,
                            backgroundColor: item.color === 1 ? "#EF4641" :
                                item.color === 2 ? "#00AA9B" :
                                    item.color === 3 ? "#91A0CC" :
                                        item.color === 4 ? "#4BACC6" :
                                            item.color === 5 ? "#F79646" :
                                                item.color === 6 ? "#8064A2" :
                                                    item.color === 7 ? "#FFFFFF" :
                                                        "white"
                        }}>
                            <View>
                                <Text style={[styles.names, { textAlign: 'center' }]}> {item.skill}</Text>
                                <View style={{ flexDirection: 'row', margin: 10 }}>
                                    <TouchableOpacity
                                        style={[styles.botonesSelecTodos, {
                                            backgroundColor: item.color === 1 ? "#8C100C" : item.color === 2 ? "#00554E" : item.color === 3 ? "#192137" : item.color === 4 ? "#215968" : item.color === 5 ? "#984807" : item.color === 6 ? "#403152" : item.color === 7 ? "black" : "white",   
                                        },
                                        {
                                            borderWidth: 2, borderColor: this.state.form[item.skill] === 1 ? "blue" : "transparent"
                                        }
                                        ]}
                                        
                                        onPress={() => { handleSkillSelection(item.skill, 1), handleButtonPress(item.skill, 1) , setLevel(1), setSkill(item.skill)}}
                                    >
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Nivel 1</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.botonesSelecTodos, {
                                            backgroundColor: item.color === 1 ? "#8C100C" : item.color === 2 ? "#00554E" : item.color === 3 ? "#192137" : item.color === 4 ? "#215968" : item.color === 5 ? "#984807" : item.color === 6 ? "#403152" : item.color === 7 ? "black" : "white", 
                                        },
                                        {
                                            borderWidth: 2, borderColor: this.state.form[item.skill] === 2 ? "blue" : "transparent"
                                        }
                                        ]}
                                        onPress={() => {  handleSkillSelection(item.skill, 2), handleButtonPress(item.skill, 2) , setLevel(2), setSkill(item.skill)}}
                                    >
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Nivel 2</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.botonesSelecTodos, {
                                            backgroundColor: item.color === 1 ? "#8C100C" : item.color === 2 ? "#00554E" : item.color === 3 ? "#192137" : item.color === 4 ? "#215968" : item.color === 5 ? "#984807" : item.color === 6 ? "#403152" : item.color === 7 ? "black" : "white", 
                                        },
                                        {
                                            borderWidth: 2, borderColor: this.state.form[item.skill] === 3 ? "blue" : "transparent"
                                        }
                                        ]}
                                        onPress={() => {  handleSkillSelection(item.skill, 3), handleButtonPress(item.skill, 3) , setLevel(3), setSkill(item.skill)}}
                                    >
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Nivel 3</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.botonesSelecTodos, {
                                            backgroundColor: item.color === 1 ? "#8C100C" : item.color === 2 ? "#00554E" : item.color === 3 ? "#192137" : item.color === 4 ? "#215968" : item.color === 5 ? "#984807" : item.color === 6 ? "#403152" : item.color === 7 ? "black" : "white", 
                                        },
                                        {
                                            borderWidth: 2, borderColor: this.state.form[item.skill] === 4 ? "blue" : "transparent"
                                        }
                                        ]}
                                        onPress={() => {  handleSkillSelection(item.skill, 4), handleButtonPress(item.skill, 4) , setLevel(4), setSkill(item.skill)}}
                                    >
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Nivel 4</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                ))
            ) : (
                <Text>No hay datos disponibles</Text>
            )}
        </View>
    </ScrollView>
      );
    }
  }