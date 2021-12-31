import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import {makeStyles} from '@material-ui/core/styles';
import {ProductListObj} from '../../../../types/models/apps/ProductList';

const useStyles = makeStyles(() => ({
  pointer: {
    cursor: 'pointer',
  },
}));

interface ItemMenuProps {
  onSelectContactsForDelete: (ids: string[]) => void;
  product: ProductListObj;
  onChangeStarred: (isStarred: boolean, product: ProductListObj) => void;
  onOpenEditContact: (product: ProductListObj) => void;
}

const ItemMenu: React.FC<ItemMenuProps> = ({
  onSelectContactsForDelete,
  product: product,
  onChangeStarred,
  onOpenEditContact,
}) => {
  const [isMoreIcon, onOpenMoreIcon] = React.useState<null | HTMLElement>(null);

  const onViewMoreOpen = (event: any) => {
    onOpenMoreIcon(event.currentTarget);
  };

  const onViewMoreClose = () => {
    onOpenMoreIcon(null);
  };

  const onDeleteContact = () => {
    onSelectContactsForDelete([product.id]);
    onViewMoreClose();
  };

  const onChangeStarredStatus = () => {
    onChangeStarred(!product.isStarred, product);
    onViewMoreClose();
  };

  const onClickEditOption = () => {
    onOpenEditContact(product);
    onViewMoreClose();
  };

  const classes = useStyles();

  return (
    <>
      <Tooltip title={<IntlMessages id='common.more' />}>
        <MoreVertIcon className={classes.pointer} onClick={onViewMoreOpen} />
      </Tooltip>
      <Menu
        anchorEl={isMoreIcon}
        open={Boolean(isMoreIcon)}
        onClose={onViewMoreClose}>
        <MenuItem onClick={onChangeStarredStatus}>
          {product.isStarred ? (
            <IntlMessages id='common.unstarred' />
          ) : (
            <IntlMessages id='common.starred' />
          )}
        </MenuItem>

        <MenuItem onClick={onClickEditOption}>
          <IntlMessages id='common.edit' />
        </MenuItem>
        <MenuItem onClick={onDeleteContact}>
          <IntlMessages id='common.delete' />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ItemMenu;
