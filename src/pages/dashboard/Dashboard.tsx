import Box from '@mui/material/Box';
import './dashboard.css';
import DashboardContainerComponent from '../../components/dashboardDataComponents/dashboardContainerComponent/DashboardContainerComponent';

const Dashboard = ({ }) => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <DashboardContainerComponent />
    </Box>
  )
}

export default Dashboard;