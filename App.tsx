import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Modal, Text, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../app5/src/components/Header';
import MemberItem from '../app5/src/components/MemberItem';
import AddMemberModal from '../app5/src/components/AddMemberModal';
import EditMemberModal from '../app5/src/components/EditMemberModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Member } from '../app5/src/types/types';

const initialMembers: Member[] = [
  {
    id: '0',
    name: 'Exemplo',
    dataNascimento: '01-01-1990',
    telefone: '12345678910',
    contatoEmergencia: '12345678910',
    endereco: 'Endereço',
    alergias: 'Nenhuma',
    tipoSanguineo: 'O+',
    condicaoMedica: 'Nenhuma',
    medicacao: 'Nenhuma',
    observacao: 'Nenhuma',
    dataUltimaAtualizacao: '2024-09-10',
  },
  // Adicione mais membros conforme necessário
];

export default function TabOneScreen() {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(initialMembers);
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [optionsModalVisible, setOptionsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    loadMembersFromFile();
  }, []);

  const handleAddMember = () => {
    setModalVisible(true);
  };

  const handleAddMemberConfirm = (newMember: Omit<Member, 'id'>) => {
    const memberId = (filteredMembers.length + 1).toString();
    const memberWithId = { ...newMember, id: memberId };

    const updatedMembers = [...filteredMembers, memberWithId];
    setFilteredMembers(updatedMembers);
    setSelectedMembers(new Set());
    saveMembersToFile(updatedMembers);
    setModalVisible(false);
  };

  const handleEditMember = (member: Member) => {
    setCurrentMember(member);
    setEditModalVisible(true);
  };

  const handleUpdateMember = (updatedMember: Member) => {
    const updatedMembers = filteredMembers.map(member =>
      member.id === updatedMember.id ? updatedMember : member
    );
    setFilteredMembers(updatedMembers);
    saveMembersToFile(updatedMembers);
    setEditModalVisible(false);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === '') {
      loadMembersFromFile();
    } else {
      const filtered = filteredMembers.filter(member =>
        member.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
  };

  const handleClearSearch = () => {
    setSearchText('');
    loadMembersFromFile();
  };

  const handleSelectAll = () => {
    if (selectedMembers.size === filteredMembers.length) {
      setSelectedMembers(new Set());
    } else {
      setSelectedMembers(new Set(filteredMembers.map(member => member.id)));
    }
  };

  const handleItemPress = (id: string) => {
    const updatedSelection = new Set(selectedMembers);
    if (selectedMembers.has(id)) {
      updatedSelection.delete(id);
    } else {
      updatedSelection.add(id);
    }
    setSelectedMembers(updatedSelection);
  };

  const handleOptions = () => {
    setOptionsModalVisible(true);
  };

  const handleDeleteSelectedMembers = async () => {
    Alert.alert(
      'Excluir Membros',
      'Você tem certeza de que deseja excluir os membros selecionados?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () => {
            const updatedMembers = filteredMembers.filter(member => !selectedMembers.has(member.id));
            setFilteredMembers(updatedMembers);
            setSelectedMembers(new Set());
            saveMembersToFile(updatedMembers);
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    // Lógica para sair do aplicativo
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

  const loadMembersFromFile = async () => {
    try {
      const jsonMembers = await AsyncStorage.getItem('members');
      if (jsonMembers) {
        const members = JSON.parse(jsonMembers) as Member[];
        setFilteredMembers(members);
      } else {
        setFilteredMembers(initialMembers);
      }
    } catch (error) {
      console.error('Failed to load members from file:', error);
    }
  };

  const renderItem = ({ item }: { item: Member }) => (
    <MemberItem
      id={item.id}
      name={item.name}
      isSelected={selectedMembers.has(item.id)}
      onPress={handleItemPress}
      onLongPress={() => handleEditMember(item)} // Long press to edit
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        searchText={searchText}
        onSearchChange={handleSearch}
        onClearSearch={handleClearSearch}
        onAddMember={handleAddMember}
        onSelectAll={handleSelectAll}
        onOptionsPress={handleOptions}
      />
      <FlatList
        data={filteredMembers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.memberList}
      />
      <AddMemberModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddMemberConfirm}
      />
      {currentMember && (
        <EditMemberModal
          visible={editModalVisible}
          member={currentMember}
          onClose={() => setEditModalVisible(false)}
          onUpdate={handleUpdateMember}
        />
      )}
      <Modal
        transparent={true}
        visible={optionsModalVisible}
        onRequestClose={() => setOptionsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha uma opção</Text>
            <TouchableOpacity style={styles.button} onPress={handleDeleteSelectedMembers}>
              <Text style={styles.buttonText}>Excluir Selecionados</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => console.log('Import')}>
              <Text style={styles.buttonText}>Importar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => console.log('Export')}>
              <Text style={styles.buttonText}>Exportar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setOptionsModalVisible(false)}>
              <Text style={styles.buttonText}>Retornar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Sair do Aplicativo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  memberList: {
    flex: 1,
    padding: 10,
  },
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
