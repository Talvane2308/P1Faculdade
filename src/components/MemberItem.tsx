import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface MemberItemProps {
  id: string;
  name: string;
  isSelected: boolean;
  onPress: (id: string) => void;
  onLongPress: () => void; // Função para toque longo (edição)
}

const MemberItem: React.FC<MemberItemProps> = ({ id, name, isSelected, onPress, onLongPress }) => {
  return (
    <TouchableOpacity
      style={[styles.memberItem, isSelected && styles.selectedItem]}
      onPress={() => onPress(id)}
      onLongPress={onLongPress} // Adiciona toque longo para edição
      activeOpacity={0.7}
      accessibilityLabel={`Membro ${name}`}
      accessibilityHint="Toque para selecionar ou desmarcar este membro, ou mantenha pressionado para editar"
    >
      <Text style={styles.memberName}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  selectedItem: {
    backgroundColor: '#e0e0e0',
  },
  memberName: {
    fontSize: 16,
    color: '#333',
  },
});

export default MemberItem;
