import ProductListData from '../../db/product/productList';
import mock from '../../MockConfig';
import folderList from '../../db/folderList';

import {AxiosRequestConfig} from 'axios';
// import {UserListObj} from '../../../../types/models/apps/UserList';
import {ProductListObj} from '../../../../types/models/apps/ProductList';

/* 
'21/12/30
product API 호출 받을떄
/api/product ~ 로 진행한다

ex) /api/product/folders/list  get 리스트 호출

userList랑 다르게 product는 
url 패턴에서 
/api/contactApp/folders/list 
중 folders 부분 즉 type을 없애고(이유:Label이 없으니 필요 x)
/api/product/list | all | frequent | starred
패턴으로 한 dept 생략 구현한다!
*/

let productList = ProductListData;

mock.onGet('/api/product/folders/list').reply(200, folderList);

mock.onGet('/api/product/List').reply((config: AxiosRequestConfig) => {
  const params = config.params;
  let folderProductList: ProductListObj[];

  if (params.name === 'starred') {
    folderProductList = productList.filter((product) => product.isStarred);
  } else {
    folderProductList = productList;
  }

  //페이징
  const index = params.page * 15;
  const total = folderProductList.length;
  const list =
    folderProductList.length > 15
      ? folderProductList.slice(index, index + 15)
      : folderProductList;
  // [전송콛, {리스트데이터, (조건이 있다면 해당되는)총 자료수}]
  return [200, {list, total}];
});

mock
  .onPut('/api/product/update/starred')
  .reply((request: AxiosRequestConfig) => {
    const {contactIds, status} = JSON.parse(request.data);
    productList = productList.map((contact) => {
      if (contactIds.includes(contact.id)) {
        contact.isStarred = !!status;
        return contact;
      } else {
        return contact;
      }
    });
    const updatedList = productList.filter((contact) =>
      contactIds.includes(contact.id),
    );
    return [200, updatedList];
  });

mock
  .onPost('/api/product/delete/contact')
  .reply((request: AxiosRequestConfig) => {
    const {contactIds, type, name, page} = JSON.parse(request.data);
    let folderContactList: ProductListObj[];

    if (name === 'starred') {
      productList = productList.filter(
        (contact) => !contactIds.includes(contact.id),
      );
      folderContactList = productList.filter((contact) => contact.isStarred);
    } else {
      productList = productList.filter(
        (contact) => !contactIds.includes(contact.id),
      );
      folderContactList = productList;
    }

    const index = page * 15;
    const total = folderContactList.length;
    const list =
      folderContactList.length > 15
        ? folderContactList.slice(index, index + 15)
        : folderContactList;
    return [200, {list, total}];
  });

mock.onPut('/api/product/').reply((request: AxiosRequestConfig) => {
  const {contact} = JSON.parse(request.data);
  productList = productList.map((item) =>
    item.id === contact.id ? contact : item,
  );
  return [200, contact];
});

mock.onPost('/api/product/compose').reply((request: AxiosRequestConfig) => {
  const {contact} = JSON.parse(request.data);
  productList = [contact, ...productList];
  return [200, contact];
});

mock.onGet('/api/product/').reply((config: AxiosRequestConfig) => {
  const params = config.params;
  const response = productList.find((contact) => contact.id === params.id);
  return [200, response];
});
