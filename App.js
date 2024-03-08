import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { MESSAGES, addDoc, collection, firestore, serverTimestamp } from "./firebase/Config";
import { useEffect, useState } from 'react';
import { QuerySnapshot, onSnapshot, orderBy, query } from 'firebase/firestore';
import { convertFirebaseTimestampToJS } from './helpers/Functions';

export default function App() {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const q = query(collection(firestore, MESSAGES), orderBy("created", "desc"))
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const tempMessages = []

            QuerySnapshot.forEach((doc) => {
                const messageObject = {
                    id: doc.id,
                    text: doc.data().text,
                    created: convertFirebaseTimestampToJS(doc.data().created)
                }
                tempMessages.push(messageObject)
            })
            setMessages(tempMessages)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const save = async() => {
        const docRef = await addDoc(collection(firestore, MESSAGES), {
            text: newMessage,
            created: serverTimestamp()
        }).catch(error => console.log(error))

        setNewMessage("")
        console.log("Message saved.")
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    messages.map((message) => (
                        <View style={styles.messages} key={message.id}>
                            <Text>{message.text}</Text>
                            <Text style={styles.messageInfo} >{message.created}</Text>
                        </View>
                    ))
                }
            </ScrollView>
            <TextInput placeholder='Send message...' value={newMessage} onChangeText={text => setNewMessage(text)} style={styles.textInput} />
            <Button title="Send" type="button" onPress={save} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
    height: "5%",
    width: "50%",
    marginBottom: "5%"
  },
  messages: {
    padding: 10,
    margin: 10,
    backgroundColor: "#f5f5f5",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  messageInfo: {
    fontSize: 12,
  }
});
