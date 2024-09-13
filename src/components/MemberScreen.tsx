import React, { useState } from 'react';
import { View, Button } from 'react-native';
import ViewMemberModal from './ViewMemberModal';
import EditMemberModal from './EditMemberModal';
import { Member } from '../types/types';

const MemberScreen = () => {
  const [isViewModalVisible, setViewModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const showViewModal = (member: Member) => {
    setSelectedMember(member);
    setViewModalVisible(true);
  };

  const handleCloseViewModal = () => {
    setViewModalVisible(false);
  };

  const handleEditMember = () => {
    setViewModalVisible(false);
    setEditModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setEditModalVisible(false);
  };

  const exampleMember: Member = {
    id: '1',
    name: 'Nome do Membro',
    dataNascimento: '01011990',
    telefone: '123456789',
    contatoEmergencia: '987654321',
    endereco: 'Rua Exemplo, 123',
    alergias: 'Nenhuma',
    tipoSanguineo: 'O+',
    condicaoMedica: 'Nenhuma',
    medicacao: 'Nenhuma',
    observacao: 'Nenhuma',
    dataUltimaAtualizacao: '01012024',
  };

  return (
    <View>
      <Button
        title="Ver Membro"
        onPress={() => showViewModal(exampleMember)}
      />

      <ViewMemberModal
        visible={isViewModalVisible}
        member={selectedMember}
        onClose={handleCloseViewModal}
        onEdit={handleEditMember}
      />
      
      <EditMemberModal
        visible={isEditModalVisible}
        member={selectedMember}
        onClose={handleCloseEditModal}
        onUpdate={() => {
          
        }}
      />
    </View>
  );
};

export default MemberScreen;
