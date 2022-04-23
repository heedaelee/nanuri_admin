import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {Scrollbar} from '../../../@crema';
import {
  onCreateContact,
  onUpdateSelectedContact,
} from '../../../redux/actions/UserList';
import Slide from '@material-ui/core/Slide';
import AddContactForm from './AddContactForm';
import {Fonts} from '../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles';
import {UserListObj} from '../../../types/models/apps/UserList';
import {TransitionProps} from '@material-ui/core/transitions';
import {useIntl} from 'react-intl';

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
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {children?: React.ReactElement<any, any>},
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface CreateContactProps {
  isAddContact: boolean;
  handleAddContactClose: () => void;
  selectContact?: UserListObj | null;
  onUpdateContact?: (newContact: UserListObj) => void;
}

const CreateContact: React.FC<CreateContactProps> = ({
  isAddContact,
  handleAddContactClose,
  selectContact,
  onUpdateContact,
}) => {
  const dispatch = useDispatch();

  const [userImage, setUserImage] = useState<string>(
    selectContact && selectContact.image
      ? selectContact.image
      : '/assets/images/placeholder.jpg',
  );

  const classes = useStyles();
  const {messages} = useIntl();
  const validationSchema = yup.object({
    name: yup.string().required(messages['validation.nameRequired'] as string),
    email: yup
      .string()
      .email(messages['validation.emailFormat'] as string)
      .required(messages['validation.emailRequired'] as string),
    contact: yup
      .string()
      .required(messages['validation.phoneNumberRequired'] as string),
  });

  return (
    <Dialog
      open={isAddContact}
      onClose={() => handleAddContactClose()}
      aria-labelledby='simple-modal-title'
      TransitionComponent={Transition}
      aria-describedby='simple-modal-description'
      className={classes.dialogBox}>
      <Scrollbar>
        <Formik
          validateOnChange={true}
          initialValues={{
            name: selectContact ? selectContact.name : '',
            email: selectContact ? selectContact.email : '',
            contact: selectContact ? selectContact.contact : '',
            birthday:
              selectContact && selectContact.birthday
                ? selectContact.birthday
                : null,
            address:
              selectContact && selectContact.address
                ? selectContact.address
                : '',
            appleId:
              selectContact && selectContact.appleId
                ? selectContact.appleId
                : '',
            kakaoId:
              selectContact && selectContact.kakaoId
                ? selectContact.kakaoId
                : '',
            notes:
              selectContact && selectContact.notes ? selectContact.notes : '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            if (selectContact) {
              const newContact = {
                id: selectContact.id,
                isStarred: selectContact.isStarred,
                image: userImage,
                ...data,
              };
              dispatch(onUpdateSelectedContact(newContact as UserListObj));
              onUpdateContact!(newContact as UserListObj);
            } else {
              const newContact = {
                id: Math.floor(Math.random() * 1000),
                isStarred: false,
                image: userImage,
                ...data,
              };
              dispatch(onCreateContact(newContact as UserListObj));
            }
            handleAddContactClose();
            resetForm();
            setSubmitting(false);
          }}>
          {({values, setFieldValue}) => (
            <AddContactForm
              setUserImage={setUserImage}
              userImage={userImage}
              values={values as UserListObj}
              setFieldValue={setFieldValue}
              handleAddContactClose={handleAddContactClose}
            />
          )}
        </Formik>
      </Scrollbar>
    </Dialog>
  );
};

export default CreateContact;
