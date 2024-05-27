import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface sidebarState {
    isOpen: boolean
}

const initialState: sidebarState = {
    isOpen: false
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        openSidebar: (state,action) => {
            console.log(state,'state')
             state.isOpen = true;
        },
        closeSidebar: (state, action: PayloadAction<sidebarState>) => {
            state.isOpen = false;
        },
    },
});

export const {openSidebar,closeSidebar} = sidebarSlice.actions;

export default sidebarSlice.reducer;