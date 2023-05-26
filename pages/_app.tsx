import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nunito } from "@next/font/google";
import { createContext, useState } from "react";

const nunito = Nunito({ subsets: ["latin"] });

type InitialStateType = {
  latLong: "";
  restaurants: [];
};

type AppContextData = {
  state: InitialStateType;
};

const AppContext = createContext<AppContextData | null>(null);

const AppProvider = ({ children }: any) => {
  const initialState: InitialStateType = {
    latLong: "",
    restaurants: [],
  };

  return (
    <AppContext.Provider value={{ state: initialState }}>
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
