import {Map} from "./types/map";

export const NFTE_STAKING_CONTRACT_ADDRESS = '0xe57bd15448c3b2d1dbad598775dd2f36f93ebf90';
export const NFTE_TOKEN_ADDRESS = '0x492Fa53b88614923937B7197C87E0F7F8EEb7B20';
export const WETH_TOKEN_ADDRESS = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619';
export const CHAIN_ID = 137

export const stakingContractAddresses: Map = {
  137: NFTE_STAKING_CONTRACT_ADDRESS,
} as const;

export const nfteContractAddresses: Map = {
  137: NFTE_TOKEN_ADDRESS,
};
