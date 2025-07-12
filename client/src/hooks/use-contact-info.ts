import { useQuery } from "@tanstack/react-query";

export function useContactInfo() {
  const { data: siteSettings = [] } = useQuery({
    queryKey: ["/api/admin/site-settings"],
  });

  const getContactInfo = (key: string) => {
    const setting = siteSettings.find(s => s.key === key);
    return setting?.value || "";
  };

  return {
    phone: getContactInfo('contact_phone'),
    phoneAlt: getContactInfo('contact_phone_alt'),
    whatsapp: getContactInfo('contact_whatsapp'),
    email: getContactInfo('contact_email'),
    emailSupport: getContactInfo('contact_email_support'),
    address: getContactInfo('contact_address'),
    addressHindi: getContactInfo('contact_address_hindi'),
    businessHours: getContactInfo('business_hours'),
    businessHoursHindi: getContactInfo('business_hours_hindi'),
    siteTitle: getContactInfo('site_title'),
    siteTitleHindi: getContactInfo('site_title_hindi'),
    siteDescription: getContactInfo('site_description'),
    siteDescriptionHindi: getContactInfo('site_description_hindi'),
    siteSettings,
  };
}