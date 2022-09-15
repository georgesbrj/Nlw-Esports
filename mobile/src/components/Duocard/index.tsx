 
import React from 'react';
import { TouchableOpacity, View ,Text } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

import {GameController} from 'phosphor-react-native';
 
export interface DuoCardProps {
  hourStart: string,
  id: string,
  name: string,
  useVoiceChannel: boolean,
  weekDays: string[],
  yearsPlaying: number
}


interface Props {
  data: DuoCardProps;
  onConect: ()=> void;
}

export function Duocard({data,onConect}:Props) {
  return (
    <View style={styles.container}>
       
        <DuoInfo 
         label='Nome'
         value={data.name}
        />
        <DuoInfo 
         label='Tempo de jogo'
         value={`${data.yearsPlaying} anos`}
        />

        <DuoInfo 
         label='Disponibilidade'
         value={`${data.weekDays.length} dias \u2022  ${data.hourStart}  `}
        />

      <DuoInfo 
         label='Chamda de aúdio'
         value={data.useVoiceChannel ? 'sim' : "Nao"}
         colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
        />

        <TouchableOpacity
         style={styles.button}
         onPress={onConect}              
        >
          <GameController
           color={THEME.COLORS.TEXT}
           size={20}
          /> 
          <Text style={styles.buttonTitle}>
            Conectar
          </Text>
        </TouchableOpacity>
    </View>
  );
}