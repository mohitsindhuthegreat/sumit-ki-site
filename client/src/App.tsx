import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WhatsAppButton from "@/components/whatsapp-button";
import EnhancedLiveChat from "@/components/enhanced-live-chat";
import Home from "@/pages/home";
import About from "@/pages/about";
import GovernmentServices from "@/pages/government-services";
import BankingServices from "@/pages/banking-services";
import PrintingServices from "@/pages/printing-services";
import OnlineFormsServices from "@/pages/online-forms-services";
import TravelServices from "@/pages/travel-services";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsConditions from "@/pages/terms-conditions";
import SarkariUpdates from "@/pages/sarkari-updates";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminCreateAnnouncement from "@/pages/admin-create-announcement";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/government-services" component={GovernmentServices} />
      <Route path="/banking-services" component={BankingServices} />
      <Route path="/printing-services" component={PrintingServices} />
      <Route path="/online-forms" component={OnlineFormsServices} />
      <Route path="/travel-services" component={TravelServices} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-conditions" component={TermsConditions} />
      <Route path="/sarkari-updates" component={SarkariUpdates} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/create-announcement" component={AdminCreateAnnouncement} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <WhatsAppButton />
        <EnhancedLiveChat />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
