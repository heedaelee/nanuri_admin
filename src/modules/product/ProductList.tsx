import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {onGetFolderList} from '../../redux/actions/UserList';
import ContactListing from './ProductListing';
import {useIntl} from 'react-intl';
import AppsContainer from '../../@crema/core/AppsContainer';
import SideBarContent from './ProductSideBar';

const Product = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetFolderList());
  }, [dispatch]);

  const {messages} = useIntl();
  return (
    <AppsContainer
      title={messages['product'] as string}
      sidebarContent={<SideBarContent />}>
      <ContactListing />
    </AppsContainer>
  );
};

export default Product;
