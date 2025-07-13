import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Calendar, 
  Clock, 
  FileText, 
  Briefcase, 
  AlertCircle, 
  Star,
  ArrowRight,
  TrendingUp,
  ExternalLink
} from "lucide-react";
import { Link } from "wouter";
import type { Announcement } from "@shared/schema";
import AnnouncementDialog from "./announcement-dialog";

export default function AnnouncementsSection() {
  // Fetch active announcements
  const { data: announcements = [], isLoading } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"],
  });

  // Filter and show the latest vacancy and form announcements
  const vacancyAnnouncements = announcements.filter(a => a.category === "vacancy").slice(0, 2);
  const formAnnouncements = announcements.filter(a => a.category === "form").slice(0, 2);
  const otherAnnouncements = announcements.filter(a => !["vacancy", "form"].includes(a.category)).slice(0, 2);

  // Combine and show only the latest 6 announcements with priority to vacancy and forms
  const latestAnnouncements = [...vacancyAnnouncements, ...formAnnouncements, ...otherAnnouncements].slice(0, 6);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "vacancy":
        return <Briefcase className="h-4 w-4" />;
      case "news":
        return <Bell className="h-4 w-4" />;
      case "form":
        return <FileText className="h-4 w-4" />;
      case "update":
        return <TrendingUp className="h-4 w-4" />;
      case "notice":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
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
        return <Star className="h-4 w-4 text-red-500 fill-red-500" />;
      case "normal":
        return <Star className="h-4 w-4 text-blue-500" />;
      case "low":
        return <Star className="h-4 w-4 text-green-500" />;
      default:
        return <Star className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (expiryDate: string | Date | null) => {
    if (!expiryDate) return null;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-brand-blue border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading latest updates...</p>
          </div>
        </div>
      </section>
    );
  }

  if (announcements.length === 0) {
    return null; // Don't show the section if there are no announcements
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Vacancies & Forms
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Automatically updated with the latest government job notifications and application forms
            <br />
            <span className="text-brand-blue font-medium">
              स्वचालित रूप से नवीनतम सरकारी नौकरी अधिसूचना और आवेदन फॉर्म के साथ अपडेट
            </span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {latestAnnouncements.map((announcement) => (
            <Card key={announcement.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg border ${getCategoryColor(announcement.category)}`}>
                      {getCategoryIcon(announcement.category)}
                    </div>
                    {getPriorityIcon(announcement.priority)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(announcement.createdAt)}
                  </div>
                </div>
                <Badge variant="outline" className={`${getCategoryColor(announcement.category)} w-fit mb-2`}>
                  {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                </Badge>
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                  {announcement.title}
                </CardTitle>
                {announcement.titleHindi && (
                  <p className="text-brand-blue font-semibold text-sm">
                    {announcement.titleHindi}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                  {announcement.content}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    {announcement.expiryDate && (
                          <div className={`flex items-center text-xs px-2 py-1 rounded ${
                            getDaysRemaining(announcement.expiryDate) && getDaysRemaining(announcement.expiryDate)! <= 7
                              ? 'text-red-700 bg-red-100 border border-red-200'
                              : 'text-orange-700 bg-orange-100 border border-orange-200'
                          }`}>
                            <Clock className="h-3 w-3 mr-1" />
                            {getDaysRemaining(announcement.expiryDate) && getDaysRemaining(announcement.expiryDate)! > 0 ? (
                              `${getDaysRemaining(announcement.expiryDate)} days left`
                            ) : (
                              `Expires: ${formatDate(announcement.expiryDate)}`
                            )}
                          </div>
                        )}
                  </div>
                  <div className="flex items-center gap-2">
                    <AnnouncementDialog announcement={announcement}>
                      <Button size="sm" variant="outline" className="text-brand-blue border-brand-blue hover:bg-brand-blue hover:text-white">
                        Read More
                      </Button>
                    </AnnouncementDialog>
                    {announcement.applyLink && (
                      <Button 
                        size="sm" 
                        className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                        onClick={() => window.open(announcement.applyLink, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Apply Now
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/sarkari-updates" 
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Bell className="h-5 w-5" />
            View All Updates
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}