// app/(tabs)/bai1.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Linking } from 'react-native';

export default function PersonalCardScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://maunailxinh.com/anh-meo-tuc-gian-cute/' }} // Thay bằng link ảnh của bạn
        />
        <Text style={styles.name}>LÊ HƯNG</Text>
        <Text style={styles.job}>Lập trình app</Text>
        <Text style={styles.contact} onPress={() => Linking.openURL('mailto:an.tv@email.com')}>
          Email: hungletrong02@gmail.com
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    width: 320,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    // Đổ bóng (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Đổ bóng (Android)
    elevation: 8,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  job: {
    fontSize: 18,
    color: 'gray',
    marginTop: 5,
    fontStyle: 'italic',
  },
  contact: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});