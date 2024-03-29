import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { defaultUser } from '../../shared/constants/AppConst';
import { AuthType } from '../../shared/constants/AppEnums';
import { UPDATE_AUTH_USER } from '../../types/actions/Auth.actions';
import { AuthUser } from '../../types/models/AuthUser';
import { auth as firebaseAuth } from '../services/auth/firebase/firebase';

export const useAuthToken = (): [boolean, AuthUser | null] => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const {user} = useSelector<AppState, AppState['auth']>(({auth}) => auth);

  useEffect(() => {
    // const validateAuth = async () => {
    //   console.log('validateAuth호출');
      
    //   dispatch(fetchStart());
    //   const token = localStorage.getItem('token');
    //   if (!token) {
    //     dispatch(fetchSuccess());
    //     return;
    //   }
    //   dispatch(setJWTToken(token));
    //   try {
    //     const res = await jwtAxios.get('/auth');
    //     dispatch(fetchSuccess());
    //     dispatch({
    //       type: UPDATE_AUTH_USER,
    //       payload: {
    //         authType: AuthType.JWT_AUTH,
    //         displayName: res.data.name,
    //         email: res.data.email,
    //         role: defaultUser.role,
    //         token: res.data._id,
    //         photoURL: res.data.avatar,
    //       },
    //     });
    //     return;
    //   } catch (err) {
    //     dispatch(fetchSuccess());
    //     return;
    //   }
    // };

    const firebaseCheck = () =>
      new Promise<void>((resolve) => {
        firebaseAuth.onAuthStateChanged((authUser: any) => {
          console.log(`firebaseCheck콜 authuser : `);
          console.log(authUser);
          
          if (authUser) {
            dispatch({
              type: UPDATE_AUTH_USER,
              payload: {
                authType: AuthType.FIREBASE,
                uid: authUser.uid,
                displayName: authUser.displayName,
                email: authUser.email,
                role: defaultUser.role,
                photoURL: authUser.photoURL,
                token: authUser.refreshToken,
              },
            });
          }
          resolve();
        });
        return Promise.resolve();
      });

    const checkAuth = () => {
      Promise.all([firebaseCheck()]).then(() => {
        setLoading(false);
        // dispatch({type: USER_LOADED});
      });
      // Promise.all([validateAuth()]).then(() => {
      //   setLoading(false);
      // });
    };
    checkAuth();
  }, [dispatch]);

  return [loading, user];
};

export const useAuthUser = (): AuthUser | null => {
  const {user} = useSelector<AppState, AppState['auth']>(({auth}) => auth);
  if (user) {
    return user;
  }
  return null;
};
