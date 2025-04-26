import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "./contexts/AuthContext";
import { TicketProvider } from "./contexts/TicketContext";
import { MetricsProvider } from "./contexts/MetricsContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import TicketDetail from "./pages/TicketDetail";
import Team from "./pages/Team";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <AuthProvider>
          <TicketProvider>
            <MetricsProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  
                  <Route 
                    path="/" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route 
                    path="/tickets" 
                    element={
                      <ProtectedRoute>
                        <Tickets />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route 
                    path="/tickets/:id" 
                    element={
                      <ProtectedRoute>
                        <TicketDetail />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route 
                    path="/team" 
                    element={
                      <ProtectedRoute>
                        <Team />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route 
                    path="/notifications" 
                    element={
                      <ProtectedRoute>
                        <Notifications />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route 
                    path="/settings" 
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </MetricsProvider>
          </TicketProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
