import React, { ReactNode } from 'react';
import { Overlay } from './styles';

import { BottomSheetProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from 'styled-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@components/Header';

import { ThemeProps } from '@interfaces/theme';

type Props = BottomSheetProps & {
  title?: string;
  children: ReactNode;
  bottomSheetRef?: any;
};

export function Modal({ title, children, bottomSheetRef, ...rest }: Props) {
  const theme = useTheme() as ThemeProps;
  const { top } = useSafeAreaInsets();

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      stackBehavior="push"
      enablePanDownToClose={true}
      backdropComponent={() => <Overlay />}
      backgroundStyle={{ backgroundColor: theme.colors.background }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.primary }}
      topInset={top}
      {...rest}>
      <BottomSheetView style={{ flex: 1, padding: 16 }}>
        {title && (
          <Header.Root>
            <Header.Title title={`${title}`} />
          </Header.Root>
        )}
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

Modal.displayName = 'Modal';
