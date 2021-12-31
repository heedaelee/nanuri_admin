import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import ItemMenu from './ItemMenu';
import AppsStarredIcon from '../../../../@crema/core/AppsStarredIcon';
import {makeStyles} from '@material-ui/core/styles';
import {blue, grey} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {ProductListObj} from '../../../../types/models/apps/ProductList';

interface ContactListItemProps {
  product: ProductListObj;
  onChangeStarred: (isStarred: boolean, product: ProductListObj) => void;
  onChangeCheckedContacts: (event: any, id: string) => void;
  checkedContacts: string[];
  onSelectContactsForDelete: (contactIds: string[]) => void;
  onOpenEditContact: (product: ProductListObj) => void;
  onViewContactDetail: (product: ProductListObj) => void;

  [x: string]: any;
}

const ContactListItem: React.FC<ContactListItemProps> = ({
  product: product,
  onChangeCheckedContacts,
  checkedContacts,
  onChangeStarred,
  onSelectContactsForDelete,
  onViewContactDetail,
  onOpenEditContact,
}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottom: `1px solid ${grey[300]}`,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 20,
      paddingRight: 20,
      cursor: 'pointer',
      '&.rootCheck': {
        fontWeight: Fonts.LIGHT,
        backgroundColor: grey[200],
      },
    },
    truncate: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    avatar: {
      backgroundColor: blue[500],
    },
  }));

  const classes = useStyles();

  return (
    <>
      <ListItem
        dense
        button
        key={product.id}
        className={clsx(classes.root, 'item-hover', {
          rootCheck: checkedContacts.includes(product.id),
        })}
        onClick={() => onViewContactDetail(product)}>
        <Box
          mr={{xs: 2, sm: 4}}
          component='span'
          onClick={(event) => event.stopPropagation()}>
          <Checkbox
            checked={checkedContacts.includes(product.id)}
            onChange={(event) => onChangeCheckedContacts(event, product.id)}
            color='primary'
          />
        </Box>
        <Box mr={3} component='span'>
          {/* {product.image ? (
            <Avatar src={product.image} />
          ) : (
            <Avatar className={classes.avatar}>
              {product.name[0].toUpperCase()}
            </Avatar>
          )} */}
        </Box>
        <Box
          mr={4}
          fontWeight={Fonts.MEDIUM}
          component='span'
          flex={1}
          className={classes.truncate}>
          {product.productName}
        </Box>

        <Box
          component='span'
          mr={4}
          flex={1}
          display={{xs: 'none', sm: 'block'}}
          className={classes.truncate}>
          <Box component='span' className={classes.truncate}>
            {product.productPrice ? product.productPrice : null}
          </Box>
        </Box>
        <Box
          component='span'
          mr={4}
          flex={1}
          display={{xs: 'none', md: 'block'}}>
          <Box component='span' className={classes.truncate}>
            {product.productName}
          </Box>
        </Box>

        <Box
          component='span'
          ml='auto'
          mr={{xl: 4}}
          display='flex'
          alignItems='center'>
          <Box component='span' onClick={(event) => event.stopPropagation()}>
            <AppsStarredIcon item={product} onChange={onChangeStarred} />
          </Box>

          <Box
            component='span'
            ml={2}
            onClick={(event) => event.stopPropagation()}>
            <ItemMenu
              onSelectContactsForDelete={onSelectContactsForDelete}
              product={product}
              onChangeStarred={onChangeStarred}
              onOpenEditContact={onOpenEditContact}
            />
          </Box>
        </Box>
      </ListItem>
    </>
  );
};

export default ContactListItem;
