import React from 'react';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppleIcon from '@material-ui/icons/Apple';
import TwitterIcon from '@material-ui/icons/Twitter';
import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
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

interface SocialMediaProps {
  contact: ProductListObj;
}

const SocialMedia: React.FC<SocialMediaProps> = ({contact}) => {
  const classes = useStyles();
  return (
    <Box
      pr={{xs: 5, lg: 8, xl: 10}}
      py={5}
      className={classes.borderBottomClass}>
      <Box component='h6' mb={2} fontWeight={Fonts.MEDIUM} fontSize={16}>
        <IntlMessages id='common.socialMedia' />
      </Box>

      <Box px={{xs: 5, lg: 8, xl: 10}}>
        <Box mb={2} display='flex' alignItems='center'>
          <AppleIcon className={classes.iconRoot} />
          <Box ml={2} color='text.secondary' fontSize={14}>
            {contact.category ? (
              contact.category
            ) : (
              <IntlMessages id='common.na' />
            )}
          </Box>
        </Box>

        <Box display='flex' alignItems='center'>
          <TwitterIcon className={classes.iconRoot} />
          <Box ml={2} color='text.secondary' fontSize={14}>
            {contact.deliveryMethod ? (
              contact.deliveryMethod
            ) : (
              <IntlMessages id='common.na' />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SocialMedia;
