import React, {useContext} from 'react';
import {IntlProvider} from 'react-intl';

import AppLocale from '../../shared/localization';
import AppContext from './AppContext';
import AppContextPropsType from '../../types/AppContextPropsType';
import {IntlGlobalProvider} from './Utils';

const LocaleProvider = (props: any) => {
  const {locale} = useContext<AppContextPropsType>(AppContext);
  const currentAppLocale = AppLocale[locale.locale];

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      defaultLocale='kr'
      messages={currentAppLocale.messages}>
      <IntlGlobalProvider>{props.children}</IntlGlobalProvider>
    </IntlProvider>
  );
};

export default LocaleProvider;
