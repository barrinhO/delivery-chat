import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { io } from "socket.io-client";
import axios from "axios";

const API_URL = "http://192.168.224.1:3000";
const socket = io(API_URL, { transports: ["websocket"] });

export default function App() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cliente");

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (msg) => setMessages((prev) => [...prev, msg]));
    return () => socket.off("receive_message");
  }, []);

  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      setUser(res.data);
      fetchUsers(res.data.role);
      setScreen("userlist");
    } catch { alert("Erro no login"); }
  };

  const register = async () => {
    try {
      await axios.post(`${API_URL}/register`, { name, email, password, role });
      alert("Cadastro feito!");
      setScreen("login");
    } catch { alert("Erro no cadastro"); }
  };

  const fetchUsers = async (userRole) => {
    const targetRole = userRole === "cliente" ? "atendente" : "cliente";
    const res = await axios.get(`${API_URL}/users?role=${targetRole}`);
    setUsers(res.data);
  };

  const selectUser = (u) => { setSelectedUser(u); setMessages([]); setScreen("chat"); };

  const sendMessage = () => {
    if (!message.trim()) return;
    const msg = { sender_id: user.id, receiver_id: selectedUser.id, content: message, time: new Date().toLocaleTimeString() };
    socket.emit("send_message", msg);
    setMessage(""); // apenas limpa input
  };

  if (screen === "login")
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={styles.button} onPress={login}><Text style={styles.btnText}>Login</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen("register")}><Text style={{color:"#00f"}}>Criar conta</Text></TouchableOpacity>
      </View>
    );

  if (screen === "register")
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro</Text>
        <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Role: cliente ou atendente" value={role} onChangeText={setRole} />
        <TouchableOpacity style={styles.button} onPress={register}><Text style={styles.btnText}>Cadastrar</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen("login")}><Text style={{color:"#00f"}}>Voltar</Text></TouchableOpacity>
      </View>
    );

  if (screen === "userlist")
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Selecione um usuário</Text>
        <FlatList data={users} keyExtractor={(u)=>u.id} renderItem={({item})=>(
          <TouchableOpacity style={styles.userBtn} onPress={()=>selectUser(item)}>
            <Text style={{color:"#fff"}}>{item.name} ({item.role})</Text>
          </TouchableOpacity>
        )} />
      </View>
    );

  if (screen === "chat")
    return (
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==="ios"?"padding":"height"}>
        <View style={styles.container}>
          <Text style={styles.title}>Chat com {selectedUser.name}</Text>
          <FlatList data={messages} keyExtractor={(_,i)=>i.toString()} renderItem={({item})=>(
            <View style={{alignSelf: item.sender_id===user.id?"flex-end":"flex-start", backgroundColor:"#222", padding:8, marginVertical:4, borderRadius:8}}>
              <Text style={{color:"#fff"}}>{item.content}</Text>
              <Text style={{color:"#888", fontSize:10}}>{item.time}</Text>
            </View>
          )} />
          <View style={{flexDirection:"row"}}>
            <TextInput style={{flex:1,backgroundColor:"#333",color:"#fff",padding:10,borderRadius:8}} value={message} onChangeText={setMessage} placeholder="Digite uma mensagem" placeholderTextColor="#888" />
            <TouchableOpacity style={{padding:10,backgroundColor:"#0f0",marginLeft:5,borderRadius:8}} onPress={sendMessage}><Text>Enviar</Text></TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#111",padding:20,paddingTop:60},
  title:{color:"#fff",fontSize:24,fontWeight:"bold",marginBottom:20},
  input:{backgroundColor:"#222",color:"#fff",padding:10,marginBottom:10,borderRadius:8},
  button:{backgroundColor:"#0f0",padding:12,alignItems:"center",borderRadius:8},
  btnText:{color:"#000",fontWeight:"bold"},
  userBtn:{padding:15,backgroundColor:"#333",marginBottom:10,borderRadius:8}
});
