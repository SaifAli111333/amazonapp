import * as React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Box, Typography, Button, Avatar, Divider, CssBaseline, Collapse, IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ReservationIcon from '@mui/icons-material/Bookmark';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileIcon from '@mui/icons-material/Person';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function Home1() {
  const [openCancelled, setOpenCancelled] = React.useState(false);
  const [openProducts, setOpenProducts] = React.useState(false);
  const [openReservations, setOpenReservations] = React.useState(false);
  const [openReports, setOpenReports] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedPage, setSelectedPage] = React.useState('');
  const [openOrders, setOpenOrders] = React.useState(false);


  const handleCancelledClick = () => {
    setOpenCancelled(!openCancelled);
  };

  const handleProductsClick = () => {
    setOpenProducts(!openProducts);
  };
  const handleOrdersClick = () => {
    setOpenOrders(!openOrders);
  };

  const handleReservationsClick = () => {
    setOpenReservations(!openReservations);
  };
  const handleReportsClick = () => {
    setOpenReports(!openReports);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (page) => {
    setSelectedPage(page);
  };

  const Navbar = ({ onToggleSidebar }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
        backgroundColor: 'RGB(228, 247, 246)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        height: '60px',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 2,
      }}
    >
      <IconButton onClick={onToggleSidebar} sx={{ ml: 1 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
        My Application
      </Typography>
      <Tooltip title="Profile">
        <IconButton onClick={handleProfileMenuOpen} sx={{ mr: 1 }}>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <ProfileIcon />
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        sx={{ mt: '45px', marginLeft: 172 }}
      >
        <MenuItem onClick={handleProfileMenuClose}>Account</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar onToggleSidebar={handleSidebarToggle} />
      <Box sx={{ display: 'flex', height: '100vh', pt: '60px' }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: { xs: '100%', sm: sidebarOpen ? '250px' : '0' },
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: 'RGB(228, 247, 246)',
            padding: '1rem',
            boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
            display: sidebarOpen ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 1,
            overflowY: 'auto',
            transition: 'width 0.3s ease',
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: 'secondary.main', width: 56, height: 56, marginTop: 8 }} />
          {/* <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#34495e',
              background: 'linear-gradient(90deg, #3498db, #2ecc71)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '4px',
                background: 'rgba(0, 0, 0, 0.2)',
                transform: 'scaleX(0)',
                transformOrigin: 'bottom left',
                transition: 'transform 0.3s ease',
              },
              '&:hover::before': {
                transform: 'scaleX(1)',
              },
            }}
          >
            Navigation
          </Typography> */}
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', mt: 2 }}>
            <Button
              component={Link}
              to="dashboard"
              sx={selectedPage === 'dashboard' ? { ...styles.sidebarButton, ...styles.selectedSidebarButton } : styles.sidebarButton}
              onClick={() => handleMenuItemClick('dashboard')}
            >
              <DashboardIcon sx={{ mr: 1 }} /> Dashboard
            </Button>
            <Button
              component={Link}
              to="Profile"
              sx={selectedPage === 'Profile' ? { ...styles.sidebarButton, ...styles.selectedSidebarButton } : styles.sidebarButton}
              onClick={() => handleMenuItemClick('Profile')}
            >
              <PersonIcon sx={{ mr: 1 }} /> Profile
            </Button>
            <Button
              component={Link}
              to="change-password/:userId"
              sx={selectedPage === 'change-password/:userId' ? { ...styles.sidebarButton, ...styles.selectedSidebarButton } : styles.sidebarButton}
              onClick={() => handleMenuItemClick('change-password/:userId')}
            >
              <SettingsIcon sx={{ mr: 1 }} /> ChangePassword
            </Button>
          
            <Button
              onClick={handleProductsClick}
              sx={selectedPage === 'products' ? { ...styles.sidebarButton, ...styles.selectedSidebarButton } : styles.sidebarButton}
            >
              <ShoppingCartIcon sx={{ mr: 1 }} /> Products
              {openProducts ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={openProducts} timeout="auto" unmountOnExit>
              <Box sx={{ pl: 4, mt: 1 }}>
                <Button
                  component={Link}
                  to="product"
                  sx={selectedPage === 'product' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('product')}
                >
                  All Products
                </Button>
                <Button
                  component={Link}
                  to="Mobile"
                  sx={selectedPage === 'Mobile' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('Mobile')}
                >
                  Mobile
                </Button>
                <Button
                  component={Link}
                  to="Electronic"
                  sx={selectedPage === 'Electronic' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('Electronic')}
                >
                  Electronic
                </Button>
                <Button
                  component={Link}
                  to="HealthBeauty"
                  sx={selectedPage === 'HealthBeauty' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('HealthBeauty')}
                >
                  Health & Beauty
                </Button>
                <Button
                  component={Link}
                  to="BabyProduct"
                  sx={selectedPage === 'BabyProduct' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('BabyProduct')}
                >
                  Baby Product
                </Button>
                <Button
                  component={Link}
                  to="Fashion"
                  sx={selectedPage === 'Fashion' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('Fashion')}
                >
                  Fashion
                </Button>
                <Button
                  component={Link}
                  to="HomeKitchen"
                  sx={selectedPage === 'HomeKitchen' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('HomeKitchen')}
                >
                  Home & Kitchen
                </Button>
                <Button
                  component={Link}
                  to="SportsOutdoors"
                  sx={selectedPage === 'SportsOutdoors' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('SportsOutdoors')}
                >
                  Sports & Outdoors
                </Button>
                <Button
                  component={Link}
                  to="Automotive"
                  sx={selectedPage === 'Automotive' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('Automotive')}
                >
                  Automotive
                </Button>
                <Button
                  component={Link}
                  to="Books"
                  sx={selectedPage === 'Books' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('Books')}
                >
                 Books
                </Button>
                <Button
                  component={Link}
                  to="ToysGames"
                  sx={selectedPage === 'ToysGames' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('ToysGames')}
                >
                  Toys & Games
                </Button>
                <Button
                  component={Link}
                  to="Groceries"
                  sx={selectedPage === 'Groceries' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('Groceries')}
                >
                  Groceries
                </Button>
                <Button
                  component={Link}
                  to="Furniture"
                  sx={selectedPage === 'Furniture' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('Furniture')}
                >
                  Furniture
                </Button>
               
              </Box>
            </Collapse>
            <Button
              onClick={handleReservationsClick}
              sx={selectedPage === 'reservations' ? { ...styles.sidebarButton, ...styles.selectedSidebarButton } : styles.sidebarButton}
            >
              <ReservationIcon sx={{ mr: 1 }} /> Reservations
              {openReservations ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={openReservations} timeout="auto" unmountOnExit>
              <Box sx={{ pl: 4, mt: 1 }}>
                <Button
                  component={Link}
                  to="/add-reservation"
                  sx={selectedPage === 'add-reservation' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('add-reservation')}
                >
                  Add Reservation
                </Button>
                <Button
                  component={Link}
                  to="viewreservation"
                  sx={selectedPage === 'viewreservation' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('viewreservation')}
                >
                  View Reservation
                </Button>
              </Box>
            </Collapse>
            <Button
              component={Link}
              to="blacklist"
              sx={selectedPage === 'blacklist' ? { ...styles.sidebarButton, ...styles.selectedSidebarButton } : styles.sidebarButton}
              onClick={() => handleMenuItemClick('blacklist')}
            >
              <PersonIcon sx={{ mr: 1 }} /> Blacklistemail
            </Button>
            <Button
              onClick={handleOrdersClick}
              sx={selectedPage === 'orders' ? { ...styles.sidebarButton, ...styles.selectedSidebarButton } : styles.sidebarButton}
            >
              <ShoppingCartIcon sx={{ mr: 1 }} /> Orders
              {openOrders ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={openOrders} timeout="auto" unmountOnExit>
              <Box sx={{ pl: 4, mt: 1 }}>
                <Button
                  component={Link}
                  to="Order"
                  sx={selectedPage === 'Order' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('Order')}
                >
                  Orders
                </Button>
                <Button
                  component={Link}
                  to="Reviewed"
                  sx={selectedPage === 'Reviewed' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('Reviewed')}
                >
                  Reviewed
                </Button>
                <Button
                  component={Link}
                  to="Reviewsubmited"
                  sx={selectedPage === 'Reviewsubmited' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('Reviewsubmited')}
                >
                  Review submited 
                  Refund Delay
                </Button>
                <Button
                  component={Link}
                  to="ReviewDeleted"
                  sx={selectedPage === 'ReviewDeleted' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('ReviewDeleted')}
                >
                  ReviewDeleted
                </Button>
                <Button
                  component={Link}
                  to="Refunded"
                  sx={selectedPage === 'Refunded' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('Refunded')}
                >
                  Refunded
                </Button>
                <Button
                  component={Link}
                  to="Onhold"
                  sx={selectedPage === 'Onhold' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('Onhold')}
                >
                  Onhold
                </Button>
                <Button
                  component={Link}
                  to="RefundPending"
                  sx={selectedPage === 'RefundPending' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('RefundPending')}
                >
                  RefundPending
                </Button>
                <Button
                  component={Link}
                  to="Commissioned"
                  sx={selectedPage === 'Commissioned' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('Commissioned')}
                >
                  Commissioned
                </Button>
                <Button
                  component={Link}
                  to="Cancelled"
                  sx={selectedPage === 'Cancelled' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('Cancelled')}
                >
                  <CheckCircleIcon sx={{ mr: 1 }} />Cancelled
                </Button>
                <Button
                  component={Link}
                  to="Completed"
                  sx={selectedPage === 'Completed' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('Completed')}
                >
                 Completed
                </Button>           
              </Box>
            </Collapse>
            <Button
              onClick={handleReportsClick}
              sx={selectedPage === 'reports' ? { ...styles.sidebarButton, ...styles.selectedSidebarButton } : styles.sidebarButton}
            >
              <ReservationIcon sx={{ mr: 1 }} /> Reports
              {openReports ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={openReports} timeout="auto" unmountOnExit>
              <Box sx={{ pl: 4, mt: 1 }}>
                <Button
                  component={Link}
                  to="Reports"
                  sx={selectedPage === 'Reports' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('Reports')}
                >
                  Reports Pendings
                </Button>
                <Button
                  component={Link}
                  to="Reportresolved"
                  sx={selectedPage === 'Reportresolved' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('Reportresolved')}
                >
                  Reports Resolved
                </Button>
              </Box>
            </Collapse>
            <Button
              component={Link}
              to="delayrefund"
              sx={selectedPage === 'delayrefund' ? { ...styles.sidebarButton, ...styles.selectedSidebarButton } : styles.sidebarButton}
              onClick={() => handleMenuItemClick('delayrefund')}
            >
              <SettingsIcon sx={{ mr: 1 }} /> 
              Delay
              Refunds
            </Button>
          </Box>
          <Divider sx={{ my: 2, width: '100%' }} />
          <Button
            component={Link}
            to="/signin"
            variant="contained"
            color="primary"
            sx={{
              mt: 'auto',
              mb: 2,
              width: '100%',
              backgroundColor: '#007bff',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: '500',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s ease',
            }}
            onClick={() => console.log('Logging out...')}
          >
            <LogoutIcon sx={{ mr: 1 }} /> Logout
          </Button>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: { xs: 0, sm: sidebarOpen ? '250px' : '0' },
            p: 3,
            transition: 'margin-left 0.3s ease',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const styles = {
  sidebarButton: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    textAlign: 'left',
    px: 2,
    py: 1,
    mb: 1,
    borderRadius: '8px',
    fontSize: '0.875rem',
    color: '#34495e',
    '&:hover': {
      backgroundColor: '#dcdde1',
    },
  },
  selectedSidebarButton: {
    backgroundColor: '#3498db',
    color: '#fff',
  },
  sidebarSubButton: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    textAlign: 'left',
    px: 2,
    py: 0.5,
    mb: 1,
    borderRadius: '8px',
    fontSize: '0.75rem',
    color: '#34495e',
    '&:hover': {
      backgroundColor: '#dcdde1',
    },
  },
  selectedSidebarSubButton: {
    backgroundColor: '#3498db',
    color: '#fff',
  },
};

export default Home1;