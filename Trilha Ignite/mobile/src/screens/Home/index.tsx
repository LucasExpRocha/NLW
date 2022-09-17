import logoImg from '../../assets/logo-nlw-esports.png'

import { styles } from './styles';
import { Image, FlatList } from 'react-native';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/background';
import { useNavigation } from '@react-navigation/native'

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerUrl}: GameCardProps) {
    navigation.navigate('game', {id, title, bannerUrl});
  }

  useEffect(() => {
    fetch('http://26.180.131.64:3636/games')
    .then(response => response.json())
    .then(data => setGames(data))
  }, [])

  return (
  <Background>
    <SafeAreaView style={styles.container}>
      <Image 
        source={logoImg}
        style={styles.logo}
        />
      <Heading
        title="Enctrone seu duo!"
        subtitle="Selecione o game que deseja jogar..."
        />

      <FlatList 
        data={games}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <GameCard 
            data={item}
            onPress={() => handleOpenGame(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
      />
    </SafeAreaView>
  </Background>
  );
}