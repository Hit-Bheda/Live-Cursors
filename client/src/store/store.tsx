import { create } from "zustand";

interface StoreType {
    username: string
    setUsername: (username:string) => void
}

const useStore = create<StoreType>((set) => ({
    username: '',
    setUsername: (username:string) => set({ username: username }),
}))

export default useStore;