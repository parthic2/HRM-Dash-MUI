import Grid from '@mui/material/Grid';
import JobRequirement from 'src/views/jobs/JobReuirement/JobRequirement';
import LeaveRequest from 'src/views/leave/LeaveRequest/LeaveRequest';
import Announcement from './announcement';
import BirthdayMonthTable from 'src/views/dashboard/BirthdayMonthTable';

const Dashboard = () => {
  // Fetch data for login credential which role are login
  // const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;
  // const role = authToken?.role;

  return (
    <>
      {/* {role === "Admin" &&
        <ApexChartWrapper>
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Trophy />
            </Grid>
            <Grid item xs={12} md={8}>
              <StatisticsCard />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <WeeklyOverview />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TotalEarning />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Grid container spacing={6}>
                <Grid item xs={6}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <CardStatisticsVerticalComponent
                      stats='$25.6k'
                      icon={<Poll />}
                      color='success'
                      trendNumber='+42%'
                      title='Total Profit'
                      subtitle='Weekly Profit'
                    />
                  </motion.div>
                </Grid>
                <Grid item xs={6}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <CardStatisticsVerticalComponent
                      stats='$78'
                      title='Refunds'
                      trend='negative'
                      color='secondary'
                      trendNumber='-15%'
                      subtitle='Past Month'
                      icon={<CurrencyUsd />}
                    />
                  </motion.div>
                </Grid>
                <Grid item xs={6}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <CardStatisticsVerticalComponent
                      stats='862'
                      trend='negative'
                      trendNumber='-18%'
                      title='New Project'
                      subtitle='Yearly Project'
                      icon={<BriefcaseVariantOutline />}
                    />
                  </motion.div>
                </Grid>
                <Grid item xs={6}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <CardStatisticsVerticalComponent
                      stats='15'
                      color='warning'
                      trend='negative'
                      trendNumber='-18%'
                      subtitle='Last Week'
                      title='Sales Queries'
                      icon={<HelpCircleOutline />}
                    />
                  </motion.div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <SalesByCountries />
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <DepositWithdraw />
            </Grid>
            <Grid item xs={12}>
              <Table />
            </Grid>
          </Grid>
        </ApexChartWrapper>
      } */}

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <BirthdayMonthTable />
        </Grid>
        <Grid item xs={12} md={6}>
          <JobRequirement />
        </Grid>
        <Grid item xs={12} md={6}>
          <Announcement />
        </Grid>
        <Grid item xs={12}>
          <LeaveRequest />
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard;