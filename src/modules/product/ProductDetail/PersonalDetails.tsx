import Box from '@material-ui/core/Box';
import {grey} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import React from 'react';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../shared/constants/AppEnums';
import {ProductListObj} from '../../../types/models/apps/ProductList';

const useStyles = makeStyles(() => ({
  borderBottomClass: {
    borderBottom: `1px solid ${grey[300]}`,
  },
  iconRoot: {
    fontSize: 16,
    color: 'grey.600',
  },
}));

interface PersonalDetailsProps {
  contact: ProductListObj;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({contact}) => {
  const classes = useStyles();
  return (
    <Box
      pr={{xs: 5, lg: 8, xl: 10}}
      pb={5}
      className={classes.borderBottomClass}>
      <Box component='h6' mb={2} fontWeight={Fonts.MEDIUM} fontSize={16}>
        <IntlMessages id='product.productDetails' />
      </Box>
      <Box px={{xs: 5, lg: 8, xl: 10}}>
        <Box mb={2} display='flex' alignItems='center'>
          {' '}
          <Box
            mr={2}
            fontSize={16}
            color='text.secondary'
            className={classes.iconRoot}>
            <IntlMessages id='product.price' />
          </Box>
          <Box ml={2} fontSize={14} color='text.secondary'>
            {contact.productPrice}
          </Box>
        </Box>

        <Box mb={2} display='flex' alignItems='center'>
          {' '}
          <Box
            mr={2}
            fontSize={16}
            color='text.secondary'
            className={classes.iconRoot}>
            <IntlMessages id='product.ppl' />
          </Box>
          <Box ml={2} fontSize={14} color='text.secondary'>
            {contact.joinPplCnt + '  /  ' + contact.totalPplCnt}
          </Box>
        </Box>

        구현중..
      </Box>
    </Box>
  );
};

export default PersonalDetails;
