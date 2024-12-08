import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Search {
  searchString: string;
}

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchString: localStorage.getItem('books-search') || '',
  },
  reducers: {
    updateSearchString(state, action: PayloadAction<string>) {
      state.searchString = action.payload;
    },
  },
});

export const { updateSearchString } = searchSlice.actions;

export default searchSlice.reducer;
