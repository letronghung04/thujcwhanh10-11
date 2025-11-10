// app/(tabs)/bai4.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Alert,
  SafeAreaView
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

// Định nghĩa kiểu dữ liệu cho một công việc, thêm thuộc tính `completed`
interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoListScreen() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const inputRef = useRef<TextInput>(null); // (Cải tiến 1) Tham chiếu đến ô input

  // Hàm xử lý việc thêm công việc mới
  const handleAddTask = () => {
    if (taskText.trim().length === 0) {
      Alert.alert('Lỗi', 'Tên công việc không được để trống.');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      text: taskText.trim(),
      completed: false, // Mặc định là chưa hoàn thành
    };

    // (Cải tiến 2) Thêm công việc mới vào đầu danh sách
    setTasks([newTask, ...tasks]);
    setTaskText('');
    Keyboard.dismiss();
  };

  // (Cải tiến 3) Hàm xử lý việc xóa công việc
  const handleDeleteTask = (id: string) => {
    // Hiển thị hộp thoại xác nhận trước khi xóa
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa công việc này không?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Xóa",
          onPress: () => {
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
          },
          style: 'destructive' // Màu đỏ trên iOS
        }
      ]
    );
  };

  // (Cải tiến 4) Hàm đánh dấu công việc đã hoàn thành hoặc chưa
  const toggleTaskCompletion = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Component để render một mục công việc
  const renderTaskItem = ({ item }: { item: Task }) => (
    <View style={[styles.taskItem, item.completed && styles.taskItemCompleted]}>
      <TouchableOpacity style={styles.taskCheckbox} onPress={() => toggleTaskCompletion(item.id)}>
        <MaterialIcons
          name={item.completed ? 'check-box' : 'check-box-outline-blank'}
          size={28}
          color={item.completed ? '#4CAF50' : '#555'}
        />
      </TouchableOpacity>

      <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
        {item.text}
      </Text>

      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTask(item.id)}>
        <FontAwesome name="trash" size={24} color="#E53935" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Ghi Chú Công Việc</Text>

        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef} // Gán tham chiếu
            style={styles.input}
            placeholder="Nhập công việc mới..."
            value={taskText}
            onChangeText={setTaskText}
            onSubmitEditing={handleAddTask} // (Cải tiến 5) Thêm bằng phím Enter
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <MaterialIcons name="add" size={32} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <FontAwesome name="check-square-o" size={60} color="#CCC" />
              <Text style={styles.emptyText}>Tuyệt vời! Không có công việc nào.</Text>
            </View>
          }
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}

// (Cải tiến 6) Toàn bộ StyleSheet được thiết kế lại cho chuyên nghiệp hơn
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A237E',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 30,
    fontSize: 16,
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  list: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  taskItemCompleted: {
    backgroundColor: '#E8F5E9',
  },
  taskCheckbox: {
    marginRight: 15,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#A5A5A5',
  },
  deleteButton: {
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    opacity: 0.5,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    color: '#777',
  },
});
