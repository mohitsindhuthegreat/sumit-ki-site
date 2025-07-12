import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Save, Plus, Settings, Trash2, Edit, Database, Globe, Phone } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertSiteSettingSchema } from "@shared/schema";
import { z } from "zod";

const settingSchema = insertSiteSettingSchema;
type SettingFormData = z.infer<typeof settingSchema>;

export default function AdminSettings() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useState<any>(null);
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

  // Fetch site settings
  const { data: siteSettings = [] } = useQuery({
    queryKey: ["/api/admin/site-settings"],
    enabled: !!currentUser,
  });

  const form = useForm<SettingFormData>({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      key: "",
      value: "",
      description: "",
    },
  });

  const createSettingMutation = useMutation({
    mutationFn: async (data: SettingFormData) => {
      const response = await apiRequest("POST", "/api/admin/site-settings", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/site-settings"] });
      toast({
        title: "Success",
        description: "Site setting created successfully!",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create site setting. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SettingFormData) => {
    createSettingMutation.mutate(data);
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
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setLocation("/admin/dashboard")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
                <p className="text-sm text-gray-500">
                  Manage site configuration and settings
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="custom">Custom Settings</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Site Information
                </CardTitle>
                <CardDescription>
                  Basic information about your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Site Title</h3>
                    <p className="text-sm text-gray-600">Mahech Internet Cafe</p>
                    <p className="text-sm text-gray-600">महेच इंटरनेट कैफे</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Site Description</h3>
                    <p className="text-sm text-gray-600">
                      Complete digital solution hub for government services, banking, and more
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="h-4 w-4 text-blue-600" />
                      <h4 className="font-medium">Database Status</h4>
                    </div>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Connected
                    </Badge>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="h-4 w-4 text-purple-600" />
                      <h4 className="font-medium">AI Chat</h4>
                    </div>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4 text-green-600" />
                      <h4 className="font-medium">Services</h4>
                    </div>
                    <Badge variant="default" className="bg-blue-100 text-blue-800">
                      8 Active
                    </Badge>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Settings */}
          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Manage business contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-medium">Current Contact Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Phone:</strong> +91 98765 43210</p>
                      <p><strong>WhatsApp:</strong> +91 98765 43210</p>
                      <p><strong>Email:</strong> info@mahechcafe.com</p>
                      <p><strong>Address:</strong> Main Market, Sector 15, Hisar, Haryana</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Business Hours</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Monday - Saturday:</strong> 9:00 AM - 9:00 PM</p>
                      <p><strong>Sunday:</strong> 10:00 AM - 6:00 PM</p>
                      <p><strong>Holidays:</strong> 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Settings */}
          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Services</CardTitle>
                <CardDescription>
                  Overview of all services offered
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Government Services", count: "15+", status: "Active" },
                    { name: "Banking Services", count: "12+", status: "Active" },
                    { name: "Travel Booking", count: "8+", status: "Active" },
                    { name: "Printing Services", count: "10+", status: "Active" },
                    { name: "Online Forms", count: "20+", status: "Active" },
                    { name: "Computer Training", count: "5+", status: "Active" },
                  ].map((service) => (
                    <Card key={service.name} className="p-4">
                      <h4 className="font-medium mb-2">{service.name}</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{service.count} services</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          {service.status}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Custom Settings */}
          <TabsContent value="custom" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Custom Site Settings</CardTitle>
                <CardDescription>
                  Add custom configuration settings for your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="key"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Setting Key *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., maintenance_mode" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Setting Value *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., false" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief description of what this setting does..."
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={createSettingMutation.isPending}
                        className="flex items-center space-x-2"
                      >
                        {createSettingMutation.isPending ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                            <span>Creating...</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4" />
                            <span>Add Setting</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>

                {/* Existing Settings */}
                <div className="mt-8">
                  <h3 className="font-medium mb-4">Existing Settings</h3>
                  <div className="space-y-3">
                    {siteSettings.map((setting: any) => (
                      <Card key={setting.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{setting.key}</h4>
                            <p className="text-sm text-gray-600">{setting.value}</p>
                            {setting.description && (
                              <p className="text-xs text-gray-500 mt-1">{setting.description}</p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                    {siteSettings.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No custom settings configured yet.
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}