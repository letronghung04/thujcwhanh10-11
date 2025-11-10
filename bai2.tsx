// app/(tabs)/bai2.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback, // <-- Thêm vào để đóng bàn phím khi nhấn ra ngoài
  SafeAreaView, // <-- Thêm vào để giao diện không bị đè lên tai thỏ/thanh trạng thái
} from 'react-native';

// (Cải tiến 1) Tách component con để tái sử dụng và làm mã gọn gàng hơn
const ScoreInput = ({ label, value, onChangeText }: { label: string, value: string, onChangeText: (text: string) => void }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={`Nhập điểm môn ${label.toLowerCase()}`}
      keyboardType="numeric"
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

export default function AverageScoreScreen() {
  const [scores, setScores] = useState({
    toan: '',
    ly: '',
    hoa: '',
  });

  const [dtb, setDtb] = useState<number | null>(null);

  // (Cải tiến 2) Xử lý việc cập nhật điểm một cách linh hoạt
  const handleScoreChange = (subject: keyof typeof scores, value: string) => {
    // Chỉ cho phép nhập số và dấu chấm, và chỉ một dấu chấm
    if (/^\d*\.?\d*$/.test(value)) {
      setScores(prevScores => ({
        ...prevScores,
        [subject]: value,
      }));
    }
  };

  // (Cải tiến 3) Sử dụng useMemo để tránh tính toán không cần thiết
  // Chỉ khi nào các điểm số thay đổi, isButtonDisabled mới được tính lại
  const isButtonDisabled = useMemo(() => {
    return scores.toan.trim() === '' || scores.ly.trim() === '' || scores.hoa.trim() === '';
  }, [scores]);

  const tinhDiem = () => {
    Keyboard.dismiss(); // Đóng bàn phím

    const diemToan = parseFloat(scores.toan);
    const diemLy = parseFloat(scores.ly);
    const diemHoa = parseFloat(scores.hoa);

    // Kiểm tra điểm hợp lệ (từ 0 đến 10)
    if (
      isNaN(diemToan) || isNaN(diemLy) || isNaN(diemHoa) ||
      diemToan < 0 || diemToan > 10 ||
      diemLy < 0 || diemLy > 10 ||
      diemHoa < 0 || diemHoa > 10
    ) {
      Alert.alert('Lỗi Dữ Liệu', 'Vui lòng nhập điểm hợp lệ cho cả 3 môn (từ 0 đến 10).');
      setDtb(null); // Xóa kết quả cũ nếu có lỗi
      return;
    }

    const trungBinh = (diemToan + diemLy + diemHoa) / 3;
    setDtb(trungBinh);
  };

  const xepLoai = (diem: number): string => {
    if (diem >= 8) return "Giỏi";
    if (diem >= 6.5) return "Khá";
    if (diem >= 5) return "Trung bình";
    return "Yếu";
  };

  return (
    // (Cải tiến 4) Dùng SafeAreaView và TouchableWithoutFeedback để cải thiện UX
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>Tính Điểm Trung Bình</Text>

          <ScoreInput label="Toán" value={scores.toan} onChangeText={(text) => handleScoreChange('toan', text)} />
          <ScoreInput label="Lý" value={scores.ly} onChangeText={(text) => handleScoreChange('ly', text)} />
          <ScoreInput label="Hóa" value={scores.hoa} onChangeText={(text) => handleScoreChange('hoa', text)} />

          <View style={styles.buttonWrapper}>
            <Button
              title="Tính Điểm"
              onPress={tinhDiem}
              disabled={isButtonDisabled} // <-- (Cải tiến 3) Vô hiệu hóa nút khi chưa đủ dữ liệu
              color="#007AFF"
            />
          </View>

          {dtb !== null && (
            <View style={styles.resultContainer}>
              <Text style={styles.result}>
                Điểm trung bình: <Text style={styles.scoreValue}>{dtb.toFixed(2)}</Text>
              </Text>
              {/* (Cải tiến 5) Thêm chức năng xếp loại học lực */}
              <Text style={styles.result}>
                Xếp loại: <Text style={styles.classificationValue}>{xepLoai(dtb)}</Text>
              </Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

// (Cải tiến 6) Tinh chỉnh lại StyleSheet cho đẹp và chuyên nghiệp hơn
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  buttonWrapper: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden', // Cần thiết để bo góc cho Button trên Android
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    alignItems: 'center',
  },
  result: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
  scoreValue: {
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  classificationValue: {
    fontWeight: 'bold',
    color: '#1565C0',
  },
});
