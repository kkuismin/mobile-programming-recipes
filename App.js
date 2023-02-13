import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, TextInput, Text, Button, View, FlatList, Image } from 'react-native';

export default function App() {

  const [ingredient, setIngredient] = useState('');
  const [meals, setMeals] = useState('');

  const getMeals = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then(response => response.json())
    .then(data => setMeals(data.meals))
    .catch(error => Alert.alert('Error', error));
  }

  const ItemSeparator = () => <View
    style={{
      height: 1,
      width: "100%",
      backgroundColor: "lightgrey",
      marginBottom: 10,
    }}
  />

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <FlatList 
        style={styles.list}
        keyExtractor={item => item.idMeal}
        data={meals}  
        renderItem={({item}) =>
          <View>
            <Text style={styles.text}>{item.strMeal}</Text>
            <Image style={styles.img} source={{ uri: item.strMealThumb }} />
          </View>} 
        ItemSeparatorComponent={ItemSeparator} /> 
      <TextInput 
        style={styles.input} 
        placeholder='ingredient'
        onChangeText={text => setIngredient(text) } 
        value={ingredient}/>
      <Button title="Find" onPress={getMeals} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  list: {
    marginTop: 20,
    width: '100%',
  },
  img: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  }, 
  input: {
    width: 200,
    fontSize: 18,
    padding: 5,
  },
});
