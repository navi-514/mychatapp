import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const  useChatStore = create(() => ({
    allContacts: [],
    chats: [],
    messages: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    isSoundeEnabled: localStorage.getItem("isSoundeEnabled") === "true",

    toggleSound: () => {
        localStorage.setItem("isSoundeEnabled", get().isSoundeEnabled )
        set({ isSoundeEnabled: !get().isSoundeEnabled })
    },

    setActiveTab: (tab) => set ({ activeTab: tab }),
    setSelectedUser: (selectedUser) => set({ selectedUser: selectedUser }),
    getAllContacts: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data });
        }
        catch (error) {
            toast.error(error.response.data.message || "Failed to fetch contacts");
        }
        finally {
            set({ isUserLoading: false });
        }
    },
    getMyChatPartner: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data });
        }
        catch (error) {
            toast.error(error.response.data.message || "Failed to fetch contacts");
        }
        finally {
            set({ isUserLoading: false });
        }
    },
}))
