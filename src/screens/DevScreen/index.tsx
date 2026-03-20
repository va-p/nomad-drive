import React, { useCallback, useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { Container, Content, Label, Value } from './styles';

import { Screen } from '@components/Screen';
import { Header } from '@components/Header';

import DeviceInfo from 'react-native-device-info';
// import codePush from '@revopush/react-native-code-push';
import { RectButton } from 'react-native-gesture-handler';

export function DevScreen() {
  const [fullVersion, setFullVersion] = useState('');
  const [cpLabel, setCpLabel] = useState<string | undefined>();
  const [cpDesc, setCpDesc] = useState<string | undefined>();
  const [cpHash, setCpHash] = useState<string | undefined>();
  const appVersion = DeviceInfo.getVersion();

  function copy(text: string, msg: string) {
    // Clipboard.setString(text);
  }

  const loadData = useCallback(async () => {
    try {
      // const meta = await codePush.getUpdateMetadata();
      // if (meta) {
      //   setCpLabel(meta.label);
      //   setCpDesc(meta.description);
      //   setCpHash(meta.packageHash);
      //   setFullVersion(`${appVersion} (${meta.label})`);
      // } else {
      //   setFullVersion(`${appVersion}`);
      // }
      setFullVersion(`${appVersion}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao obter dados de debug');
    }
  }, [appVersion]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // const checkForUpdate = async () => {
  //   try {
  //     const update = await codePush.checkForUpdate();
  //     if (update) {
  //       Alert.alert('Atualização disponível', 'Atualizar agora?', [
  //         { text: 'Sim', onPress: () => syncNow() },
  //         { text: 'Depois', onPress: () => {} },
  //       ]);
  //     } else {
  //       Alert.alert('Atualização não encontrada', 'Ok, fechar');
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     Alert.alert('Erro', 'Erro ao checar update');
  //   }
  // };

  // const syncNow = async () => {
  //   try {
  //     await codePush.sync({
  //       installMode: codePush.InstallMode.IMMEDIATE,
  //       updateDialog: {
  //         title: 'Atualização disponível',
  //         optionalUpdateMessage: 'Aplicar agora?',
  //         optionalInstallButtonLabel: 'Sim',
  //         optionalIgnoreButtonLabel: 'Depois',
  //         mandatoryUpdateMessage: 'Atualização obrigatória.',
  //         mandatoryContinueButtonLabel: 'Atualizar',
  //         appendReleaseDescription: true,
  //         descriptionPrefix: '\n\nNovidades:\n',
  //       },
  //     });
  //     setTimeout(loadData, 1000);
  //   } catch (e) {
  //     console.log(e);
  //     Alert.alert('Erro', 'Erro ao sincronizar');
  //   }
  // };

  return (
    <Screen>
      <Container>
        <Header.Root>
          <Header.BackButton />
          <Header.Title title="Developer Menu" />
        </Header.Root>

        <Content>
          {/* App Version / CodePush */}
          <Label disabled={!fullVersion}>App version</Label>
          <Value disabled={!fullVersion}>
            <RectButton onPress={() => copy(fullVersion, 'Versão do Aplicativo copiada!')}>
              <Label disabled={!fullVersion}>{fullVersion || '—'}</Label>
            </RectButton>
          </Value>

          {/* RevoPush extras */}
          {/*<Label disabled={!cpLabel}>RevoPush Label</Label>
          <Value disabled={!cpLabel}>
            <RectButton onPress={() => copy(cpLabel!, 'Label copiada!')}>
              <Label disabled={!cpLabel}>{cpLabel || '—'}</Label>
            </RectButton>
          </Value>*/}

          {/*<Label disabled={!cpDesc}>RevoPush Description</Label>
          <Value disabled={!cpDesc}>
            <RectButton onPress={() => copy(cpDesc!, 'Descrição copiada!')}>
              <Label disabled={!cpDesc}>{cpDesc || '—'}</Label>
            </RectButton>
          </Value>

          <Label disabled={!cpHash}>RevoPush Package Hash</Label>
          <Value disabled={!cpHash}>
            <RectButton onPress={() => copy(cpHash!, 'Package hash copiado!')}>
              <Label disabled={!cpHash}>{cpHash || '—'}</Label>
            </RectButton>
          </Value>*/}

          {/* Ações rápidas */}
          <View style={{ height: 16 }} />
          {/*<Value disabled={false}>
            <RectButton onPress={checkForUpdate}>
              <Label disabled={false}>🔍 Check update</Label>
            </RectButton>
          </Value>
          <RectButton onPress={syncNow}>
            <Value disabled={false}>
              <Label disabled={false}>⚡ Sync now</Label>
            </Value>
          </RectButton>*/}
        </Content>
      </Container>
    </Screen>
  );
}
