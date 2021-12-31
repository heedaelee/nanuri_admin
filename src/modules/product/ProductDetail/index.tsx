import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onUpdateSelectedProduct} from '../../../redux/actions/ProductList';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import {Scrollbar} from '../../../@crema';
import Box from '@material-ui/core/Box';
import ContactActions from './ContactActions';
import PersonalDetails from './PersonalDetails';
import OtherDetails from './OtherDetails';
import SocialMedia from './SocialMedia';
import Notes from './Notes';
import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../shared/constants/AppEnums';
import {ProductListObj} from '../../../types/models/apps/ProductList';
import {TransitionProps} from '@material-ui/core/transitions';

const useStyles = makeStyles(() => ({
  dialogBox: {
    position: 'relative',
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 600,
      width: '100%',
    },
    '& .MuiTypography-h6': {
      fontWeight: Fonts.LIGHT,
    },
  },
  pointer: {
    cursor: 'pointer',
  },
  avatar: {
    width: 140,
    height: 140,
    marginBottom: 8,
  },
  borderBottomClass: {
    borderBottom: `1px solid ${grey[300]}`,
  },
}));
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {children?: React.ReactElement<any, any>},
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface ContactDetailProps {
  isShowDetail: boolean;
  selectedContact: ProductListObj | null;
  onShowDetail: (show: boolean) => void;
  onSelectContactsForDelete: (ids: string[]) => void;
  onOpenEditContact: (contact: ProductListObj) => void;
}

const ContactDetail: React.FC<ContactDetailProps> = ({
  isShowDetail,
  selectedContact,
  onShowDetail,
  onSelectContactsForDelete,
  onOpenEditContact,
}) => {
  const dispatch = useDispatch();

  const [contact, setContact] = useState<ProductListObj | null>(
    selectedContact,
  );

  useEffect(() => {
    setContact(selectedContact);
  }, [selectedContact]);

  const onChangeStarred = (checked: boolean) => {
    const updatedContact = contact;
    contact!.isStarred = checked;
    setContact(updatedContact);
    dispatch(onUpdateSelectedProduct(contact!));
  };

  const onDeleteContact = () => {
    onSelectContactsForDelete([contact!.id]);
    onShowDetail(false);
  };

  const classes = useStyles();
  return (
    <>
      <Dialog
        open={isShowDetail}
        onClose={() => onShowDetail(false)}
        TransitionComponent={Transition}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className={classes.dialogBox}>
        <Scrollbar>
          <Box p={5} className={classes.borderBottomClass}>
            <ContactActions
              onChangeStarred={onChangeStarred}
              onDeleteContact={onDeleteContact}
              // 수정 모달 열기
              onOpenEditContact={onOpenEditContact}
              contact={contact!}
            />
            <Box
              mt={{sm: -3}}
              display='flex'
              flexDirection='column'
              alignItems='center'>
              {/* {contact!.image ? (
                <Avatar className={classes.avatar} src={contact!.image} />
              ) : (
                <Avatar className={classes.avatar}>
                  {contact!.name[0].toUpperCase()}
                </Avatar>
              )} */}
              <Box component='h4' fontWeight={Fonts.MEDIUM}>
                {contact!.productName}
              </Box>
            </Box>
          </Box>

          <Box py={5} pl={{xs: 8, lg: 8, lx: 10}}>
            <Scrollbar style={{maxHeight: 400}}>
              {contact ? <PersonalDetails contact={contact} /> : null}
              {/* {contact ? <OtherDetails contact={contact} /> : null} */}
              {/* {contact ? <SocialMedia contact={contact} /> : null} */}
              {contact ? <Notes contact={contact} /> : null}
            </Scrollbar>
          </Box>
        </Scrollbar>
      </Dialog>
    </>
  );
};

export default ContactDetail;
