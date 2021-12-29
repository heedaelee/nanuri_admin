import {Box, Button} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {grey} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {KeyboardDatePicker} from '@material-ui/pickers';
import {Form, useField} from 'formik';
import React from 'react';
import {useDropzone} from 'react-dropzone';
import {useIntl} from 'react-intl';
import Scrollbar from '../../../@crema/core/Scrollbar';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../shared/constants/AppEnums';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {UserListObj} from '../../../types/models/apps/UserList';

const useStyles = makeStyles((theme: CremaTheme) => ({
  avatar: {
    width: 55,
    height: 55,
    marginBottom: 8,
    cursor: 'pointer',
  },
  myTextField: {
    width: '100%',
    marginBottom: 16,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 24,
    },
  },
  btnRoot: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  fieldRoot: {
    width: '100%',
    padding: 16,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  widthFull: {
    width: '100%',
  },
  pointer: {
    cursor: 'pointer',
  },
}));
const MyTextField = (props: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

interface AddContactFormProps {
  values: UserListObj;
  userImage: string;
  setUserImage: (image: string) => void;
  setFieldValue: (name: string, value: any) => void;
  handleAddContactClose: () => void;
}

const AddContactForm: React.FC<AddContactFormProps> = ({
  values,
  userImage,

  setUserImage,
  setFieldValue,
  handleAddContactClose,
}) => {
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setUserImage(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const {messages} = useIntl();

  const classes = useStyles();

  return (
    <Form className='' noValidate autoComplete='off'>
      <Box
        p={5}
        display='flex'
        flexDirection='column'
        alignItems='center'
        borderBottom={`1px solid ${grey[300]}`}>
        <Box {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <label htmlFor='icon-button-file'>
            <Avatar className={classes.avatar} src={userImage} />
          </label>
        </Box>
        <Box component='h4' fontWeight={Fonts.MEDIUM}>
          {values.name}
        </Box>
      </Box>

      <Scrollbar style={{maxHeight: 600}}>
        <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
          <Box pb={5} mb={5} borderBottom={`1px solid ${grey[300]}`}>
            <Box
              component='h6'
              mb={{xs: 4, xl: 6}}
              fontSize={16}
              fontWeight={Fonts.MEDIUM}>
              <IntlMessages id='contactApp.personalDetails' />
            </Box>

            <Box px={{md: 5, lg: 8, xl: 10}}>
              <MyTextField
                required={true}
                className={classes.myTextField}
                variant='outlined'
                label={<IntlMessages id='common.name' />}
                name='name'
              />

              <MyTextField
                required={true}
                className={classes.myTextField}
                variant='outlined'
                label={<IntlMessages id='common.email' />}
                name='email'
              />

              <MyTextField
                required={true}
                className={classes.myTextField}
                variant='outlined'
                label={<IntlMessages id='common.phone' />}
                name='contact'
              />

              <KeyboardDatePicker
                autoOk
                disableFuture
                className={classes.myTextField}
                format='MM/DD/YYYY'
                inputVariant='outlined'
                label={<IntlMessages id='common.birthday' />}
                name='birthday'
                value={values.birthday}
                onChange={(value) => setFieldValue('birthday', value)}
              />
            </Box>
          </Box>

          <Box pb={5} mb={5} borderBottom={`1px solid ${grey[300]}`}>
            <Box
              component='h6'
              mb={{xs: 4, xl: 6}}
              fontWeight={Fonts.MEDIUM}
              fontSize={16}>
              <IntlMessages id='common.otherDetails' />
            </Box>

            <Box px={{md: 5, lg: 8, xl: 10}}>
              <MyTextField
                required={true}
                className={classes.widthFull}
                variant='outlined'
                label={<IntlMessages id='common.address' />}
                name='address'
              />
            </Box>
          </Box>

          <Box pb={5} mb={5} borderBottom={`1px solid ${grey[300]}`}>
            <Box
              component='h6'
              mb={{xs: 4, xl: 6}}
              fontWeight={Fonts.MEDIUM}
              fontSize={16}>
              <IntlMessages id='common.socialMedia' />
            </Box>

            <Box px={{md: 5, lg: 8, xl: 10}}>
              <MyTextField
                className={classes.myTextField}
                variant='outlined'
                label={<IntlMessages id='common.facebookId' />}
                name='facebookId'
              />

              <MyTextField
                className={classes.widthFull}
                variant='outlined'
                label={<IntlMessages id='common.twitterId' />}
                name='twitterId'
              />
            </Box>
          </Box>

          <Box>
            <Box component='h6' mb={2} fontWeight={Fonts.MEDIUM} fontSize={16}>
              <IntlMessages id='common.notes' />
            </Box>

            <MyTextField
              name='notes'
              multiline
              className={classes.fieldRoot}
              rows='4'
              variant='outlined'
              placeholder={messages['common.notes']}
            />
          </Box>
        </Box>

        <Box px={8} py={4} bgcolor='grey.300'>
          <Button
            className={classes.btnRoot}
            color='secondary'
            variant='contained'
            type='submit'>
            <IntlMessages id='common.save' />
          </Button>
          <Button
            className={classes.btnRoot}
            color='secondary'
            onClick={handleAddContactClose}>
            <IntlMessages id='common.cancel' />
          </Button>
        </Box>
      </Scrollbar>
    </Form>
  );
};

export default AddContactForm;
