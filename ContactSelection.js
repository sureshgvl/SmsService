import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Contacts from 'react-native-contacts';
import SendSMS from 'react-native-sms';
import { requestContactsPermission, loadContacts } from './utils/contactUtils';
import { styles } from './styles';


const ContactSelection = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [message, setMessage] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
   if (Platform.OS === 'android') {
      requestContactsPermission().then(loadContactsData);
    } else {
      loadContactsData();
    }
  }, []);

  const loadContactsData = () => {
    loadContacts(setContacts);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filteredData = contacts.filter((contact) =>
        contact.displayName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContacts(filteredData);
    } else {
      setFilteredContacts(contacts);
    }
  };

  const handleSelectContact = (contact) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts(selectedContacts.filter((c) => c !== contact));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const sendSMS = () => {
    const phoneNumbers = selectedContacts.map(
      contact => contact.phoneNumbers[0]?.number
    );
    SendSMS.send({
      body: message,
      recipients: phoneNumbers,
      successTypes: ['sent', 'queued'],
      allowAndroidSendWithoutReadPermission: true
    }, (completed, cancelled, error) => {
      console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
    });
  };

  const renderContact = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSelectContact(item)}
      style={[
        styles.listBox,
        { backgroundColor: selectedContacts.includes(item) ? '#cce5ff' : '#fff' },
      ]}
    >
      <Text style={{ fontSize: 18 }}>{item.displayName}</Text>
      <Text style={{ fontSize: 14, color: '#888' }}>
        {item.phoneNumbers[0]?.number}
      </Text>
    </TouchableOpacity>
  );

  const renderSelectedContacts = () => (
    selectedContacts.map(contact => (
      <View key={contact.recordID} style={{ padding: 5 }}>
        <Text>{contact.displayName} ,</Text>
      </View>
    ))
  );

  // Sort contacts alphabetically
  const sortedContacts = contacts.sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Selected Contact</Text>
        <View style={styles.selectedContactBox}>
          <ScrollView horizontal>
            {selectedContacts.length > 0 ? renderSelectedContacts() : <Text>No contacts selected</Text>}
          </ScrollView>
        </View>
      </View>
      <Text style={styles.header}>Message</Text>
      <TextInput
        style={styles.msgBox}
        placeholder="Enter your message"
        value={message}
        onChangeText={setMessage}
        multiline={true}
        numberOfLines={4}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Contacts"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <Text style={styles.header}>Your Contact</Text>
      <View style={styles.contactListBox}>
        <FlatList
            data={filteredContacts.length > 0 ? filteredContacts : sortedContacts}
            renderItem={renderContact}
            keyExtractor={item => item.recordID}
            
        />
        {selectedContacts.length > 0 && (
            <Button title="Send SMS" onPress={sendSMS} />
        )}
      </View>
    </View>
  );
};

export default ContactSelection;
