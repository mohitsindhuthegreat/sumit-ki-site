import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Plus, 
  Edit,
  Trash2,
  Eye,
  Calendar,
  TrendingUp,
  Bell
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ContactMessage, ServiceRequest, Announcement, User } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const adminUser = localStorage.getItem("admin_user");
    if (!adminUser) {
      setLocation("/admin/login");
      return;
    }
    setCurrentUser(JSON.parse(adminUser));
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("admin_user");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    setLocation("/admin/login");
  };

  // Fetch contact messages
  const { data: contactMessages = [] } = useQuery({
    queryKey: ["/api/admin/contact-messages"],
    enabled: !!currentUser,
  });

  // Fetch service requests
  const { data: serviceRequests = [] } = useQuery({
    queryKey: ["/api/admin/service-requests"],
    enabled: !!currentUser,
  });

  // Fetch announcements
  const { data: announcements = [] } = useQuery({
    queryKey: ["/api/admin/announcements"],
    enabled: !!currentUser,
  });

  // Update service request status
  const updateServiceRequestMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest(`/api/admin/service-request/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/service-requests"] });
      toast({
        title: "Status Updated",
        description: "Service request status updated successfully.",
      });
    },
  });

  // Delete announcement
  const deleteAnnouncementMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest(`/api/admin/announcements/${id}`, {
        method: "DELETE",
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/announcements"] });
      toast({
        title: "Announcement Deleted",
        description: "Announcement has been deleted successfully.",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "normal":
        return "bg-blue-100 text-blue-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">
                Welcome back, {currentUser.username}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setLocation("/admin/create-announcement")}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Announcement</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contactMessages.length}</div>
              <p className="text-xs text-muted-foreground">
                Contact form submissions
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Service Requests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{serviceRequests.length}</div>
              <p className="text-xs text-muted-foreground">
                Total service requests
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Announcements</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{announcements.length}</div>
              <p className="text-xs text-muted-foreground">
                Published announcements
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {serviceRequests.filter(r => r.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting processing
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="messages" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="messages">Contact Messages</TabsTrigger>
            <TabsTrigger value="requests">Service Requests</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>

          {/* Contact Messages Tab */}
          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Contact Messages</CardTitle>
                <CardDescription>
                  Messages from customers through the contact form
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactMessages.map((message: ContactMessage) => (
                    <div key={message.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{message.name}</h4>
                          <p className="text-sm text-gray-500">
                            {message.email} • {message.phone}
                          </p>
                        </div>
                        <div className="text-sm text-gray-400">
                          {new Date(message.createdAt).toLocaleDateString('en-IN')}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{message.message}</p>
                      {message.serviceType && (
                        <Badge variant="secondary" className="text-xs">
                          {message.serviceType}
                        </Badge>
                      )}
                    </div>
                  ))}
                  {contactMessages.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No contact messages yet.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Requests</CardTitle>
                <CardDescription>
                  Manage customer service requests and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceRequests.map((request: ServiceRequest) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{request.name}</h4>
                          <p className="text-sm text-gray-500">
                            {request.phone} {request.email && ` • ${request.email}`}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                          <div className="text-sm text-gray-400">
                            {new Date(request.createdAt).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm font-medium">
                          {request.serviceCategory} - {request.serviceType}
                        </p>
                        {request.details && (
                          <p className="text-sm text-gray-600 mt-1">{request.details}</p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateServiceRequestMutation.mutate({ 
                            id: request.id, 
                            status: "in-progress" 
                          })}
                          disabled={request.status === "in-progress"}
                        >
                          Mark In Progress
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateServiceRequestMutation.mutate({ 
                            id: request.id, 
                            status: "completed" 
                          })}
                          disabled={request.status === "completed"}
                        >
                          Mark Completed
                        </Button>
                      </div>
                    </div>
                  ))}
                  {serviceRequests.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No service requests yet.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>
                  Manage site announcements and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement: Announcement) => (
                    <div key={announcement.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{announcement.title}</h4>
                          {announcement.titleHindi && (
                            <p className="text-sm text-brand-blue font-medium">
                              {announcement.titleHindi}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(announcement.priority)}>
                            {announcement.priority}
                          </Badge>
                          <Badge variant={announcement.isActive ? "default" : "secondary"}>
                            {announcement.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs">
                          {announcement.category}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-2 line-clamp-3">
                        {announcement.content}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Created: {new Date(announcement.createdAt).toLocaleDateString('en-IN')}
                          {announcement.expiryDate && (
                            <span className="ml-2">
                              • Expires: {new Date(announcement.expiryDate).toLocaleDateString('en-IN')}
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setLocation(`/admin/edit-announcement/${announcement.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteAnnouncementMutation.mutate(announcement.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {announcements.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No announcements yet.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}