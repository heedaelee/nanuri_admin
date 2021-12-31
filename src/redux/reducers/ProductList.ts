import {
  ProductListActionTypes,
  CREATE_NEW_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT_FOLDER_LIST,
  GET_PRODUCT_LIST,
  TOGGLE_PRODUCT_DRAWER,
  UPDATE_PRODUCT_DETAIL,
  UPDATE_PRODUCT_STARRED_STATUS,
} from '../../types/actions/ProductList.action';

import {ProductListObj, FolderObj} from '../../types/models/apps/ProductList';

const initialState: {
  contactList: ProductListObj[];
  totalContacts: number;
  contactDrawer: false;
  folderList: FolderObj[];
  selectedContact: ProductListObj | null;
} = {
  contactList: [],
  totalContacts: 0,
  contactDrawer: false,
  folderList: [],
  selectedContact: null,
};

const contactReducer = (
  state = initialState,
  action: ProductListActionTypes,
) => {
  switch (action.type) {
    case GET_PRODUCT_LIST:
      return {
        ...state,
        contactList: action.payload.list,
        totalContacts: action.payload.total,
      };

    case GET_PRODUCT_FOLDER_LIST:
      return {
        ...state,
        folderList: action.payload,
      };

    case TOGGLE_PRODUCT_DRAWER:
      return {
        ...state,
        contactDrawer: !state.contactDrawer,
      };

    case CREATE_NEW_PRODUCT:
      return {
        ...state,
        contactList: [action.payload, ...state.contactList],
        totalContacts: state.totalContacts + 1,
      };

    case DELETE_PRODUCT: {
      return {
        ...state,
        contactList: action.payload.list,
        totalContacts: action.payload.total,
      };
    }

    case UPDATE_PRODUCT_STARRED_STATUS: {
      let contactIds = action.payload.data.map((contact) => contact.id);
      const updatedList = state.contactList.map((contact) => {
        if (contactIds.includes(contact.id)) {
          return action.payload.data.find(
            (selectedContact) => selectedContact.id === contact.id,
          );
        } else {
          return contact;
        }
      });
      const filteredList =
        action.payload.folderName === 'starred'
          ? updatedList.filter((item) => item!.isStarred)
          : updatedList;
      const total =
        action.payload.folderName === 'starred'
          ? state.totalContacts - action.payload.data.length
          : state.totalContacts;
      return {
        ...state,
        contactList: filteredList,
        totalContacts: total,
      };
    }

    case UPDATE_PRODUCT_DETAIL:
      return {
        ...state,
        selectedContact: action.payload,
        contactList: state.contactList.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact,
        ),
      };

    default:
      return state;
  }
};
export default contactReducer;
