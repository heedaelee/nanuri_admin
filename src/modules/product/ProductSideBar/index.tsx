import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Scrollbar from '../../../@crema/core/Scrollbar';
import CreateProduct from '../ProductContact';
import AppsSideBarFolderItem from '../../../@crema/core/AppsSideBarFolderItem';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppList from '../../../@crema/core/AppList';
import AppAnimate from '../../../@crema/core/AppAnimate';
import ListEmptyResult from '../../../@crema/core/AppList/ListEmptyResult';
import SidebarPlaceholder from '../../../@crema/core/Skeleton/SidebarListSkeleton';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {AppState} from '../../../redux/store';

const useStyles = makeStyles((theme: CremaTheme) => ({
  btnRoot: {
    width: '100%',
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: Fonts.MEDIUM,
  },
  listRoot: {
    marginBottom: 8,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 20,
    },
  },
}));

const SideBarContent: React.FC<{}> = () => {
  const {folderList} = useSelector<AppState, AppState['productList']>(
    ({productList}) => productList,
  );

  const [isAddContact, onSetIsAddContact] = useState(false);

  const handleAddContactOpen = () => {
    onSetIsAddContact(true);
  };

  const handleAddContactClose = () => {
    onSetIsAddContact(false);
  };

  const classes = useStyles();

  return (
    <>
      {/*제품 추가*/}
      <Box px={{xs: 4, md: 5}} pt={{xs: 4, md: 5}} pb={{xs: 2, xl: 5}}>
        <AppAnimate>
          <Button
            variant='contained'
            color='secondary'
            className={classes.btnRoot}
            onClick={handleAddContactOpen}>
            <IntlMessages id='product.createProduct' />
          </Button>
        </AppAnimate>
      </Box>

      <Scrollbar className='scroll-app-sidebar'>
        <Box
          px={{xs: 4, md: 5, lg: 6, xl: 8}}
          pb={{xs: 4, md: 5, lg: 6, xl: 8}}
          pt={0}>
          <List
            className={classes.listRoot}
            component='nav'
            aria-label='main task folders'>
            <AppList
              animation='transition.slideLeftIn'
              data={folderList}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={true}
                  placeholder={<SidebarPlaceholder />}
                />
              }
              renderRow={(item) => (
                <AppsSideBarFolderItem
                  key={item.id}
                  item={item}
                  path={`/product/folder/${item.alias}`}
                />
              )}
            />
          </List>
          {isAddContact ? (
            <CreateProduct
              isAddContact={isAddContact}
              handleAddContactClose={handleAddContactClose}
            />
          ) : null}
        </Box>
      </Scrollbar>
    </>
  );
};

export default SideBarContent;
