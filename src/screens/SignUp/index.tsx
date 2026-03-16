import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { Container, MainContent } from './styles';
import {
  Text,
  LogoWrapper,
  Logo,
  SubTitle,
  SectionHeader,
  SocialLoginButton,
  FormWrapper,
} from '@screens/SignIn/styles';

// Dependencies
import { isAxiosError } from 'axios';
import * as zod from 'zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth, useSSO } from '@clerk/clerk-expo';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import { Screen } from '@components/Screen';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { ScreenDivider } from '@components/ScreenDivider';
import { ControlledInput } from '@components/ControlledInput';

import api from '@api/api';

import { eUrl } from '@enums/enumsUrl';
import { ThemeProps } from '@interfaces/theme';

const LOGO_URL = '@assets/logo.png';
const GOOGLE_LOGO_URL = '@assets/googleLogo.png';

/* Validation Form - Start */
const schema = zod
  .object({
    name: zod.string().min(1, 'Digite o seu nome'),
    lastName: zod.string().min(1, 'Digite o seu sobrenome'),
    email: zod.email('Digite um e-mail válido').min(1, 'Digite o seu melhor e-mail'),
    password: zod
      .string()
      .min(1, 'Digite a sua senha')
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve ter uma letra maiúscula')
      .regex(/[a-z]/, 'A senha deve ter uma letra minúscula')
      .regex(/[0-9]/, 'A senha deve ter um número'),
    confirmPassword: zod.string().min(1, 'Confirme a sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  });
/* Validation Form - End */

type FormData = zod.infer<typeof schema>;

export function SignUp() {
  const theme = useTheme() as ThemeProps;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const googleOAuth = useOAuth({ strategy: 'oauth_google' });

  async function handlePressTermsOfUse() {
    await WebBrowser.openBrowserAsync(eUrl.TERMS_OF_USE_URL);
  }

  async function handlePressPolicyPrivacy() {
    await WebBrowser.openBrowserAsync(eUrl.PRIVACY_POLICY_URL);
  }

  function handlePressLogin() {
    router.navigate('/signIn');
  }

  async function handleContinueWithGoogle() {
    try {
      setLoading(true);
      const oAuthFlow = await googleOAuth.startOAuthFlow();

      if (oAuthFlow.authSessionResult?.type === 'success' && oAuthFlow.createdSessionId) {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({
            session: oAuthFlow.createdSessionId,
          });
        }
      } else {
        // Use signIn or signUp returned from startOAuthFlow
        // for next steps, such as MFA
      }
    } catch (error) {
      console.error('SignIn screen, handleContinueWithGoogle error =>', error);
      if (isAxiosError(error)) {
        Alert.alert(
          'Login',
          `Não foi possível autenticar com o Google: ${error.response?.data?.message}. Por favor, tente novamente.`
        );
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleRegisterUser(form: FormData) {
    setLoading(true);

    try {
      const newUser = {
        name: form.name,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      };

      const { data, status } = await api.post('/auth/register', newUser);

      if (status === 201 || status === 200) {
        if (data.authToken) {
          console.log('✅ Token received, saving...');
          // You can save token here if needed for auto-login
        }

        Alert.alert(
          'Cadastro de usuário',
          'Bem vindo ao Smart Finances! Você será redirecionado para a tela de login.',
          [{ text: 'OK', onPress: () => router.navigate('/signIn') }]
        );
      }
    } catch (error) {
      console.error('❌ SignUp handleRegisterUser error =>', error);
      if (isAxiosError(error)) {
        console.error('❌ Response:', error.response?.data);
        Alert.alert(
          'Cadastro de usuário',
          `Não foi possível concluir o cadastro: ${
            error.response?.data?.message || error.message
          }. Por favor, tente novamente.`
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SectionHeader>
          <Header.Root>
            <Header.BackButton />
            <Header.Title title={'Cadastro'} />
          </Header.Root>
        </SectionHeader>

        <MainContent>
          <LogoWrapper style={{ marginBottom: -16 }}>
            <Logo source={require(LOGO_URL)} style={{ width: '30%' }} />
          </LogoWrapper>

          <SubTitle style={{ marginBottom: 8 }}>Faça seu cadastro abaixo</SubTitle>

          <FormWrapper style={{ marginBottom: 16 }}>
            <ControlledInput
              placeholder="Nome"
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="name"
              textContentType="givenName"
              name="name"
              control={control}
              error={errors.name}
            />

            <ControlledInput
              placeholder="Sobrenome"
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="name"
              textContentType="familyName"
              name="lastName"
              control={control}
              error={errors.lastName}
            />

            <ControlledInput
              placeholder="E-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              name="email"
              control={control}
              error={errors.email}
            />

            <ControlledInput
              placeholder="Senha"
              autoCorrect={false}
              secureTextEntry={true}
              autoComplete="password-new"
              textContentType="newPassword"
              name="password"
              control={control}
              error={errors.password}
            />

            <ControlledInput
              placeholder="Repetir senha"
              autoCorrect={false}
              secureTextEntry={true}
              autoComplete="password-new"
              textContentType="newPassword"
              name="confirmPassword"
              control={control}
              error={errors.confirmPassword}
              returnKeyType="go"
              onSubmitEditing={handleSubmit(handleRegisterUser)}
            />
          </FormWrapper>

          <ScreenDivider text="Ou" />

          <SocialLoginButton onPress={handleContinueWithGoogle} style={{ marginTop: 8 }}>
            <Logo source={require(GOOGLE_LOGO_URL)} style={{ width: '15%' }} />

            <Text style={{ marginLeft: 8, color: theme.colors.textPlaceholder }}>
              Entrar com o Google
            </Text>
          </SocialLoginButton>

          <Text
            style={{
              textAlign: 'center',
              paddingHorizontal: 16,
              marginTop: 16,
              marginBottom: 16,
            }}>
            Ao me cadastrar, eu declaro que li e aceito os{' '}
            <Text style={{ color: theme.colors.primary }} onPress={handlePressTermsOfUse}>
              Termos de Uso
            </Text>{' '}
            e a{' '}
            <Text style={{ color: theme.colors.primary }} onPress={handlePressPolicyPrivacy}>
              Política de Privacidade
            </Text>
            .
          </Text>

          <Button.Root
            isLoading={loading}
            onPress={handleSubmit(handleRegisterUser)}
            style={{ width: '50%', alignSelf: 'center' }}>
            <Button.Text text="Cadastrar" />
          </Button.Root>

          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Já possui uma conta?{' '}
            <Text style={{ color: theme.colors.primary }} onPress={handlePressLogin}>
              Login
            </Text>
          </Text>
        </MainContent>
      </Container>
    </Screen>
  );
}
