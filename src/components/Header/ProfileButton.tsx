import { Avatar, Group, Text } from "@mantine/core";
import { ChevronDown } from "tabler-icons-react";
import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { Profile } from "../../types/user";

type ProfileQueryResult = {
  profile: Profile | null;
};

function useProfile() {
  return useQuery<ProfileQueryResult>(
    "profile",
    () =>
      axios.get("/api/profile").then((data) => {
        return data?.data;
      }),
    { onError: (err) => console.log(err) }
  );
}

function getName(queryResult: UseQueryResult<ProfileQueryResult>) {
  const { data, isLoading } = queryResult;
  if (isLoading) return "loading ...";
  if (!data?.profile) return "log in";

  return `${data.profile.firstName} ${data.profile.lastName}`;
}

export function ProfileButton() {
  const result = useProfile();
  const { profile } = result.data || {};

  return (
    <Group spacing={7}>
      <Avatar
        src={profile?.imageUrl || ""}
        alt="profile image"
        radius="xl"
        size={36}
      />
      <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
        {getName(result)}
      </Text>
      <ChevronDown size={12} />
    </Group>
  );
}
