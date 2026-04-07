import React from 'react';
import { Alert } from 'react-native';
import { Container, ContentScroll, Title } from './styles';

import { useAuth } from '@contexts/AuthProvider';

// Icons
import { UserIcon } from 'phosphor-react-native/src/icons/User';
import { CookieIcon } from 'phosphor-react-native/src/icons/Cookie';
import { SignOutIcon } from 'phosphor-react-native/src/icons/SignOut';
import { LifebuoyIcon } from 'phosphor-react-native/src/icons/Lifebuoy';
import { MoonStarsIcon } from 'phosphor-react-native/src/icons/MoonStars';
import { FingerprintIcon } from 'phosphor-react-native/src/icons/Fingerprint';
import { ShieldCheckIcon } from 'phosphor-react-native/src/icons/ShieldCheck';

// Dependencies
import { isAxiosError } from 'axios';
import { reloadAppAsync } from 'expo';
import { useRouter } from 'expo-router';
import { useTheme } from 'styled-components';
import * as WebBrowser from 'expo-web-browser';
import * as LocalAuthentication from 'expo-local-authentication';

// Components
import { Screen } from '@components/Screen';
import { Header } from '@components/Header';
import { ButtonToggle } from '@components/ButtonToggle';
import { ButtonSelect } from '@components/ButtonSelect';

// Storages
import { useUser } from '@stores/userStore';
import { useUserConfigs } from '@stores/userConfigsStore';
import { STORAGE_CONFIGS, storageConfig } from '@storage/mmkv';

import api from '@api/api';

// Interfaces
import { eUrl } from '@enums/enumsUrl';
import { ThemeProps } from '@interfaces/theme';

export function OptionsMenu() {
  const theme = useTheme() as ThemeProps;
  const router = useRouter();

  const { signOut } = useAuth();

  const userId = useUser((state) => state.id);

  const { darkMode, setDarkMode, useLocalAuth, setUseLocalAuth } = useUserConfigs();

  function handleOpenProfile() {
    router.navigate('/options/profile');
  }

  async function handleOpenkHelpCenter() {
    await WebBrowser.openBrowserAsync(eUrl.HELP_CENTER_URL);
  }

  async function handleOpenTermsOfUse() {
    await WebBrowser.openBrowserAsync(eUrl.TERMS_OF_USE_URL);
  }

  async function handleOpenPrivacyPolicy() {
    await WebBrowser.openBrowserAsync(eUrl.PRIVACY_POLICY_URL);
  }

  function handleOpenDevScreen() {
    router.navigate('/options/dev');
  }

  async function handleChangeDarkMode() {
    try {
      storageConfig.set(`${STORAGE_CONFIGS}.darkMode`, !darkMode);
      setDarkMode(!darkMode);
      await reloadAppAsync();
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Modo escuro',
        'Não foi possível alterar o modo escuro, por favor, tente novamente.'
      );
    }
  }

  async function handleChangeUseLocalAuth() {
    try {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticar com Biometria',
        cancelLabel: 'Cancelar',
      });
      if (biometricAuth.success) {
        try {
          const { status } = await api.post('user_config/edit_use_local_auth', {
            user_id: userId,
            use_local_authentication: !useLocalAuth,
          });

          if (status === 200) {
            storageConfig.set(`${STORAGE_CONFIGS}.useLocalAuth`, !useLocalAuth);

            setUseLocalAuth(!useLocalAuth);
          }
        } catch (error) {
          if (isAxiosError(error)) {
            Alert.alert('Autenticação biométrica', error.response?.data.message);
          }
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Autenticação biométrica',
        'Não foi possível autenticar com a biometria, por favor, tente novamente.'
      );
    }
  }

  return (
    <Screen>
      <Container>
        <Header.Root style={{ justifyContent: 'center' }}>
          <Header.Title title="Mais opções" />
        </Header.Root>

        <ContentScroll>
          <Title>Conta</Title>
          <ButtonSelect
            icon={<UserIcon color={theme.colors.primary} />}
            title="Perfil"
            onPress={handleOpenProfile}
          />

          <ButtonSelect
            icon={<SignOutIcon color={theme.colors.primary} />}
            title="Sair"
            onPress={signOut}
          />

          <Title>Configurações</Title>
          <ButtonToggle
            icon={<MoonStarsIcon color={theme.colors.primary} />}
            title="Modo escuro"
            onValueChange={handleChangeDarkMode}
            value={darkMode}
            isEnabled={darkMode}
          />

          <ButtonToggle
            icon={<FingerprintIcon color={theme.colors.primary} />}
            title="Touch / Face ID"
            onValueChange={handleChangeUseLocalAuth}
            value={useLocalAuth}
            isEnabled={useLocalAuth}
          />

          <Title>Sobre</Title>
          <ButtonSelect
            icon={<LifebuoyIcon color={theme.colors.primary} />}
            title="Central de Ajuda"
            onPress={() => handleOpenkHelpCenter()}
          />

          <ButtonSelect
            icon={<ShieldCheckIcon color={theme.colors.primary} />}
            title="Termos de Uso"
            onPress={() => handleOpenTermsOfUse()}
          />

          <ButtonSelect
            icon={<CookieIcon color={theme.colors.primary} />}
            title="Política de Privacidade"
            onPress={() => handleOpenPrivacyPolicy()}
            onLongPress={handleOpenDevScreen}
          />
        </ContentScroll>
      </Container>
    </Screen>
  );
}
