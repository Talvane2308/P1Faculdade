import React, { useState } from 'react';
import { Modal, TextInput, StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Member } from '../types/types'; 

interface AddMemberModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (member: Member) => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ visible, onClose, onAdd }) => {
  // Função para obter a data e hora atuais formatadas
  const getFormattedCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(2); // Últimos dois dígitos do ano
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  // Função para formatar o número de telefone
  const formatPhoneNumber = (value: string) => {
    return value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'); // Aplica o formato (XX) XXXXX-XXXX
  };

  // Função para formatar a data
  const formatDate = (value: string) => {
    return value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3'); // Aplica o formato DD/MM/YYYY
  };

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
  const [dataUltimaAtualizacao] = useState(getFormattedCurrentDateTime()); // Data automática

  // Função chamada ao adicionar um novo membro
  const handleAdd = () => {
    const newMember: Member = {
      id: Date.now().toString(), // Gera um ID único
      name: name.trim() || '*',
      dataNascimento: dataNascimento.trim() || '*', // Remove a formatação da data para salvar
      telefone: telefone.trim() || '(00) 00000-0000', // Valor padrão se estiver vazio
      contatoEmergencia: contatoEmergencia.trim() || '(00) 00000-0000',
      endereco: endereco.trim() || '*',
      alergias: alergias.trim() || '*',
      tipoSanguineo: tipoSanguineo.trim() || '*',
      condicaoMedica: condicaoMedica.trim() || '*',
      medicacao: medicacao.trim() || '*',
      observacao: observacao.trim() || '*',
      dataUltimaAtualizacao, // Data da última atualização é automática
    };
    onAdd(newMember);
    // Limpa os campos do formulário
    setName('');
    setDataNascimento('');
    setTelefone('');
    setContatoEmergencia('');
    setEndereco('');
    setAlergias('');
    setTipoSanguineo('');
    setCondicaoMedica('');
    setMedicacao('');
    setObservacao('');
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
                  placeholder="João Silva"
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Data de Nascimento</Text>
                <TextInput
                  style={styles.input}
                  placeholder="01-01-1990"
                  value={formatDate(dataNascimento)}
                  onChangeText={setDataNascimento}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Telefone</Text>
                <TextInput
                  style={styles.input}
                  placeholder="(01) 23456-7891"
                  value={telefone}
                  onChangeText={setTelefone}
                  // Formata o telefone para exibição
                  onBlur={() => setTelefone(formatPhoneNumber(telefone))}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Contato de Emergência</Text>
                <TextInput
                  style={styles.input}
                  placeholder="(01) 23456-7891"
                  value={contatoEmergencia}
                  onChangeText={setContatoEmergencia}
                  // Formata o contato de emergência para exibição
                  onBlur={() => setContatoEmergencia(formatPhoneNumber(contatoEmergencia))}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Endereço</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Rua das Flores, 123, Centro, São Paulo-SP, 01000-000"
                  value={endereco}
                  onChangeText={setEndereco}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Alergias</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Soja, Diclofenaco"
                  value={alergias}
                  onChangeText={setAlergias}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Tipo Sanguíneo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="O+"
                  value={tipoSanguineo}
                  onChangeText={setTipoSanguineo}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Condição Médica</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Rinite alérgica, Hipertensão"
                  value={condicaoMedica}
                  onChangeText={setCondicaoMedica}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Medicação</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Atensina 100mg"
                  value={medicacao}
                  onChangeText={setMedicacao}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Observação</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Sensibilidade a luz."
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
                <TouchableOpacity style={styles.submitButton} onPress={handleAdd}>
                  <Text style={styles.buttonText}>Registrar Membro</Text>
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
    borderRadius: 0,
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
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
    backgroundColor: '#007bff', // Cor azul para o botão de registro
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

export default AddMemberModal;