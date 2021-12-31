import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {
  onDeleteProducts,
  onGetProductList,
  onUpdateStarredStatus,
} from '../../../redux/actions/ProductList';
import ContactHeader from './ContactHeader';
import ConfirmationDialog from '../../../@crema/core/ConfirmationDialog';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CreateProduct from '../ProductContact';
import {Hidden} from '@material-ui/core';
import ContactViewContent from './ContactViewContent';
import ProductDetail from '../ProductDetail';
import AppsPagination from '../../../@crema/core/AppsPagination';
import AppsHeader from '../../../@crema/core/AppsContainer/AppsHeader';
import AppsContent from '../../../@crema/core/AppsContainer/AppsContent';
import AppsFooter from '../../../@crema/core/AppsContainer/AppsFooter';
import {AppState} from '../../../redux/store';
import {ProductListObj} from '../../../types/models/apps/ProductList';

const ContactListing = () => {
  const dispatch = useDispatch();
  const {pathname} = useLocation();

  const {
    contactList,
    totalContacts,
  }: {contactList: ProductListObj[]; totalContacts: number} = useSelector<
    AppState,
    AppState['productList']
  >(({productList}) => productList);

  const [filterText, onSetFilterText] = useState('');
  const [page, setPage] = useState(0);
  const [pageView, setPageView] = useState<string>('list');
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [checkedContacts, setCheckedContacts] = useState<string[]>([]);
  const [toDeleteContacts, setToDeleteContacts] = useState<string[]>([]);
  const [isAddContact, onSetIsAddContact] = useState<boolean>(false);
  const [isShowDetail, onShowDetail] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<ProductListObj | null>(
    null,
  );

  const {loading} = useSelector<AppState, AppState['common']>(
    ({common}) => common,
  );

  useEffect(() => {
    setPage(0);
  }, [pathname]);

  useEffect(() => {
    const path = pathname.split('/');
    dispatch(
      onGetProductList(path[path.length - 2], path[path.length - 1], page),
    );
  }, [pathname, pageView, page, dispatch]);

  const handleAddContactOpen = () => {
    onSetIsAddContact(true);
  };

  const handleAddContactClose = () => {
    onSetIsAddContact(false);
  };

  const onViewContactDetail = (product: ProductListObj) => {
    setSelectedContact(product);
    onShowDetail(true);
  };

  const onOpenEditContact = (product: ProductListObj) => {
    setSelectedContact(product);
    handleAddContactOpen();
  };

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    value: number,
  ) => {
    setPage(value);
  };

  const onChangePageView = (view: string) => {
    setPageView(view);
  };

  const onChangeCheckedContacts = (event: any, id: string) => {
    if (event.target.checked) {
      setCheckedContacts(checkedContacts.concat(id));
    } else {
      setCheckedContacts(
        checkedContacts.filter((contactId) => contactId !== id),
      );
    }
  };

  const onChangeStarred = (status: boolean, product: ProductListObj) => {
    const selectedIdList = [product.id];
    const path = pathname.split('/');
    dispatch(
      onUpdateStarredStatus(selectedIdList, status, path[path.length - 1]),
    );
  };

  const onUpdateContact = (product: ProductListObj) => {
    setSelectedContact(product);
    handleAddContactClose();
  };

  const onGetFilteredItems = () => {
    if (filterText === '') {
      return contactList;
    } else {
      return contactList.filter((product: ProductListObj) =>
        product.productName.toUpperCase().includes(filterText.toUpperCase()),
      );
    }
  };

  const onDeleteSelectedContacts = () => {
    const path = pathname.split('/');
    dispatch(
      onDeleteProducts(
        path[path.length - 2],
        path[path.length - 1],
        toDeleteContacts,
        page,
      ),
    );
    setDeleteDialogOpen(false);
    setCheckedContacts([]);
  };

  const onSelectContactsForDelete = (contactIds: string[]) => {
    setToDeleteContacts(contactIds);
    setDeleteDialogOpen(true);
  };

  const list = onGetFilteredItems();

  return (
    <>
      <AppsHeader>
        <ContactHeader
          checkedContacts={checkedContacts}
          setCheckedContacts={setCheckedContacts}
          filterText={filterText}
          onSelectContactsForDelete={onSelectContactsForDelete}
          onSetFilterText={onSetFilterText}
          onPageChange={onPageChange}
          page={page}
          onChangePageView={onChangePageView}
          pageView={pageView}
        />
      </AppsHeader>
      <AppsContent>
        <ContactViewContent
          list={list}
          loading={loading}
          pageView={pageView}
          handleAddContactOpen={handleAddContactOpen}
          onChangeCheckedContacts={onChangeCheckedContacts}
          onChangeStarred={onChangeStarred}
          checkedContacts={checkedContacts}
          onSelectContactsForDelete={onSelectContactsForDelete}
          onViewContactDetail={onViewContactDetail}
          onOpenEditContact={onOpenEditContact}
        />
      </AppsContent>

      <Hidden smUp>
        {contactList.length > 0 ? (
          <AppsFooter>
            <AppsPagination
              count={totalContacts}
              page={page}
              onPageChange={onPageChange}
            />
          </AppsFooter>
        ) : null}
      </Hidden>

      {isAddContact ? (
        <CreateProduct
          isAddContact={isAddContact}
          handleAddContactClose={handleAddContactClose}
          selectContact={selectedContact}
          onUpdateContact={onUpdateContact}
        />
      ) : null}

      {isShowDetail ? (
        <ProductDetail
          selectedContact={selectedContact}
          isShowDetail={isShowDetail}
          onShowDetail={onShowDetail}
          onSelectContactsForDelete={onSelectContactsForDelete}
          onOpenEditContact={onOpenEditContact}
        />
      ) : null}

      {isDeleteDialogOpen ? (
        <ConfirmationDialog
          open={isDeleteDialogOpen}
          onDeny={setDeleteDialogOpen}
          onConfirm={onDeleteSelectedContacts}
          title={<IntlMessages id='product.deleteContact' />}
          dialogTitle={<IntlMessages id='common.deleteItem' />}
        />
      ) : null}
    </>
  );
};

export default ContactListing;
