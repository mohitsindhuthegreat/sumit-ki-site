import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertAnnouncementSchema } from "@shared/schema";
import { z } from "zod";

const formSchema = insertAnnouncementSchema.extend({
  expiryDate: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AdminEditAnnouncement() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const announcementId = params.id ? parseInt(params.id) : null;

  useEffect(() => {
    const adminUser = localStorage.getItem("admin_user");
    if (!adminUser) {
      setLocation("/admin/login");
      return;
    }
    setCurrentUser(JSON.parse(adminUser));
  }, [setLocation]);

  // Fetch announcement data
  const { data: announcement, isLoading } = useQuery({
    queryKey: ["/api/admin/announcements", announcementId],
    queryFn: async () => {
      const response = await apiRequest(`/api/admin/announcements`);
      const announcements = await response.json();
      return announcements.find((a: any) => a.id === announcementId);
    },
    enabled: !!announcementId && !!currentUser,
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      titleHindi: "",
      content: "",
      contentHindi: "",
      category: "news",
      priority: "normal",
      isActive: true,
      applyLink: "",
      expiryDate: "",
    },
  });

  // Update form when announcement data is loaded
  useEffect(() => {
    if (announcement) {
      form.reset({
        title: announcement.title || "",
        titleHindi: announcement.titleHindi || "",
        content: announcement.content || "",
        contentHindi: announcement.contentHindi || "",
        category: announcement.category || "news",
        priority: announcement.priority || "normal",
        isActive: announcement.isActive ?? true,
        applyLink: announcement.applyLink || "",
        expiryDate: announcement.expiryDate ? new Date(announcement.expiryDate).toISOString().split('T')[0] : "",
      });
    }
  }, [announcement, form]);

  const updateAnnouncementMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const submitData = {
        ...data,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
      };
      const response = await apiRequest(`/api/admin/announcements/${announcementId}`, {
        method: "PATCH",
        body: JSON.stringify(submitData),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/announcements"] });
      toast({
        title: "Success",
        description: "Announcement updated successfully!",
      });
      setLocation("/admin/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update announcement. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    updateAnnouncementMutation.mutate(data);
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Announcement Not Found</h2>
          <p className="text-gray-600 mb-4">The announcement you're looking for doesn't exist.</p>
          <Button onClick={() => setLocation("/admin/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
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
                <h1 className="text-2xl font-bold text-gray-900">Edit Announcement</h1>
                <p className="text-sm text-gray-500">
                  Update announcement details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Announcement</CardTitle>
            <CardDescription>
              Update the announcement details below. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title (English) *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter announcement title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="titleHindi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title (Hindi)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="घोषणा का शीर्षक हिंदी में" 
                            {...field} 
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content (English) *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter the announcement content..."
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contentHindi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content (Hindi)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="घोषणा की सामग्री हिंदी में..."
                          rows={6}
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="vacancy">Job Vacancy</SelectItem>
                            <SelectItem value="news">News</SelectItem>
                            <SelectItem value="form">Form Update</SelectItem>
                            <SelectItem value="update">General Update</SelectItem>
                            <SelectItem value="notice">Important Notice</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="applyLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apply Link (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter apply link (e.g., https://example.com/apply)"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <div className="text-sm text-muted-foreground">
                        If provided, an "Apply Now" button will appear for this announcement
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Publish Announcement
                        </FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Make this announcement visible to users
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setLocation("/admin/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={updateAnnouncementMutation.isPending}
                    className="flex items-center space-x-2"
                  >
                    {updateAnnouncementMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Update Announcement</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}