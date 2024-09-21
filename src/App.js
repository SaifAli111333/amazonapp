import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './Componeets/signin';
import SignUp from './Componeets/signup';
import Main from './Componeets/main';
import Products from './Componeets/product';
import Home1 from './Componeets/pm/home';
import Dashboard from './Componeets/pm/dashboard';
import PmmHome from './Componeets/Pmm/Pmmhome';
import AddProducts from './Componeets/Pmm/addproduct';
import Practice from './Componeets/practice';
import ProductOverview from './Componeets/ProductOverview';
import ReservationPage from './Componeets/pm/reservation';
import Profile from './Componeets/Profile';
import Pmmdashboard from './Componeets/Pmm/Pmmdashboard';
import Mobile from './Componeets/pm/Categories/Mobile';
import Electronic from './Componeets/pm/Categories/Electronic';
import HealthBeauty from './Componeets/pm/Categories/HealthBeauty';
import BabyProduct from './Componeets/pm/Categories/BabyProduct';
import Fashion from './Componeets/pm/Categories/Fashion';
import HomeKitchen from './Componeets/pm/Categories/HomeKitchen';
import SportsOutdoors from './Componeets/pm/Categories/SportsOutdoors';
import Automotive from './Componeets/pm/Categories/Automotive';
import Books from './Componeets/pm/Categories/Books';
import ToysGames from './Componeets/pm/Categories/ToysGames';
import Groceries from './Componeets/pm/Categories/Groceries';
import Furniture from './Componeets/pm/Categories/Furniture';
import Order from './Componeets/pm/OrdercomPM/Order';
import Reviewed from './Componeets/pm/OrdercomPM/Reviewed';
import Cancelled from './Componeets/pm/OrdercomPM/Cancelled';
import Orderoverview from './Componeets/pm/OrderOverview';
import Completed from './Componeets/pm/OrdercomPM/completed';
import Refunded from './Componeets/pm/OrdercomPM/Refunded';
import Orderdetailoverview from './Componeets/pm/Overviewdetail';
import Reviewsubmited from './Componeets/pm/OrdercomPM/ReviewsubmitRefundDelay';
import ReviewDeleted from './Componeets/pm/OrdercomPM/ReviewDeleted';
import Onhold from './Componeets/pm/OrdercomPM/Onhold';
import Commissioned from './Componeets/pm/OrdercomPM/Commissioned';
import RefundPending from './Componeets/pm/OrdercomPM/RefundPending';
import PMMOrder from './Componeets/Pmm/ReviewcomPMM/PMMorder';
import PMMReviewed from './Componeets/Pmm/ReviewcomPMM/PMMreview';
import Reviewedoverview from './Componeets/Pmm/Reviewedoverview';
import Refundpendingoverview from './Componeets/Pmm/Refundpendingoverview';
import PMMRefundpending from './Componeets/Pmm/ReviewcomPMM/PMMrefundpendinfg';
import PMMReviewDeleted from './Componeets/Pmm/ReviewcomPMM/PMMreviewdeleted';
import PMMOnhold from './Componeets/Pmm/ReviewcomPMM/PMMonhold';
import Onholdoverview from './Componeets/pm/Onholdoverview';
import AdminHome from './Componeets/Admin/Adminhome';
import AdminDashboard from './Componeets/Admin/Admindashboard';
import AdminProducts from './Componeets/Admin/Adminproduct';
import Refundedoverview from './Componeets/Admin/Refundedoverview';
import AdminRefunded from './Componeets/Admin/AdminRefunded';
import Reports from './Componeets/pm/Report';
import ReportResolved from './Componeets/pm/ReportResolved';
import ReportOverviewPage from './Componeets/pm/Reportoverview';
import DelayRefunded from './Componeets/pm/DelayRefundpm';
import Blacklist from './Componeets/pm/Blacklistemail';
import ChangePassword from './Componeets/password';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/product" element={<Products />} >
        <Route path="/product-overview/:id" element={<ProductOverview />} />
        </Route>
        <Route path="/product-overview/:id" element={<ProductOverview />} />
        <Route path="/order-overview/:id" element={<Orderoverview />} />
        <Route path="/order-detailoverview/:id" element={<Orderdetailoverview />} />
        <Route path="/reviewed_overview/:id" element={<Reviewedoverview />} />
        <Route path="/refundpending-overview/:id" element={<Refundpendingoverview />} />
        <Route path="/onhold-overview/:id" element={<Onholdoverview />} />
        <Route path="/refunded-overview/:id" element={<Refundedoverview />} />
        <Route path="/report-overview/:id" element={<ReportOverviewPage />} />



        <Route path="/home" element={<Home1 />} >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="Profile" element={<Profile />} />
          <Route path="product" element={<Products />} />
          <Route path="Mobile" element={<Mobile />} />
          <Route path="Electronic" element={<Electronic />} />
          <Route path="HealthBeauty" element={<HealthBeauty />} />
          <Route path="BabyProduct" element={<BabyProduct />} />
          <Route path="Fashion" element={<Fashion />} />
          <Route path="HomeKitchen" element={<HomeKitchen />} />
          <Route path="SportsOutdoors" element={<SportsOutdoors />} />
          <Route path="Automotive" element={<Automotive />} />
          <Route path="Books" element={<Books />} />
          <Route path="ToysGames" element={<ToysGames />} />
          <Route path="Groceries" element={<Groceries />} />
          <Route path="Furniture" element={<Furniture />} />
          <Route path="viewreservation" element={<ReservationPage/>} />
          <Route path="Order" element={<Order/>} />
          <Route path="Reviewed" element={<Reviewed/>} />
          <Route path="Cancelled" element={<Cancelled/>} />
          <Route path="Completed" element={<Completed/>} />
          <Route path="Refunded" element={<Refunded/>} />
          <Route path="Reviewsubmited" element={<Reviewsubmited/>} />
          <Route path="ReviewDeleted" element={<ReviewDeleted/>} />
          <Route path="Onhold" element={<Onhold/>} />
          <Route path="Commissioned" element={<Commissioned/>} />
          <Route path="RefundPending" element={<RefundPending/>} />
          <Route path="Reports" element={<Reports/>} />
          <Route path="Reportresolved" element={<ReportResolved/>} />
          <Route path="delayrefund" element={<DelayRefunded />} />
          <Route path="blacklist" element={<Blacklist />} />
          <Route path="change-password/:userId" element={<ChangePassword />} />

        </Route>
          <Route path="/Pmmhome" element={<PmmHome />} >
          <Route index element={<Pmmdashboard />} />
          <Route path="Pmmdashboard" element={<Pmmdashboard />} />
          <Route path="manage-products" element={<AddProducts />} />
          <Route path="product" element={<Products />} />
          <Route path="PmmOrder" element={<PMMOrder/>} />
          <Route path="PmmReviewed" element={<PMMReviewed/>} />
          <Route path="Cancelled" element={<Cancelled/>} />
          <Route path="Completed" element={<Completed/>} />
          <Route path="Refunded" element={<Refunded/>} />
          <Route path="Commissioned" element={<Commissioned/>} />
          <Route path="PMMRefundpending" element={<PMMRefundpending/>} />
          <Route path="PMMreviewdeleted" element={<PMMReviewDeleted/>} />
          <Route path="PMMOnhold" element={<PMMOnhold/>} />
        </Route>
        <Route path="/Adminhome" element={<AdminHome />} >
        <Route index element={<AdminDashboard />} />
        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="AdminProducts" element={<AdminProducts />} />
        <Route path="Order" element={<Order/>} />
        <Route path="Reviewed" element={<Reviewed/>} />
        <Route path="Cancelled" element={<Cancelled/>} />
        <Route path="Completed" element={<Completed/>} />
        <Route path="AdminRefunded" element={<AdminRefunded/>} />
        <Route path="ReviewDeleted" element={<ReviewDeleted/>} />
        <Route path="Onhold" element={<Onhold/>} />
        <Route path="RefundPending" element={<RefundPending/>} />

        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
