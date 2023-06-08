import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nunito } from "@next/font/google";
import { createContext, useReducer, useState } from "react";

const nunito = Nunito({ subsets: ["latin"] });

type RestaurantObjectType = {
  address: string;
  neighborhood: string;
  name: string;
  id: string;
  imgUrl: string;
};

type InitialStateType = {
  latLong: string;
  restaurants: RestaurantObjectType[];
};

const initialState: InitialStateType = {
  latLong: "",
  restaurants: [],
};

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_RESTAURANTS: "SET_RESTAURANTS",
};

export type AppContextType = {
  state: InitialStateType;
  dispatch: React.Dispatch<LatLongAction>;
};
interface LatLongAction {
  type: "SET_LAT_LONG" | "SET_RESTAURANTS";
  payload: InitialStateType;
}

const appReducer = (state: InitialStateType, action: LatLongAction) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return {
        ...state,
        latLong: action.payload.latLong,
      };
    }
    case ACTION_TYPES.SET_RESTAURANTS: {
      return { ...state, restaurants: action.payload.restaurants };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const AppContext = createContext<AppContextType | null>(null);

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <div className={nunito.className}>
        <Component {...pageProps} />
      </div>
    </AppProvider>
  );
}
