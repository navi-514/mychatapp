import {create} from 'zustand';

export const useAuthStore = create((set,get) => ({
    authUser: { name:"john",_id:123,age:30 },
    
    isLoggedIn:false,
    isLoggedIn,false,

    login: () => {
        console.log("login function called");
        set({isLoggedIn:true, isLoading:true});



    }
}))