import {Map} from "./types/map";

export const NFTE_STAKING_CONTRACT_ADDRESS = '0xb37cd5fF087116B6Af620C69DeC2a03Ca5e5CaDe';
export const NFTE_TOKEN_ADDRESS = '0x51b902f19a56f0c8e409a34a215ad2673edf3284';
export const WETH_TOKEN_ADDRESS = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1';
export const CHAIN_ID = 42161

export const stakingContractAddresses: Map = {
  42161: NFTE_STAKING_CONTRACT_ADDRESS,
} as const;

export const nfteContractAddresses: Map = {
  42161: NFTE_TOKEN_ADDRESS,
};