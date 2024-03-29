import React, {useContext} from 'react';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import {ContentView, ThemeSetting} from '../../../index';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import useStyles from './index.style';
import clsx from 'clsx';
import AppContext from '../../../utility/AppContext';
import AppFixedFooter from './AppFixedFooter';
import {LayoutType} from '../../../../shared/constants/AppEnums';
import AppContextPropsType from '../../../../types/AppContextPropsType';

interface StandardLayoutProps {}

//이게 가장 시작하는 일반적 컴포넌트, 여기서 시작
const StandardLayout: React.FC<StandardLayoutProps> = () => {
  const {footer, themeStyle, layoutType, footerType} = useContext<
    AppContextPropsType
  >(AppContext);
  const classes = useStyles({footer, themeStyle});

  return (
    <Box
      className={clsx(
        classes.appMain,
        layoutType === LayoutType.BOXED ? classes.boxedLayout : '',
        {
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
        },
      )}>
      <AppSidebar />

      <Box className={classes.mainContent}>
        <Hidden mdDown>
          <Box className={classes.mainContainer}>
            <AppHeader />
            {/* NOTE: navigator 메뉴에서 To 프로퍼티가 url를 바꿔서 connect하면, ContentView가 navigator 메뉴에서 to= 에 힐당된 url를 받아서 page를 rendering 해주는 역할임. 핵심 */}
            <ContentView />
            <AppFixedFooter />
          </Box>
        </Hidden>

        <Hidden lgUp>
          <Box className={classes.mainContainerFull}>
            <AppHeader />
            <ContentView />
            <AppFixedFooter />
          </Box>
        </Hidden>
      </Box>
      <ThemeSetting />
    </Box>
  );
};

export default StandardLayout;
