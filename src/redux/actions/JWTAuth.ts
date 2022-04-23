import {FETCH_SUCCESS} from '../../types/actions/Common.action';
import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';
import {fetchError, fetchStart, fetchSuccess} from './Common';
import {AuthType} from '../../shared/constants/AppEnums';
import {defaultUser} from '../../shared/constants/AppConst';
import {AuthUser} from '../../types/models/AuthUser';
import {AppActions} from '../../types';
import {Dispatch} from 'redux';
import {
  SET_AUTH_TOKEN,
  SIGNOUT_AUTH_SUCCESS,
  UPDATE_AUTH_USER,
} from '../../types/actions/Auth.actions';
// import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {
  auth,
  signInWithEmailAndPassword,
} from '@crema/services/auth/firebase/firebase';

export const onJwtUserSignUp = (body: {
  email: string;
  password: string;
  name: string;
}) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const res = await jwtAxios.post('users', body);
      localStorage.setItem('token', res.data.token);
      dispatch(setJWTToken(res.data.token));
      await loadJWTUser(dispatch);
    } catch (err: any) {
      console.log('error!!!!', err.response.data.error);
      dispatch(fetchError(err.response.data.error));
    }
  };
};

export const onJwtSignIn = (body: {email: string; password: string}) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());

    try {
      // const auth = getAuth();
      // const res = await jwtAxios.post('auth', body);
      signInWithEmailAndPassword(auth, body.email, body.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(`==== 성공`);
          console.log(user.getIdToken);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });

      // localStorage.setItem('token', res.data.token);
      // dispatch(setJWTToken(res.data.token));
      // await loadJWTUser(dispatch);
    } catch (err: any) {
      console.log('error!!!!', err.response.data.error);
      dispatch(fetchError(err.response.data.error));
    }
  };
};

export const loadJWTUser = async (dispatch: Dispatch<AppActions>) => {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get('/auth');
    dispatch(fetchSuccess());
    console.log('res.data', res.data);
    console.log('loadJWTUser호출');

    dispatch({
      type: UPDATE_AUTH_USER,
      payload: getUserObject(res.data),
    });
  } catch (err: any) {
    console.log('error!!!!', err.response.error);
    dispatch(fetchError(err.response.error));
  }
};

export const setJWTToken = (token: string | null): AppActions => ({
  type: SET_AUTH_TOKEN,
  payload: token,
});

const getUserObject = (authUser: any): AuthUser => {
  return {
    authType: AuthType.JWT_AUTH,
    displayName: authUser.name,
    email: authUser.email,
    role: defaultUser.role,
    token: authUser._id,
    uid: authUser._id,
    photoURL: authUser.avatar,
  };
};

export const onJWTAuthSignout = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchSuccess());

    try {
      auth
        .signOut()
        .then((data) => {
          dispatch(fetchSuccess());
          dispatch({type: UPDATE_AUTH_USER, payload: null});
        })
        .catch((err) => {
          console.log('error!!!!', err.response.error);
          dispatch(fetchError(err.response.error));
        });
    } catch (err: any) {
      console.log('error!!!!', err.response.error);
      dispatch(fetchError(err.response.error));
    }

    setTimeout(() => {
      dispatch({type: SIGNOUT_AUTH_SUCCESS});
      dispatch(fetchSuccess());
      localStorage.removeItem('token');
    }, 500);
  };
};
