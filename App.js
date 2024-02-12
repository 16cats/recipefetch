import { StatusBar } from 'expo-status-bar';
import { Image, ActivityIndicator, FlatList, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = () => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
      .then(response => {
        if (!response)
          throw new Error('Error in fetch: ' + response.statusText)

        return response.json();

      })
      .then(data => {
        setRecipes(data.meals);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      })
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  console.log(recipes);

  return (
    <View style={styles.container}>
    <View style={{ marginTop: 100, flex: 1}}>
        <TextInput
          style={{ textAlign: 'center' }} // Add this style
          placeholder='Type keyword...'
          value={keyword}
          onChangeText={text => setKeyword(text)}
        />

        <Button title='Search' onPress={fetchRecipes} />
      </View>
      <View style={{ flex: 6 }}>
        <FlatList
          data={recipes}
          renderItem={({ item }) =>
            <View style={{ margin: 10 }}>
              <Text style={{ fontSize: 20 }}>{item.strMeal}</Text>
              <Image source={{ uri: item.strMealThumb }} style={{ width: 300, height: 300 }} />
            </View>
          }
        />

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});