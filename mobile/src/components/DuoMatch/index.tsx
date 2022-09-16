 import { useState } from 'react';
 import { View,Modal, ModalProps,Text,TouchableOpacity,Alert, ActivityIndicator } from 'react-native';
 import { styles } from './styles';
 import { MaterialIcons} from '@expo/vector-icons';
import { THEME } from '../../theme';
import {Activity, CheckCircle} from 'phosphor-react-native';
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard';

interface Props extends ModalProps {
   discord: string;
   onClose: () => void;
}

 export function DuoMatch({discord,onClose,...rest}:Props) {
 const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscord(){
     setIsCopping(true);
     await Clipboard.setStringAsync(discord);
     Alert.alert('Discord copiado','Usuario copiado para area de transferencia');
     setIsCopping(false);
  }


   return (
    <Modal
    animationType='fade'
      {...rest}
     transparent
     statusBarTranslucent
    >
      <View style={styles.container}>
        <View style={styles.content}>
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={onClose}
        >
          <MaterialIcons
             name='close'
             size={20}
             color={THEME.COLORS.CAPTION_500}

          />          
        </TouchableOpacity>
            <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight='bold'/>  
            <Heading title='Lest`s Play' subtitle='Agora e so comecar a jogar' style={{alignItems:'center' ,marginTop:24 }} /> 
             <Text  style={styles.label}>
                Adicioner ao discord
             </Text>

          <TouchableOpacity
           style={styles.discordButton}
            onPress={handleCopyDiscord}
            disabled={isCopping}
           >
            <Text  style={styles.discord}>
                { isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> :  discord}
                </Text>
          </TouchableOpacity>
           
        </View>       
      </View>
    </Modal>

   );
 }