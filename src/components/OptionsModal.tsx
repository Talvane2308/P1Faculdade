import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Member } from '../types/types';

interface OptionsModalProps {
  visible: boolean;
  onClose: () => void;
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  selectedMembers: Set<string>;
  setSelectedMembers: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const OptionsModal: React.FC<OptionsModalProps> = ({ visible, onClose, members, setMembers, selectedMembers, setSelectedMembers }) => {

  const handleDeleteSelected = async () => {
    if (selectedMembers.size === 0) {
      Alert.alert('Nenhum Membro Selecionado', 'Por favor, selecione pelo menos um membro para excluir.');
      return;
    }

    Alert.alert(
      'Excluir Membros',
      'Você tem certeza de que deseja excluir os membros selecionados?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () => {
            const updatedMembers = members.filter(member => !selectedMembers.has(member.id));
            setMembers(updatedMembers);
            setSelectedMembers(new Set());
            saveMembersToFile(updatedMembers);
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert('Sair', 'Você realmente deseja sair do aplicativo?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: () => BackHandler.exitApp() },
    ]);
  };

  const saveMembersToFile = async (members: Member[]) => {
    try {
      const jsonMembers = JSON.stringify(members);
      await AsyncStorage.setItem('members', jsonMembers);
    } catch (error) {
      console.error('Failed to save members to file:', error);
    }
  };

  const handleImport = () => {
    // Lógica de importação
    console.log('Importar');
  };

  const handleExport = () => {
    // Lógica de exportação
    console.log('Exportar');
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Escolha uma opção</Text>
          <TouchableOpacity style={styles.button} onPress={handleDeleteSelected}>
            <Text style={styles.buttonText}>Excluir Selecionados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleImport}>
            <Text style={styles.buttonText}>Importar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleExport}>
            <Text style={styles.buttonText}>Exportar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Retornar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Sair do Aplicativo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OptionsModal;
