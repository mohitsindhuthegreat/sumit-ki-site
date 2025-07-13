
import { useQuery } from "@tanstack/react-query";

export function useSiteSettings() {
  const { data: siteSettings = [] } = useQuery({
    queryKey: ["/api/admin/site-settings"],
  });

  const getSetting = (key: string, defaultValue: string = "") => {
    const setting = siteSettings.find(s => s.key === key);
    return setting?.value || defaultValue;
  };

  const getBooleanSetting = (key: string, defaultValue: boolean = false) => {
    const setting = siteSettings.find(s => s.key === key);
    if (!setting) return defaultValue;
    
    // Handle various boolean representations
    const value = setting.value.toLowerCase();
    return value === 'true' || value === '1' || value === 'yes' || value === 'on';
  };

  const getNumberSetting = (key: string, defaultValue: number = 0) => {
    const setting = siteSettings.find(s => s.key === key);
    if (!setting) return defaultValue;
    
    const parsed = parseFloat(setting.value);
    return isNaN(parsed) ? defaultValue : parsed;
  };

  return {
    getSetting,
    getBooleanSetting,
    getNumberSetting,
    siteSettings,
  };
}
