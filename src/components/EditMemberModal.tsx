import React, { useState, useEffect } from 'react';
import { Modal, TextInput, StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Member } from '../types/types';

interface EditMemberModalProps {
  visible: boolean;
  member: Member | null;
  onClose: () => void;
  onUpdate: (member: Member) => void;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({ visible, member, onClose, onUpdate }) => {
  const [name, setName] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [contatoEmergencia, setContatoEmergencia] = useState('');
  const [endereco, setEndereco] = useState('');
  const [alergias, setAlergias] = useState('');
  const [tipoSanguineo, setTipoSanguineo] = useState('');
  const [condicaoMedica, setCondicaoMedica] = useState('');
  const [medicacao, setMedicacao] = useState('');
  const [observacao, setObservacao] = useState('');
  const [dataUltimaAtualizacao, setDataUltimaAtualizacao] = useState('');

  useEffect(() => {
    if (member) {
      setName(member.name);
      setDataNascimento(formatDate(member.dataNascimento, false));
      setTelefone(formatPhoneNumber(member.telefone));
      setContatoEmergencia(formatPhoneNumber(member.contatoEmergencia)); 
      setEndereco(member.endereco);
      setAlergias(member.alergias);
      setTipoSanguineo(member.tipoSanguineo);
      setCondicaoMedica(member.condicaoMedica);
      setMedicacao(member.medicacao);
      setObservacao(member.observacao);
      setDataUltimaAtualizacao(formatDateTime(new Date().toISOString())); // Data atual formatada
    }
  }, [member, visible]);

  const formatPhoneNumber = (value: string) => {
    return value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'); // Aplica o formato (XX) XXXXX-XXXX
  };

  const formatDate = (value: string, isInput: boolean) => {
    if (isInput) {
      return value
        .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'); // Para entrada: DDMMYYYY -> DD/MM/YYYY
    } else {
      return value
        .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'); // Para exibição: DD/MM/YYYY
    }
  };

  const formatDateTime = (value: string) => {
    const now = new Date(value);
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(2); // Últimos dois dígitos do ano
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  const handleUpdate = () => {
    const updatedMember: Member = {
      id: member!.id, // Garantir que member não seja null
      name: name.trim() || '*',
      dataNascimento: dataNascimento.replace(/\//g, '') || '*', // Remove a formatação da data para salvar
      telefone: telefone.replace(/\D/g, '') || '(00) 00000-0000', // Valor padrão se estiver vazio
      contatoEmergencia: contatoEmergencia.replace(/\D/g, '') || '(00) 00000-0000',
      endereco: endereco.trim() || '*',
      alergias: alergias.trim() || '*',
      tipoSanguineo: tipoSanguineo.trim() || '*',
      condicaoMedica: condicaoMedica.trim() || '*',
      medicacao: medicacao.trim() || '*',
      observacao: observacao.trim() || '*',
      dataUltimaAtualizacao: formatDateTime(new Date().toISOString()), // Atualiza automaticamente com a data e hora atuais
    };
    onUpdate(updatedMember);
    onClose();
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome"
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Data de Nascimento</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Data de Nascimento"
                  value={dataNascimento}
                  onChangeText={(text) => setDataNascimento(formatDate(text, true))}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Telefone</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Telefone"
                  value={telefone}
                  onChangeText={(text) => setTelefone(text)}
                  onBlur={() => setTelefone(formatPhoneNumber(telefone))}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Contato de Emergência</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Contato de Emergência"
                  value={contatoEmergencia}
                  onChangeText={(text) => setContatoEmergencia(text)}
                  onBlur={() => setContatoEmergencia(formatPhoneNumber(contatoEmergencia))}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Endereço</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Endereço"
                  value={endereco}
                  onChangeText={setEndereco}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Alergias</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Alergias"
                  value={alergias}
                  onChangeText={setAlergias}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Tipo Sanguíneo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Tipo Sanguíneo"
                  value={tipoSanguineo}
                  onChangeText={setTipoSanguineo}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Condição Médica</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Condição Médica"
                  value={condicaoMedica}
                  onChangeText={setCondicaoMedica}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Medicação</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Medicação"
                  value={medicacao}
                  onChangeText={setMedicacao}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Observação</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Observação"
                  value={observacao}
                  onChangeText={setObservacao}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Data da Última Atualização</Text>
                <TextInput
                  style={[styles.input, styles.disabledInput]}
                  placeholder="Data da Última Atualização"
                  value={dataUltimaAtualizacao}
                  editable={false} // Bloqueia a edição
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.submitButton} onPress={handleUpdate}>
                  <Text style={styles.buttonText}>Atualizar Membro</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 5,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#007bff', // Cor azul para o botão de atualizar
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6c757d', // Cor cinza para o botão cancelar
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EditMemberModal;
