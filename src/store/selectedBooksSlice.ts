import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Book } from '../types';

const initialState: Book[] = [];

const selectedBooksSlice = createSlice({
  name: 'selectedBooks',
  initialState,
  reducers: {
    addBookToSelected(state, action: PayloadAction<Book>) {
      state.push(action.payload);
    },
    removeBookFromSelected(state, action: PayloadAction<number>) {
      return state.filter((item: Book) => item.id !== action.payload);
    },
    removeAllBooksFromSelected() {
      return initialState;
    },
  },
});

export const {
  addBookToSelected,
  removeBookFromSelected,
  removeAllBooksFromSelected,
} = selectedBooksSlice.actions;

export default selectedBooksSlice.reducer;
