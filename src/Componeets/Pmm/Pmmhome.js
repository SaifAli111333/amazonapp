import * as React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Box, Typography, Button, Avatar, Divider, CssBaseline, Collapse, IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const theme = createTheme();

function PmmHome() {
  const [openProducts, setOpenProducts] = React.useState(false);
  const [openOrders, setOpenOrders] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedPage, setSelectedPage] = React.useState('');

  const handleProductsClick = () => {
    setOpenProducts(!openProducts);
  };
  const handleMenuItemClick = (page) => {
    setSelectedPage(page);
  };
  const handleOrdersClick = () => {
    setOpenOrders(!openOrders);
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
          <Typography
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
            Admin Navigation
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', mt: 2 }}>
            <Button
              component={Link}
              to="Pmmdashboard"
              sx={styles.sidebarButton}
            >
              <DashboardIcon sx={{ mr: 1 }} /> Dashboard
            </Button>
            <Button
              component={Link}
              to="/settings"
              sx={styles.sidebarButton}
            >
              <SettingsIcon sx={{ mr: 1 }} /> Settings
            </Button>
            <Button
              onClick={handleProductsClick}
              sx={styles.sidebarButton}
            >
              <AddCircleIcon sx={{ mr: 1 }} /> Products
              {openProducts ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={openProducts} timeout="auto" unmountOnExit>
              <Box sx={{ pl: 4, mt: 1 }}>
                <Button
                  component={Link}
                  to="manage-products"
                  sx={styles.sidebarSubButton}
                >
                  Add Product
                </Button>
                <Button
                  component={Link}
                  to="product"
                  sx={styles.sidebarSubButton}
                >
                  All Products
                </Button>
              </Box>
            </Collapse>
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
                  to="PmmOrder"
                  sx={selectedPage === 'PmmOrder' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('PmmOrder')}
                >
                  Orders
                </Button>
                <Button
                  component={Link}
                  to="PmmReviewed"
                  sx={selectedPage === 'PmmReviewed' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('PmmReviewed')}
                >
                  Reviewed
                </Button>
                <Button
                  component={Link}
                  to="PMMRefundpending"
                  sx={selectedPage === 'PMMRefundpending' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('PMMRefundpending')}
                >
                  RefundPending
                </Button>
                <Button
                  component={Link}
                  to="PMMreviewdeleted"
                  sx={selectedPage === 'PMMreviewdeleted' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('PMMreviewdeleted')}
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
                  to="PMMOnhold"
                  sx={selectedPage === 'PMMOnhold' ? { ...styles.sidebarSubButton, ...styles.selectedSidebarSubButton } : styles.sidebarSubButton}
                  onClick={() => handleMenuItemClick('PMMOnhold')}
                >
                  Onhold
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


export default PmmHome;
