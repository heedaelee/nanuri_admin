import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import AppGrid from '../../../../@crema/core/AppGrid';
import AppList from '../../../../@crema/core/AppList';
import ListEmptyResult from '../../../../@crema/core/AppList/ListEmptyResult';
import ContactListSkeleton from '../../../../@crema/core/Skeleton/ContactListSkeleton';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {ProductListObj} from '../../../../types/models/apps/ProductList';
import ContactGridItem from './ContactGridItem';
import ContactListItem from './ContactListItem';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}));

interface ContactViewContentProps {
  list: ProductListObj[];
  pageView: string;
  loading: boolean;
  handleAddContactOpen: () => void;
  onChangeStarred: (isStarred: boolean, contact: ProductListObj) => void;
  onChangeCheckedContacts: (event: any, id: string) => void;
  checkedContacts: string[];
  onSelectContactsForDelete: (contactIds: string[]) => void;
  onOpenEditContact: (contact: ProductListObj) => void;
  onViewContactDetail: (contact: ProductListObj) => void;
}

const ContactViewContent: React.FC<ContactViewContentProps> = ({
  list,
  pageView,
  loading,
  handleAddContactOpen,
  onChangeStarred,
  onChangeCheckedContacts,
  checkedContacts,
  onSelectContactsForDelete,
  onOpenEditContact,
  onViewContactDetail,
}) => {
  const classes = useStyles();
  let test = 0;
  // console.log('======================ContactViewContent.tsx');
  // console.log(list);
  // console.log('====================================');
  return (
    <>
      {/* list 아니면 grid지 뭐.. */}
      {pageView === 'list' ? (
        <AppList
          data={list}
          animation='transition.slideUpIn'
          className={classes.root}
          ListEmptyComponent={
            <ListEmptyResult
              loading={loading}
              actionTitle={<IntlMessages id='contactApp.createContact' />}
              onClick={handleAddContactOpen}
              placeholder={<ContactListSkeleton />}
            />
          }

          renderRow={(product) => (
            <ContactListItem
              key={product.id}
              product={product}
              onChangeCheckedContacts={onChangeCheckedContacts}
              checkedContacts={checkedContacts}
              onSelectContactsForDelete={onSelectContactsForDelete}
              onChangeStarred={onChangeStarred}
              onViewContactDetail={onViewContactDetail}
              onOpenEditContact={onOpenEditContact}
            />
          )}
        />
      ) : (
        <Box p={6}>
          <AppGrid
            responsive={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 3,
            }}
            data={list}
            renderRow={(contact) => {
              return (
                <ContactGridItem
                  key={contact.id}
                  contact={contact}
                  onChangeCheckedContacts={onChangeCheckedContacts}
                  checkedContacts={checkedContacts}
                  onChangeStarred={onChangeStarred}
                  onSelectContactsForDelete={onSelectContactsForDelete}
                  onViewContactDetail={onViewContactDetail}
                  onOpenEditContact={onOpenEditContact}
                />
              );
            }}
          />
        </Box>
      )}
    </>
  );
};
export default ContactViewContent;
