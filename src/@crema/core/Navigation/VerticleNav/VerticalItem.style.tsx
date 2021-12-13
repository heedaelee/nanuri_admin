import {makeStyles} from '@material-ui/core/styles';
import {Fonts, ThemeMode} from '../../../../shared/constants/AppEnums';
import {CremaTheme} from '../../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => {
  return {
    navItem: {
      height: 40,
      marginTop: 2,
      marginBottom: 2,
      cursor: 'pointer',
      textDecoration: 'none !important',
      width: 'calc(100% - 16px)',
      borderRadius: '0 30px 30px 0',
      paddingLeft:
        theme.direction === 'ltr'
          ? (props: {level: number; themeMode: ThemeMode}) =>
              24 + 40 * props.level
          : 12,
      paddingRight:
        theme.direction === 'rtl'
          ? (props: {level: number; themeMode: ThemeMode}) =>
              24 + 40 * props.level
          : 12,
      '&.nav-item-header': {
        textTransform: 'uppercase',
      },
      '&.active': {
        backgroundColor: theme.palette.primary.main,
        pointerEvents: 'none',
        transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
        
        '& .nav-item-text': {
          // fontSize: 1,
          color: theme.palette.common.white + '!important',
          fontWeight: Fonts.MEDIUM,
        },
        '& .nav-item-icon': {
          color: theme.palette.common.white + '!important',
        },
      },

      //사이드 바 메뉴 텍스트 호버
      '&:hover, &:focus': {
        '& .nav-item-text': {
          color: (props: {level: number; themeMode: ThemeMode}) =>
            props.themeMode === ThemeMode.LIGHT
              ? theme.palette.primary.main
              : '#fff',
        },

        '& .nav-item-icon': {
          color: (props: {level: number; themeMode: ThemeMode}) =>
            props.themeMode === ThemeMode.LIGHT
              ? theme.palette.primary.main
              : '#fff',
        },

        '& .nav-item-icon-arrow': {
          color: (props: {level: number; themeMode: ThemeMode}) =>
            props.themeMode === ThemeMode.LIGHT
              ? theme.palette.primary.main
              : '#fff',
        },
      },
      '& .nav-item-icon': {
        color: theme.palette.sidebar.textColor,
      },

      //일반 사이드 바 메뉴 텍스트
      '& .nav-item-text': {
        // fontSize: 1,
        color: theme.palette.sidebar.textColor,
        fontWeight: Fonts.MEDIUM,
      },
    },
    listIcon: {
      fontSize: 18,
      [theme.breakpoints.up('xl')]: {
        // fontSize: 20,
      },
    },
    listItemText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontWeight: Fonts.REGULAR,
    },
  };
});
export default useStyles;
