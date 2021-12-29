import React from 'react';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import BusinessIcon from '@material-ui/icons/Business';
import HomeIcon from '@material-ui/icons/Home';
import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../shared/constants/AppEnums';
import {UserListObj} from '../../../types/models/apps/UserList';

interface OtherDetailsProps {
  contact: UserListObj;
}

const useStyles = makeStyles((s) => ({
  borderBottomClass: {
    borderBottom: `1px solid ${grey[300]}`,
  },
  businessIconRoot: {
    fontSize: 16,
    color: 'grey.600',
  },
}));

const OtherDetails: React.FC<OtherDetailsProps> = ({contact}) => {
  const classes = useStyles();
  return (
    <Box
      pr={{xs: 5, lg: 8, xl: 10}}
      py={5}
      className={classes.borderBottomClass}>
      <Box component='h6' mb={2} fontWeight={Fonts.MEDIUM} fontSize={16}>
        <IntlMessages id='common.otherDetails' />
      </Box>

      <Box px={{xs: 5, lg: 8, xl: 10}}>
        <Box display='flex' alignItems='center'>
          <HomeIcon className={classes.businessIconRoot} />
          <Box ml={2} color='text.secondary' fontSize={14}>
            {contact!.address ? (
              contact!.address
            ) : (
              <IntlMessages id='common.na' />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OtherDetails;
