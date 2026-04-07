import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';

import { isAxiosError } from 'axios';
import { OneSignal } from 'react-native-onesignal';
import * as LocalAuthentication from 'expo-local-authentication';
import { useUser as useClerkUser, getClerkInstance } from '@clerk/clerk-expo';

import {
  STORAGE_CONFIGS,
  STORAGE_TOKENS,
  STORAGE_USERS,
  storageConfig,
  storageToken,
  storageUser,
} from '@storage/mmkv';

import { useUser } from '@stores/userStore';
import { useUserConfigs } from '@stores/userConfigsStore';

import api from '@api/api';

import { User } from '@interfaces/user';

type FormData = {
  email: string;
  password: string;
};

interface AuthContextType {
  isSignedIn: boolean;
  user: any;
  isLoaded: boolean;
  loading: boolean;
  signInWithMail: (data: FormData) => Promise<User | undefined>;
  canSignInWithBiometrics: () => Promise<boolean>;
  signInWithBiometrics: () => Promise<void>;
  signOut: () => Promise<void>;
}

const CLERK_WEBHOOK_DELAY = 4000;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: any) {
  const { user: clerkUser, isLoaded: clerkLoaded, isSignedIn: clerkSignedIn } = useClerkUser();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const clerk = getClerkInstance();

  function storageUserDataAndConfig(userData: any): User {
    // User Data
    const loggedInUserDataFormatted = {
      id: userData.id,
      name: userData.name,
      lastName: userData.last_name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      image: userData.image,
      profileImage: userData.profile_image,
      configs: {
        useLocalAuth: userData.use_local_authentication,
        hideAmount: userData.hide_amount,
        insights: userData.insights,
      },
    };
    storageUser.set(`${STORAGE_USERS}`, JSON.stringify(loggedInUserDataFormatted));
    useUser.setState(() => ({
      id: loggedInUserDataFormatted.id,
      name: loggedInUserDataFormatted.name,
      lastName: loggedInUserDataFormatted.lastName,
      email: loggedInUserDataFormatted.email,
      phone: loggedInUserDataFormatted.phone,
      role: loggedInUserDataFormatted.role,
      profileImage: loggedInUserDataFormatted.image,
    }));

    // User Configs
    storageConfig.set(`${STORAGE_CONFIGS}.useLocalAuth`, userData.use_local_authentication);
    storageConfig.set(`${STORAGE_CONFIGS}.skipWelcomeScreen`, true);
    useUserConfigs.setState(() => ({
      useLocalAuth: userData.use_local_authentication,
    }));

    return loggedInUserDataFormatted;
  }

  async function canSignInWithBiometrics(): Promise<boolean> {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      const useLocalAuth = storageConfig.getBoolean(`${STORAGE_CONFIGS}.useLocalAuth`);

      return (compatible && enrolled && useLocalAuth) || false;
    } catch (error) {
      console.error('Erro ao verificar biometria:', error);
      return false;
    }
  }

  async function signInWithBiometrics() {
    try {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Entrar com Biometria',
        cancelLabel: 'Cancelar',
      });
      if (biometricAuth.success) {
        const jsonUser = storageUser.getString('user');

        const useLocalAuth = storageConfig.getBoolean(`${STORAGE_CONFIGS}.useLocalAuth`);
        const userConfigObject = {
          useLocalAuth: useLocalAuth || false,
        };
        if (jsonUser && userConfigObject) {
          const userObject = JSON.parse(jsonUser);
          useUser.setState(() => ({
            id: userObject.id,
            name: userObject.name,
            lastName: userObject.lastName,
            email: userObject.email,
            phone: userObject.phone,
            role: userObject.role,
            profileImage: userObject.image,
          }));
          useUserConfigs.setState(() => ({
            useLocalAuth: userConfigObject.useLocalAuth,
          }));
          OneSignal.login(userObject.id);
          setIsSignedIn(true);
          setUser(userObject);
        }
      }
    } catch (error) {
      console.error('AuthProvider, signInWithBiometrics error =>', error);
      if (isAxiosError(error)) {
        console.error('❌ AuthProvider, signInWithBiometrics error:', error.response?.data);
        Alert.alert(
          'Login',
          `Não foi possível autenticar com a biometria: ${
            error.response?.data?.message || error.message
          }. Por favor, tente novamente.`
        );
      }
    }
  }

  const fetchClerkUserDataOnDB = useCallback(async () => {
    // Delay of a few seconds for the Clerk webhook to finish its request to the Backend
    await new Promise((resolve) => setTimeout(resolve, CLERK_WEBHOOK_DELAY));

    const { data, status } = await api.get('/auth/clerk_sso', {
      params: {
        clerk_user_id: clerkUser?.id!,
      },
    });

    if (!!data[0] && status === 200) {
      storageToken.set(`${STORAGE_TOKENS}`, JSON.stringify(data[0]));
      const loggedInUserDataFormatted = storageUserDataAndConfig(data[1]);
      OneSignal.login(loggedInUserDataFormatted.id);
      setIsSignedIn(true);
      setUser(loggedInUserDataFormatted);
    } else {
      await clerk.signOut();
      Alert.alert('Erro', 'Usuário não encontrado.');
    }
  }, [clerk, clerkUser?.id]);

  async function signInWithMail(formData: FormData) {
    try {
      setLoading(true);

      const SignInUser = {
        email: formData.email,
        password: formData.password,
      };

      const { data, status } = await api.post('auth/login', SignInUser);
      const token = data.authToken || null;
      if (status === 200 && !!token) {
        storageToken.set(`${STORAGE_TOKENS}`, JSON.stringify(token));

        const userData = (await api.get('auth/me')).data;

        const loggedInUserDataFormatted = storageUserDataAndConfig(userData);

        OneSignal.login(loggedInUserDataFormatted.id);
        setIsSignedIn(true);
        setUser(loggedInUserDataFormatted); // User data from local storage
        return loggedInUserDataFormatted;
      }
      return;
    } catch (error) {
      console.error('AuthProvider, signInWithMail error =>', error);
      if (isAxiosError(error)) {
        Alert.alert('Login', `${error.response?.data?.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      await clerk.signOut();

      OneSignal.logout();

      setIsSignedIn(false);
      setUser(null);

      // Clears MMKV storage
      storageUser.set(`${STORAGE_USERS}`, '');
      storageToken.set(`${STORAGE_TOKENS}`, '');
      storageConfig.set(`${STORAGE_CONFIGS}`, '');

      // Clears Zustand state
      useUser.setState(() => ({
        id: '',
        name: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'user',
        profileImage: '',
      }));
      useUserConfigs.setState(() => ({
        insights: false,
        hideAmount: false,
        useLocalAuth: false,
      }));
    } catch (error) {
      console.error('AuthProvider, signOut error:', error);
      if (isAxiosError(error)) {
        Alert.alert(
          'Logout',
          `Não foi possível sair: ${error.response?.data?.message}. Por favor, tente novamente.`
        );
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const initializeAuth = async () => {
      if (!clerkLoaded) {
        return;
      }

      setLoading(true);

      try {
        if (clerkSignedIn && clerkUser) {
          await fetchClerkUserDataOnDB();
        } else {
          const canUseBiometrics = await canSignInWithBiometrics();
          if (canUseBiometrics) {
            await signInWithBiometrics();
          }
        }
      } catch (error) {
        console.error('Erro durante a inicialização da autenticação:', error);
        if (isAxiosError(error)) {
          Alert.alert('Login', error.response?.data?.message);
        }
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clerkLoaded, clerkSignedIn, clerkUser]);

  const contextValue = {
    isSignedIn,
    user,
    loading,
    isLoaded: clerkLoaded,
    signInWithMail,
    canSignInWithBiometrics,
    signInWithBiometrics,
    signOut,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
