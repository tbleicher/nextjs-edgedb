import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { Profile } from '../types/user';

type ApiProfile = Omit<Profile, "userName">;

export type ProfileQueryResult = {
  profile: ApiProfile | null;
};

// setting staleTime avoids re-fetching of the same data
const STALE_TIME_MS = 5 * 60 * 60 * 1000; // 5 minutes

function getProfile(
  response: AxiosResponse<ProfileQueryResult, any>
): Profile | null {
  const { profile } = response.data;

  if (!profile) return null;

  return {
    ...profile,
    userName: `${profile.firstName} ${profile.lastName}`,
  };
}

export function useProfile(): { profile: Profile | null; loading: boolean } {
  const queryState = useQuery(
    ["profile"],
    () =>
      axios
        .get<ProfileQueryResult>("/api/profile")
        .then(getProfile)
        .catch((err) => {
          console.log(err);
          return null;
        }),
    {
      staleTime: STALE_TIME_MS,
    }
  );

  return { profile: queryState.data || null, loading: queryState.isLoading };
}
