export enum PoolType {
  NFTE = 0,
  EARTHLING = 1,
  ROBOROVER = 2,
  NFW3C = 3,
}

export type PoolData = {
  [key in PoolType]: {
    name: string;
    stakedAmount?: number;
    rewardPoolPerHour?: number;
    rewardPoolPerDay?: number;
    rewardPerHour?: number;
    rewardPerDay?: number;
    apr?: number;
  };
};

export enum Amount {
  PerNfte = "PerNfte",
  Max = "Max",
}
