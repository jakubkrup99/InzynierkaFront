import { createContext, useContext, useState, type ReactNode } from "react";

interface SearchContextType {
  searchPhrase: string;
  setSearchPhrase: (value: string) => void;
}
const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchPhrase, setSearchPhrase] = useState("");
  return (
    <SearchContext.Provider value={{ searchPhrase, setSearchPhrase }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchPhrase() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error("useSearchPhrase must be used within a SearchProvider");
  }
  return ctx;
}
