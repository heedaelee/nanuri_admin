import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import LabelSharpIcon from '@material-ui/icons/LabelSharp';
import React from 'react';
import IntlMessages from '../../../../@crema/utility/IntlMessages';

const useStyles = makeStyles(() => ({
  pointer: {
    cursor: 'pointer',
    display: 'block',
  },
}));

interface ContactCheckedActionsProps {
  checkedContacts: string[];
  setCheckedContacts: (checkedContacts: string[]) => void;
  onSelectContactsForDelete: (checkedContacts: string[]) => void;
}

const ContactCheckedActions: React.FC<ContactCheckedActionsProps> = ({
  checkedContacts,
  onSelectContactsForDelete,
}) => {
  const [, onOpenLabel] = React.useState<null | HTMLElement>(null);

  const onLabelOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    onOpenLabel(event.currentTarget);
  };

  const classes = useStyles();

  return (
    <Box component='span' display='flex' alignItems='center' mr={{xl: 4}}>
      <Tooltip title={<IntlMessages id='common.delete' />}>
        <Box mr={4} component='span' color='text.secondary'>
          <DeleteSharpIcon
            className={classes.pointer}
            onClick={() => onSelectContactsForDelete(checkedContacts)}
          />
        </Box>
      </Tooltip>

      <Tooltip title={<IntlMessages id='common.label' />}>
        <Box
          mr={4}
          component='span'
          color='text.secondary'
          onClick={onLabelOpen}>
          <LabelSharpIcon className={classes.pointer} />
        </Box>
      </Tooltip>

      {/* <Menu
        anchorEl={isLabelOpen}
        keepMounted
        elevation={0}
        open={Boolean(isLabelOpen)}
        onClose={onLabelClose}>
        <MenuItem value={311} onClick={onSelectLabel}>
          <IntlMessages id='common.crema' />
        </MenuItem>
        <MenuItem value={312} onClick={onSelectLabel}>
          <IntlMessages id='common.personal' />
        </MenuItem>
        <MenuItem value={313} onClick={onSelectLabel}>
          <IntlMessages id='common.work' />
        </MenuItem>
      </Menu> */}
    </Box>
  );
};

export default ContactCheckedActions;
