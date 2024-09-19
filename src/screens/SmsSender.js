import React from 'react';
import { Button, View, Alert } from 'react-native';
import SendSMS from 'react-native-sms';

const SmsSender = () => {
  const sendSMS = () => {
    SendSMS.send({
      body: 'Hello, this is a test message!',
      recipients: ['1234567890'], // array of recipient numbers
      successTypes: ['sent', 'queued']
    }, (completed, cancelled, error) => {
      if (completed) {
        Alert.alert('SMS Sent Successfully');
      } else if (cancelled) {
        Alert.alert('SMS Sending Cancelled');
      } else if (error) {
        Alert.alert('Error Occurred in Sending SMS');
      }
    });
  };

  return (
    <View>
      <Button title="Send SMS" onPress={sendSMS} />
    </View>
  );
};

export default SmsSender;
