import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface HeaderProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  onClearSearch: () => void;
  onAddMember: () => void;
  onSelectAll: () => void;
  onOptionsPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchText, onSearchChange, onClearSearch, onAddMember, onSelectAll, onOptionsPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onAddMember} style={styles.iconButton} activeOpacity={0.7}>
        <Icon name="add" size={24} color="#000" accessibilityLabel="Add Member" />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar membros..."
          value={searchText}
          onChangeText={onSearchChange}
          accessibilityLabel="Search Members"
        />
        {searchText.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={onClearSearch}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity onPress={onSelectAll} style={styles.iconButton} activeOpacity={0.7}>
        <Icon name="check-box" size={24} color="#000" accessibilityLabel="Select All" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onOptionsPress} style={styles.iconButton} activeOpacity={0.7}>
        <Icon name="more-vert" size={24} color="#000" accessibilityLabel="Options" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff', // Fundo branco para o cabeçalho
  },
  iconButton: {
    padding: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  clearButton: {
    padding: 10,
  },
  clearButtonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default Header;
