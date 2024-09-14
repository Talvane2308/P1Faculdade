import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Alert, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './src/components/Header';
import MemberItem from './src/components/MemberItem';
import AddMemberModal from './src/components/AddMemberModal';
import EditMemberModal from './src/components/EditMemberModal';
import OptionsModal from './src/components/OptionsModal';
import ActionModal from './src/components/ActionModal';
import ViewMemberModal from './src/components/ViewMemberModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Member } from './src/types/types';

const initialMembers: Member[] = [
  {
    id: '0',
    name: 'Exemplo',
    dataNascimento: '01011990',
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
  const [searchText, setSearchText] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false); // Estado para modal de visualização
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [actionModalVisible, setActionModalVisible] = useState(false);

  useEffect(() => {
    loadMembersFromFile();
  }, []);

  useEffect(() => {
    filterMembers(searchText);
  }, [members, searchText]);

  const handleAddMember = () => setModalVisible(true);

  const handleAddMemberConfirm = (newMember: Omit<Member, 'id'>) => {
    const newId = (members.length + 1).toString();
    const updatedMembers = [...members, { ...newMember, id: newId }];
    updateMembers(updatedMembers);
    setModalVisible(false);
  };

  const handleEditMember = (member: Member) => {
    setCurrentMember(member);
    setEditModalVisible(true);
  };

  const handleUpdateMember = (updatedMember: Member) => {
    const updatedMembers = members.map(member =>
      member.id === updatedMember.id ? updatedMember : member
    );
    updateMembers(updatedMembers);
    setEditModalVisible(false);
  };

  const handleViewMember = (member: Member) => {
    setCurrentMember(member);
    setViewModalVisible(true);
  };

  const handleViewMemberEdit = () => {
    setViewModalVisible(false);
    if (currentMember) {
      handleEditMember(currentMember);
    }
  };

  const filterMembers = (text: string) => {
    if (!text.trim()) {
      setFilteredMembers(members);
    } else {
      const filtered = members.filter(member =>
        member.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
  };

  const updateMembers = (updatedMembers: Member[]) => {
    setMembers(updatedMembers);
    saveMembersToFile(updatedMembers);
  };

  const handleSearch = (text: string) => setSearchText(text);

  const handleClearSearch = () => setSearchText('');

  const handleSelectAll = () => {
    if (selectedMembers.size === filteredMembers.length) {
      setSelectedMembers(new Set());
    } else {
      const newSelection = new Set(filteredMembers.map(member => member.id));
      setSelectedMembers(newSelection);
    }
  };

  const handleItemPress = (id: string) => {
    setSelectedMembers(prevSelected => {
      const updatedSelection = new Set(prevSelected);
      updatedSelection.has(id) ? updatedSelection.delete(id) : updatedSelection.add(id);
      return updatedSelection;
    });
  };

  const handleOptions = () => setOptionsModalVisible(true);

  const handleLogout = () => {
    Alert.alert('Sair', 'Você realmente deseja sair do aplicativo?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: () => BackHandler.exitApp() },
    ]);
  };

  const saveMembersToFile = async (members: Member[]) => {
    try {
      const json = JSON.stringify(members);
      await AsyncStorage.setItem('members', json);
    } catch (error) {
      console.error('Falha ao salvar membros:', error);
    }
  };

  const loadMembersFromFile = async () => {
    try {
      const storedMembers = await AsyncStorage.getItem('members');
      if (storedMembers) {
        setMembers(JSON.parse(storedMembers));
      } else {
        setMembers(initialMembers);
      }
    } catch (error) {
      console.error('Falha ao carregar membros:', error);
    }
  };

  const renderItem = ({ item }: { item: Member }) => (
    <MemberItem
      id={item.id}
      name={item.name}
      isSelected={selectedMembers.has(item.id)}
      onPress={() => handleItemPress(item.id)}
      onLongPress={() => handleViewMember(item)} // Atualizado para abrir o modal de visualização
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
      {currentMember && (
        <ViewMemberModal
          visible={viewModalVisible}
          member={currentMember}
          onClose={() => setViewModalVisible(false)}
          onEdit={handleViewMemberEdit} // Adicionada a função para editar o membro
        />
      )}
      <OptionsModal
        visible={optionsModalVisible}
        onClose={() => setOptionsModalVisible(false)}
        members={members}
        setMembers={setMembers}
        selectedMembers={selectedMembers}
        setSelectedMembers={setSelectedMembers}
      />
      <ActionModal
        visible={actionModalVisible}
        onClose={() => setActionModalVisible(false)}
        onAdd={handleAddMember}
        onEdit={() => currentMember && handleEditMember(currentMember)}
      />
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
});
