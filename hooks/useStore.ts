import { BigNumber, constants } from "ethers";
import produce from "immer";
import create from "zustand";
import { devtools } from "zustand/middleware";

import { EventData } from "../types/event";
import { TimeFrame } from "../types/timeframe";
import { Amount } from "../types/data";

interface AppState {
  autoConnecting: boolean;
  setAutoConnecting: (autoConnecting: boolean) => void;

  events: EventData[];
  addEvent: (event: EventData) => void;
  setEvents: (events: EventData[]) => void;

  timeframe: TimeFrame;
  setTimeframe: (timeframe: TimeFrame) => void;

  amount: Amount;
  setAmount: (amount: Amount) => void;

  NfteBalance: BigNumber | undefined;
  setNfteBalance: (balance: BigNumber | undefined) => void;
}

const useStore = create<AppState>()(
  devtools((set) => ({
    autoConnecting: false,
    setAutoConnecting: (autoConnecting) => {
      set(() => ({ autoConnecting: autoConnecting }));
    },
    timeframe: TimeFrame.Daily,
    setTimeframe: (newTimeframe) => {
      set(() => ({ timeframe: newTimeframe }));
    },
    amount: Amount.PerNfte,
    setAmount: (newAmount) => {
      set(() => ({ amount: newAmount }));
    },
    NfteBalance: undefined,
    setNfteBalance: (balance: any) => {
      set(() => ({ NfteBalance: balance }));
    },
    events: [],
    addEvent: (newEvent) => {
      set(
        produce((state) => {
          if (newEvent.amount.gt(constants.Zero)) {
            if (state.events.length >= 10) {
              state.events.pop();
            }
            state.events.unshift(newEvent);
          }
        })
      );
    },
    setEvents: (newEvents) => {
      set(
        produce((state) => {
          for (let i = 0; i < newEvents.length; i++) {
            const newEvent = newEvents[i];
            if (newEvent.amount.gt(constants.Zero)) {
              if (state.events.length >= 10) {
                state.events.pop();
              }
              state.events.unshift(newEvent);
            }
          }
        })
      );
    },
  }))
);

export default useStore;
