import React, {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import AppAnimate from '../../@crema/core/AppAnimate';
import {GridContainer} from '@crema';
import {Grid} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {onGetCrmData} from 'redux/actions/Dashboard';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetCrmData());
  }, [dispatch]);

  const crmData = useSelector(({dashboard}: any) => {

    console.log('test : ', dashboard);
    return dashboard.crmData;
  });

  return (
    <>
      {crmData ? (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <Box pt={{xl: 4}} clone>
            <GridContainer>
              <Grid item xs={12} md={7}>
                {/* <QuickStats quickStatsData={crmData.quickStatsData} /> */}
              </Grid>

              <Grid item xs={12} md={5}>
                {/* <TotalRevenue revenueData={crmData.revenueData} /> */}
              </Grid>
            </GridContainer>
          </Box>
        </AppAnimate>
      ) : null}
    </>
  );
};

export default Dashboard;
