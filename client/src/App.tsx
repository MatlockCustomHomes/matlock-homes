import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import LiveChat from "./components/LiveChat";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Warranty from "./pages/Warranty";
import FAQ from "./pages/FAQ";
import CustomHomeBuilding from "./pages/services/CustomHomeBuilding";
import HomeRenovations from "./pages/services/HomeRenovations";
import BuildReadyEstates from "./pages/BuildReadyEstates";
import LotFeasibilityPage from "./pages/tools/LotFeasibilityPage";
import RenovateOrRebuildPage from "./pages/tools/RenovateOrRebuildPage";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/pricing"} component={Pricing} />
      <Route path={"/warranty"} component={Warranty} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/services/custom-home-building"} component={CustomHomeBuilding} />
      <Route path={"/services/home-renovations"} component={HomeRenovations} />
      <Route path={"/build-ready-estates"} component={BuildReadyEstates} />
      <Route path={"/tools/lot-feasibility"} component={LotFeasibilityPage} />
      <Route path={"/tools/renovate-or-rebuild"} component={RenovateOrRebuildPage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <LiveChat />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
