// app/(tabs)/bai3.tsx
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function ChangeColorScreen() {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // Màu ban đầu là trắng

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleChangeColor = () => {
    const newColor = getRandomColor();
    setBackgroundColor(newColor);
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={styles.buttonContainer}>
        <Button title="Đổi Màu Nền Ngẫu Nhiên" onPress={handleChangeColor} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    // Thêm một lớp nền cho nút để dễ nhìn hơn trên các màu tối
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 15,
  }
});