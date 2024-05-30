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
        openSidebar: (state) => {
             state.isOpen = true;
        },
        closeSidebar: (state, ) => {
            state.isOpen = false;
        },
    },
});

export const {openSidebar,closeSidebar} = sidebarSlice.actions;

export default sidebarSlice.reducer;