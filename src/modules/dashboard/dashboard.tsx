import React from 'react';
import Box from '@material-ui/core/Box';
import AppAnimate from '../../@crema/core/AppAnimate';

const dashboard = () => {
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box>
        <Box component='h4' mb={3} fontSize={20}>
          Page 삼
        </Box>
        <Box component='p' fontSize={16}>
          여기부터시작ㅌ
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default dashboard;
