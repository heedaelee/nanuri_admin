import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {onGetFolderList} from '../../redux/actions/UserList';
import ContactListing from './ContactListing';
import {useIntl} from 'react-intl';
import AppsContainer from '../../@crema/core/AppsContainer';
import SideBarContent from './ContactSideBar';

const Contact = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetFolderList());
  }, [dispatch]);

  const {messages} = useIntl();
  return (
    <AppsContainer
      title={messages['contactApp.contact'] as string}
      sidebarContent={<SideBarContent />}>
      <ContactListing />
    </AppsContainer>
  );
};

export default Contact;
