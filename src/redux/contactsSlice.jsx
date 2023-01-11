import { createSlice } from '@reduxjs/toolkit';

const initialContacts = [
  { id: 'id-1', name: 'Keanu Charles Reeves', number: '459-12-33' },
  { id: 'id-2', name: 'Anthony Kiedis', number: '573-89-12' },
  { id: 'id-3', name: ' Matthew Paige Damon', number: '645-57-79' },
  { id: 'id-4', name: 'Adele Laurie Blue Adkins', number: '227-91-57' },
];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: initialContacts,
    filter: '',
  },
  reducers: {
    addContacts(state, action) {
      state.items = [...state.items, action.payload];
    },
    deleteContacts(state, action) {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
    filterContacts(state, action) {
      state.filter = action.payload;
    },
    сlearFilter(state) {
      state.filter = '';
    },
  },
});

export const { addContacts, deleteContacts, filterContacts, сlearFilter } =
  contactsSlice.actions;

export default contactsSlice.reducer;

export const getItem = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;
