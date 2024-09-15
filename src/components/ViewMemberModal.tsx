import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Member } from '../types/types';

interface ViewMemberModalProps {
  visible: boolean;
  member: Member | null;
  onClose: () => void;
  onEdit: () => void;
}

const formatDate = (date: string) => {
  const day = date.slice(0, 2);
  const month = date.slice(2, 4);
  const year = date.slice(4);
  return `${day}/${month}/${year}`;
};

const ViewMemberModal: React.FC<ViewMemberModalProps> = ({ visible, member, onClose, onEdit }) => {
  if (!member) return null;

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.nameLabel}>Nome:</Text>
            <Text style={styles.nameValue}>{member.name}</Text>
            <Text style={styles.label}>Data de Nascimento:</Text>
            <Text style={styles.value}>{formatDate(member.dataNascimento)}</Text>
            <Text style={styles.label}>Telefone:</Text>
            <Text style={styles.value}>{member.telefone}</Text>
            <Text style={styles.label}>Contato de Emergência:</Text>
            <Text style={styles.value}>{member.contatoEmergencia}</Text>
            <Text style={styles.label}>Endereço:</Text>
            <Text style={styles.value}>{member.endereco}</Text>
            <Text style={styles.label}>Alergias:</Text>
            <Text style={styles.value}>{member.alergias}</Text>
            <Text style={styles.label}>Tipo Sanguíneo:</Text>
            <Text style={styles.value}>{member.tipoSanguineo}</Text>
            <Text style={styles.label}>Condição Médica:</Text>
            <Text style={styles.value}>{member.condicaoMedica}</Text>
            <Text style={styles.label}>Medicação:</Text>
            <Text style={styles.value}>{member.medicacao}</Text>
            <Text style={styles.label}>Observação:</Text>
            <Text style={styles.value}>{member.observacao}</Text>
            <Text style={styles.label}>Data da Última Atualização:</Text>
            <Text style={styles.value}>{member.dataUltimaAtualizacao}</Text>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onEdit} style={styles.editButton}>
              <Text style={styles.buttonText}>Editar Membro</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    elevation: 5,
  },
  scrollContainer: {
    paddingBottom: 5,
  },
  nameLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 3,
  },
  nameValue: {
    fontSize: 18,
    marginBottom: 3,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 3,
  },
  value: {
    fontSize: 16,
    marginBottom: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 8,
    marginRight: 8,
  },
  closeButton: {
    backgroundColor: '#6c757d',
    borderRadius: 5,
    padding: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ViewMemberModal;