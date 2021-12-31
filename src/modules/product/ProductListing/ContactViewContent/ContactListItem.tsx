import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import ItemMenu from './ItemMenu';
import AppsStarredIcon from '../../../../@crema/core/AppsStarredIcon';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {ProductListObj} from '../../../../types/models/apps/ProductList';
import LabelBox from './LableBox';
import {blue, green, grey, red} from '@material-ui/core/colors';
import { Hidden } from '@material-ui/core';

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
      backgroundColor: grey[700],
      fontSize: 11,
    },
  }));

  const classes = useStyles();
  console.log('====================================');
  console.log(product.img && product.img[0].url);
  console.log('====================================');

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
        {/* 체크박스 */}
        <Box
          mr={{xs: 1, sm: 2}}
          component='span'
          onClick={(event) => event.stopPropagation()}>
          <Checkbox
            checked={checkedContacts.includes(product.id)}
            onChange={(event) => onChangeCheckedContacts(event, product.id)}
            color='primary'
          />
        </Box>

        {/* 진행중 토글 */}
        <Box component='span' flex={1} mx={2}>
          {product.activated === '0' ? (
            <LabelBox name='진행중' color={green[500]} />
          ) : (
            <LabelBox name='종료' color={grey[500]} />
          )}
        </Box>

        {/* 사진 */}
        <Box mr={3} component='span'>
          {product.img && product.img.length > 0 ? (
            <Avatar src={product.img[0].url} />
          ) : (
            <Avatar className={classes.avatar}>{'사진없음'}</Avatar>
          )}
        </Box>
        {/* 제품이름 */}
        <Box
          mr={4}
          fontWeight={Fonts.MEDIUM}
          component='span'
          flex={1.3}
          className={classes.truncate}>
          {product.productName}
        </Box>

        {/* 참여인원 */}
        <Box
          mr={4}
          fontWeight={Fonts.MEDIUM}
          component='span'
          flex={0.8}
          className={classes.truncate}>
          {product.joinPplCnt + ' / ' + product.totalPplCnt + ' 명'}
        </Box>

        {/*시작 종료 기간*/}
        <Box
          component='span'
          mr={4}
          flex={1.6}
          display={{xs: 'none', md: 'block'}}>
          <Box component='span' className={classes.truncate}>
            {product.startPeriod + '   ~   ' + product.endPeriod}
          </Box>
        </Box>

        {/* 제품가격 */}
        <Box
          component='span'
          mr={4}
          flex={0.8}
          display={{xs: 'none', sm: 'block'}}
          className={classes.truncate}>
          <Box component='span' className={classes.truncate}>
            {product.productPrice ? product.productPrice + ' 원' : null}
          </Box>
        </Box>

        {/* 카테고리 */}
        <Box
          component='span'
          mr={4}
          flex={0.8}
          display={{xs: 'none', sm: 'block'}}
          className={classes.truncate}>
          <Box component='span' className={classes.truncate}>
            {product.category}
          </Box>
        </Box>

        {/* 배송상태 */}
        <Box
          component='span'
          mr={4}
          flex={0.5}
          display={{xs: 'none', sm: 'block'}}
          className={classes.truncate}>
          <Box component='span' className={classes.truncate}>
            {product.deliveryMethod}
          </Box>
        </Box>

        {/* 별 */}
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
