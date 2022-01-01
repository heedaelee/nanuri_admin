import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles/index';
import { TransitionProps } from '@material-ui/core/transitions';
import { Formik } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Scrollbar } from '../../../@crema';
import {
  onCreateProduct,
  onUpdateSelectedProduct
} from '../../../redux/actions/ProductList';
import { Fonts } from '../../../shared/constants/AppEnums';
import { ProductListObj } from '../../../types/models/apps/ProductList';
import AddContactForm from './AddContactForm';

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
  selectContact?: ProductListObj | null;
  onUpdateContact?: (newContact: ProductListObj) => void;
}

const CreateContact: React.FC<CreateContactProps> = ({
  isAddContact,
  handleAddContactClose,
  selectContact,
  onUpdateContact,
}) => {
  const dispatch = useDispatch();

  // const [userImageUrl, setUserImageUrl] = useState<string>(
  //   selectContact && selectContact.img?.length
  //     ? selectContact.img[0].url
  //     : '/assets/images/placeholder.jpg',
  // );

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
            productName: selectContact ? selectContact.productName : '',
            link: selectContact ? selectContact.link : '',
            productPrice: selectContact ? selectContact.productPrice : '',
            totalPplCnt: selectContact ? selectContact.totalPplCnt : '',
            startPeriod: selectContact ? selectContact.startPeriod : '',
            endPeriod: selectContact ? selectContact.endPeriod : '',
            deliveryMethod: selectContact
              ? selectContact.deliveryMethod
              : '배송',
            detailContent: selectContact ? selectContact.detailContent : '',
            img: selectContact
              ? selectContact.img
                ? selectContact.img
                : []
              : [],
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            if (selectContact) {
              const newContact = {
                id: selectContact.id,
                isStarred: selectContact.isStarred,
                // img:selectContact.img
                ...data,
              };
              dispatch(onUpdateSelectedProduct(newContact as ProductListObj));
              onUpdateContact!(newContact as ProductListObj);
            } else {
              const newContact = {
                id: String(Math.floor(Math.random() * 1000)),
                isStarred: false,
                // image: userImageUrl,
                ...data,
              };
              dispatch(onCreateProduct(newContact as ProductListObj));
            }
            handleAddContactClose();
            resetForm();
            setSubmitting(false);
          }}>
          {({values, setFieldValue}) => (
            <AddContactForm
              // setUserImage={setUserImageUrl}
              // userImage={userImageUrl}
              values={values as ProductListObj}
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
