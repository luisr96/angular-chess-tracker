export interface IProfileData {
  avatar: string;
  player_id: number;
  '@id': string;
  url: string;
  username: string;
  followers: number;
  country: string;
  last_online: number;
  joined: number;
  status: string;
  is_streamer: boolean;
  verified: boolean;
  league: string;
  streaming_platforms: string[];
}

export const defaultProfileData = {
  avatar: '',
  player_id: 0,
  '@id': '',
  url: '',
  username: '',
  followers: 0,
  country: '',
  last_online: 0,
  joined: 0,
  status: '',
  is_streamer: false,
  verified: false,
  league: '',
  streaming_platforms: [],
};
