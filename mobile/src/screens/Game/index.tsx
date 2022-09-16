import React, { useEffect, useState } from 'react';
import {SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { styles } from './styles';
import {useRoute,useNavigation } from '@react-navigation/native';
import { GameParams } from '../../@types/navigation';
import { TouchableOpacity, View ,Image, FlatList,Text} from 'react-native';
import {Entypo} from '@expo/vector-icons';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { Duocard ,DuoCardProps } from '../../components/Duocard';
import { DuoMatch } from '../../components/DuoMatch';
 


 export function Game() {

  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation();
  const [duos,setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected,setDiscordDuoSelected] = useState('');

  function handleGoBack(){
    navigation.goBack();
  }

 async function getDiscordUser(adsId: string){
   fetch(`http://192.168.0.2:3333/ads/${adsId}/discord`)
     .then(response => response.json())
     .then(data => {setDiscordDuoSelected(data.discord)});
  }   


  useEffect(()=> {
    fetch(`http://192.168.0.2:3333/games/${game.id}/ads`)
     .then(response => response.json())
     .then(data => {       
      setDuos(data);
     })
  },[])


   return (
    <Background>  
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}  >
              <Entypo               
                name='chevron-thin-left'
                color={THEME.COLORS.CAPTION_300}
                size={24}              
              />
              </TouchableOpacity>
            
              <Image 
              source={logoImg}
              style={styles.logo}
              />

              <View  style={styles.right} />
           </View> 

          <Image 
             source={ { uri: game.bannerUrl}}
             style={styles.cover}
             resizeMode="cover"
          />
          
           <Heading  
            title={game.title}
            subtitle="Conecte-se e comece a jogar"             
           />

          <FlatList
            data={duos}
               keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Duocard 
                   data={item}
                    onConect={()=> getDiscordUser(item.id)}
                />
              ) }

              horizontal
              style={styles.containerLits}
              contentContainerStyle={styles.contentList}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={()=>(
                <Text style={styles.emptyListText}>
                   Não há anuncios publicados para esse jogo
                </Text>
              )}
          />    
         

         <DuoMatch 
           visible={discordDuoSelected.length > 0}
           discord={discordDuoSelected} 
           onClose={()=> setDiscordDuoSelected('')}
         />
      </SafeAreaView>
     </Background>   
   );
 }