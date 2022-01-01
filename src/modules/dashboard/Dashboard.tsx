import { GridContainer } from '@crema';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onGetCrmData } from 'redux/actions/Dashboard';
import AppAnimate from '../../@crema/core/AppAnimate';
import QuickStats from './QuickStats';
import Statistics from './Statisitcs';
import TicketSupport from './TicketSupport';
import WebTraffic from './WebTraffic';

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
              <Grid item xs={12} md={12}>
                <QuickStats quickStatsData={crmData.quickStatsData} />
              </Grid>
              <Grid item xs={12} md={12}>
                <Statistics
                  clientsData={crmData.statisticsGraph.clientsData}
                  incomeData={crmData.statisticsGraph.incomeData}
                  projectData={crmData.statisticsGraph.projectData}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <WebTraffic websiteTrafficData={crmData.websiteTrafficData} />
              </Grid>

              <Grid item xs={12} md={7}>
                <TicketSupport ticketSupportData={crmData.ticketSupportData} />
              </Grid>
            </GridContainer>
          </Box>
        </AppAnimate>
      ) : null}
    </>
  );
};

export default Dashboard;
