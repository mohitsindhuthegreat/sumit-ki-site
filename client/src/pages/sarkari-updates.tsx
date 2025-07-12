import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Calendar, 
  Clock, 
  FileText, 
  Briefcase, 
  AlertCircle, 
  Star,
  Search,
  Filter,
  TrendingUp,
  Users,
  BookOpen,
  Award
} from "lucide-react";
import type { Announcement } from "@shared/schema";

export default function SarkariUpdates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch active announcements
  const { data: announcements = [], isLoading } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"],
  });

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (announcement.titleHindi && announcement.titleHindi.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || announcement.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "vacancy":
        return <Briefcase className="h-5 w-5" />;
      case "news":
        return <Bell className="h-5 w-5" />;
      case "form":
        return <FileText className="h-5 w-5" />;
      case "update":
        return <TrendingUp className="h-5 w-5" />;
      case "notice":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "vacancy":
        return "bg-green-100 text-green-800 border-green-200";
      case "news":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "form":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "update":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "notice":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <Star className="h-4 w-4 text-red-500" />;
      case "normal":
        return <Star className="h-4 w-4 text-blue-500" />;
      case "low":
        return <Star className="h-4 w-4 text-green-500" />;
      default:
        return <Star className="h-4 w-4 text-gray-500" />;
    }
  };

  const categories = [
    { id: "all", name: "All Updates", icon: <Bell className="h-4 w-4" /> },
    { id: "vacancy", name: "Job Vacancy", icon: <Briefcase className="h-4 w-4" /> },
    { id: "news", name: "Latest News", icon: <Bell className="h-4 w-4" /> },
    { id: "form", name: "Form Updates", icon: <FileText className="h-4 w-4" /> },
    { id: "update", name: "General Updates", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "notice", name: "Important Notice", icon: <AlertCircle className="h-4 w-4" /> },
  ];

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-cyan text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Sarkari Updates & Notifications</h1>
            <p className="text-xl text-blue-100 mb-2">
              Latest Government Jobs, Forms, and Important Updates
            </p>
            <p className="text-lg text-blue-100">
              नवीनतम सरकारी नौकरी, फॉर्म और महत्वपूर्ण अपडेट
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Updates</p>
                  <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Bell className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Job Vacancies</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {announcements.filter(a => a.category === "vacancy").length}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Form Updates</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {announcements.filter(a => a.category === "form").length}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {announcements.filter(a => {
                      const date = new Date(a.createdAt);
                      const now = new Date();
                      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search updates, jobs, forms... / अपडेट खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    {category.icon}
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-brand-blue border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading latest updates...</p>
          </div>
        ) : filteredAnnouncements.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Updates Found</h3>
              <p className="text-gray-600 mb-2">
                No updates match your current search criteria.
              </p>
              <p className="text-sm text-gray-500">
                आपके खोज मानदंड से कोई अपडेट नहीं मिला।
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredAnnouncements.map((announcement) => (
              <Card key={announcement.id} className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${getCategoryColor(announcement.category)}`}>
                        {getCategoryIcon(announcement.category)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className={getCategoryColor(announcement.category)}>
                            {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                          </Badge>
                          {getPriorityIcon(announcement.priority)}
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900">
                          {announcement.title}
                        </CardTitle>
                        {announcement.titleHindi && (
                          <p className="text-brand-blue font-semibold">
                            {announcement.titleHindi}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(announcement.createdAt)}
                      </div>
                      {announcement.expiryDate && (
                        <div className="flex items-center gap-1 text-red-600">
                          <Clock className="h-4 w-4" />
                          Expires: {formatDate(announcement.expiryDate)}
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {announcement.content}
                      </p>
                      {announcement.contentHindi && (
                        <p className="text-gray-600 mt-3 font-medium">
                          {announcement.contentHindi}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Public Notice
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          Official Update
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-brand-blue border-brand-blue hover:bg-brand-blue hover:text-white"
                          onClick={() => {
                            // Open announcement in a modal or new page
                            window.open(`/sarkari-updates/${announcement.id}`, '_blank');
                          }}
                        >
                          <BookOpen className="h-4 w-4 mr-1" />
                          Read More
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            // Generate and download PDF
                            const element = document.createElement('a');
                            const file = new Blob([
                              `${announcement.title}\n\n${announcement.content}\n\n${announcement.contentHindi || ''}\n\nCreated: ${formatDate(announcement.createdAt)}\n\nSource: Mahech Internet Cafe - Sarkari Updates`
                            ], { type: 'text/plain' });
                            element.href = URL.createObjectURL(file);
                            element.download = `${announcement.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
                            document.body.appendChild(element);
                            element.click();
                            document.body.removeChild(element);
                          }}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-cyan text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated with Latest Notifications</h2>
            <p className="text-blue-100 mb-6">
              Get instant notifications about new job vacancies, form submissions, and important updates.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-brand-blue hover:bg-gray-100">
              <Bell className="h-5 w-5 mr-2" />
              Subscribe to Updates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}