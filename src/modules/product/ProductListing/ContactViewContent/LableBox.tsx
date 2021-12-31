import React from 'react';
import Box from '@material-ui/core/Box';

interface LabelBoxProps {
  name: string;
  color: string;
}

const LabelBox: React.FC<LabelBoxProps> = ({name, color}) => {
  return (
    <Box
      component='span'
      // ml={{xs: 'auto', sm: 4}}
      px={3}
      py={1}
      color='primary.contrastText'
      borderRadius='30px'
      fontSize={14}
      bgcolor={color}>
      {name}
    </Box>
  );
};

export default LabelBox;
