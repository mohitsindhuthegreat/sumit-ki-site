import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ExternalLink, Briefcase, Bell, FileText, TrendingUp, AlertCircle } from "lucide-react";
import { Announcement } from "@shared/schema";
import { formatDate } from "date-fns";

interface AnnouncementDialogProps {
  announcement: Announcement;
  children: React.ReactNode;
}

export default function AnnouncementDialog({ announcement, children }: AnnouncementDialogProps) {
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
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
      case "news":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
      case "form":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800";
      case "update":
        return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800";
      case "notice":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg border ${getCategoryColor(announcement.category)}`}>
              {getCategoryIcon(announcement.category)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={getCategoryColor(announcement.category)}>
                  {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                </Badge>
                <Badge variant="outline" className={getPriorityColor(announcement.priority)}>
                  {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
                </Badge>
              </div>
              <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                {announcement.title}
              </DialogTitle>
              {announcement.titleHindi && (
                <p className="text-brand-blue dark:text-brand-blue font-semibold mt-1">
                  {announcement.titleHindi}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Published: {formatDate(announcement.createdAt, "MMM dd, yyyy")}</span>
            </div>
            {announcement.expiryDate && (
              <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                <Clock className="h-4 w-4" />
                <span>Expires: {formatDate(announcement.expiryDate, "MMM dd, yyyy")}</span>
              </div>
            )}
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {announcement.content}
            </p>
            {announcement.contentHindi && (
              <p className="text-gray-600 dark:text-gray-400 mt-4 font-medium whitespace-pre-wrap">
                {announcement.contentHindi}
              </p>
            )}
          </div>
          
          {announcement.applyLink && (
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button 
                className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                onClick={() => window.open(announcement.applyLink, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Apply Now
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click to apply on official website
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}