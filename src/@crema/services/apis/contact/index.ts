import UserListData from '../../db/apps/userList/userList';
import mock from '../../MockConfig';
import folderList from '../../db/apps/userList/folderList';

import {AxiosRequestConfig} from 'axios';
import {UserListObj} from '../../../../types/models/apps/UserList';

let userList = UserListData;

mock.onGet('/api/contactApp/folders/list').reply(200, folderList);

mock
  .onGet('/api/contactApp/contact/List')
  .reply((config: AxiosRequestConfig) => {
    const params = config.params;
    let folderContactList: UserListObj[];
    
    

    if (params.name === 'starred') {
      folderContactList = userList.filter((contact) => contact.isStarred);
    } else if (params.name === 'frequent') {
      folderContactList = userList.filter((contact) => contact.isFrequent);
    } else {
      folderContactList = userList;
    }

    const index = params.page * 15;
    const total = folderContactList.length;
    const list =
      folderContactList.length > 15
        ? folderContactList.slice(index, index + 15)
        : folderContactList;
    return [200, {list, total}];
  });

mock
  .onPut('/api/contactApp/update/starred')
  .reply((request: AxiosRequestConfig) => {
    const {contactIds, status} = JSON.parse(request.data);
    userList = userList.map((contact) => {
      if (contactIds.includes(contact.id)) {
        contact.isStarred = !!status;
        return contact;
      } else {
        return contact;
      }
    });
    const updatedList = userList.filter((contact) =>
      contactIds.includes(contact.id),
    );
    return [200, updatedList];
  });

mock
  .onPost('/api/contactApp/delete/contact')
  .reply((request: AxiosRequestConfig) => {
    const {contactIds, type, name, page} = JSON.parse(request.data);
    let folderContactList: UserListObj[];

    if (name === 'starred') {
      userList = userList.filter((contact) => !contactIds.includes(contact.id));
      folderContactList = userList.filter((contact) => contact.isStarred);
    } else if (name === 'frequent') {
      userList = userList.filter((contact) => !contactIds.includes(contact.id));
      folderContactList = userList.filter((contact) => contact.isFrequent);
    } else {
      userList = userList.filter((contact) => !contactIds.includes(contact.id));
      folderContactList = userList;
    }

    const index = page * 15;
    const total = folderContactList.length;
    const list =
      folderContactList.length > 15
        ? folderContactList.slice(index, index + 15)
        : folderContactList;
    return [200, {list, total}];
  });

mock.onPut('/api/contactApp/contact/').reply((request: AxiosRequestConfig) => {
  const {contact} = JSON.parse(request.data);
  userList = userList.map((item) => (item.id === contact.id ? contact : item));
  return [200, contact];
});

mock.onPost('/api/contactApp/compose').reply((request: AxiosRequestConfig) => {
  const {contact} = JSON.parse(request.data);
  userList = [contact, ...userList];
  return [200, contact];
});

mock.onGet('/api/contactApp/contact/').reply((config: AxiosRequestConfig) => {
  const params = config.params;
  const response = userList.find(
    (contact) => contact.id === parseInt(params.id),
  );
  return [200, response];
});
