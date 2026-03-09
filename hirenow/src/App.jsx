import Header from "./components/Header";
import JobLanding from "./components/JobLanding";
import JobList from "./components/JobList";
import Login from "./components/Login";
import Register from "./components/Register";
import SavedJobs from "./components/SavedJobs";
import EmployerLogin from "./components/EmployerLogin";
import EmployerRegister from "./components/EmployersRegister";
import EmployerDashboard from "./components/EmployerDashboard";
import EmployerJobForm from "./components/EmployerJobForm";
import Notifications from "./components/Notifications";
import MyApplications from "./components/MyApplications";
import EmployerApplicants from "./components/EmployerApplicants";
import Subscription from "./components/Subscription";

import { Routes, Route } from "react-router-dom";
import FeaturedShowcase from "./components/FeaturedShowcase";
import HowItWorks from "./components/HowItWorks";
import AboutUs from "./components/AboutUs";
import ReviewsCarousel from "./components/ReviewsCarousel";
import SiteFooter from "./components/SiteFooter";
import ContactUs from "./components/ContactUs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import Faq from "./components/Faq";
import HelpCenter from "./components/HelpCenter";

import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AdminUsers from "./components/AdminUsers";
import AdminEmployers from "./components/AdminEmployers";
import AdminJobs from "./components/AdminJobs";
import AdminPayments from "./components/AdminPayments";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/AdminLayout";
import Companies from "./components/Companies";

export default function App() {
  return (
    <>
     
      <Header />

      <Routes>
   
        <Route
          path="/"
          element={
            <>
              <JobLanding />
              <JobList />
              <FeaturedShowcase />
              <HowItWorks />
              <ReviewsCarousel />
              <SiteFooter />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />

      
        <Route path="/employer/login" element={<EmployerLogin />} />
        <Route path="/employer/register" element={<EmployerRegister />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/employer/jobs/new" element={<EmployerJobForm />} />
        <Route path="/employer/jobs/:id/edit" element={<EmployerJobForm />} />
        <Route path="/employer/jobs/:jobId/applicants" element={<EmployerApplicants />} />

       
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/subscription" element={<Subscription />} />

       
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/help" element={<HelpCenter />} />
         <Route path="/companies" element={<Companies />} />
        

       
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="employers" element={<AdminEmployers />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="payments" element={<AdminPayments />} />
        </Route>
      </Routes>
    </>
  );
}
