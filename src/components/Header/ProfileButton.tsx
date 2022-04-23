import React from 'react';
import { ChevronDown } from 'tabler-icons-react';

import { Avatar, Group, Text } from '@mantine/core';

import { useProfile } from '../../hooks/useProfile';
import { Profile } from '../../types/user';

const getUsername = (profile: Profile | null, loading: boolean) => {
  if (loading) return "loading ...";
  if (!profile) return "log in";
  return profile.userName;
};

export function ProfileButton() {
  const { profile, loading } = useProfile();

  return (
    <Group spacing={7}>
      <Avatar
        src={profile?.imageUrl || ""}
        alt="profile image"
        radius="xl"
        size={36}
      />
      <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
        {getUsername(profile, loading)}
      </Text>
      <ChevronDown size={12} />
    </Group>
  );
}
