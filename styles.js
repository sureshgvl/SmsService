import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
 container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0', // Gray background color
  },
  listBox: {
    padding: 10,
    backgroundColor: '#fffff0',
    borderWidth: 0.25,
    borderRadius: 5,
    marginBottom:5
  },
  header: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#333',
  },
  selectedContactBox: {
    height: 100,
    borderColor: '#ccc',
    marginBottom: 5,
    borderWidth: 1,
    backgroundColor: 'white'
  },
  msgBox: {
    height: 100,
    borderColor: '#ccc',
    marginBottom: 10,
    borderWidth: 1,
    backgroundColor: 'white'
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    left: 10,
    transform: [{ translateY: -10 }],
  },
  searchInput: {
    flex: 1,
    padding: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactListBox:
  {
    flex: 1,
    marginBottom:50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden', // Ensure content respects border radius
  }
});
