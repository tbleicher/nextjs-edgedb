import { ReactNode } from 'react';

import { LoadingOverlay, Modal, useMantineTheme } from '@mantine/core';

import { useProfile } from '../../hooks/useProfile';
import { AppShell } from '../AppShell/AppShell';
import { AuthenticationForm } from '../Auth/AuthenticationForm';

interface LayoutProps {
  children: ReactNode | ReactNode[];
  requireLogin?: boolean;
}

export function Layout({ children, requireLogin = true }: LayoutProps) {
  const { profile, loading } = useProfile();

  const theme = useMantineTheme();

  if (loading) {
    return <LoadingOverlay visible={true} />;
  }

  if (profile || !requireLogin) {
    return <AppShell>{children}</AppShell>;
  }

  return (
    <Modal
      centered
      opened={true}
      onClose={() => {}}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      size="lg"
      title="Log in"
      withCloseButton={false}
    >
      <AuthenticationForm />
    </Modal>
  );
}
