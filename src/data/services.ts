export type ServiceCategoryId =
  | "all"
  | "web"
  | "seo"
  | "marketing"
  | "automation"
  | "productDesign"
  | "print"
  | "mobile"
  | "devHelp"
  | "branding";

export type ServiceCategory = {
  id: ServiceCategoryId;
  i18nKey: string;
};

export type ServiceItem = {
  id: string;
  categoryIds: Exclude<ServiceCategoryId, "all">[];
  titleKey: string;
  descKey: string;
};

export const categories: ServiceCategory[] = [
  { id: "all", i18nKey: "services.categories.all" },
  { id: "web", i18nKey: "services.categories.web" },
  { id: "seo", i18nKey: "services.categories.seo" },
  { id: "marketing", i18nKey: "services.categories.marketing" },
  { id: "automation", i18nKey: "services.categories.automation" },
  { id: "productDesign", i18nKey: "services.categories.productDesign" },
  { id: "print", i18nKey: "services.categories.print" },
  { id: "mobile", i18nKey: "services.categories.mobile" },
  { id: "devHelp", i18nKey: "services.categories.devHelp" },
  { id: "branding", i18nKey: "services.categories.branding" }
];

export const services: ServiceItem[] = [
  {
    id: "web-design",
    categoryIds: ["web"],
    titleKey: "services.items.webDesign.title",
    descKey: "services.items.webDesign.desc"
  },
  {
    id: "web-development",
    categoryIds: ["web"],
    titleKey: "services.items.webDevelopment.title",
    descKey: "services.items.webDevelopment.desc"
  },
  {
    id: "seo-audit",
    categoryIds: ["seo"],
    titleKey: "services.items.seoAudit.title",
    descKey: "services.items.seoAudit.desc"
  },
  {
    id: "seo-optimization",
    categoryIds: ["seo"],
    titleKey: "services.items.seoOptimization.title",
    descKey: "services.items.seoOptimization.desc"
  },
  {
    id: "online-marketing",
    categoryIds: ["marketing"],
    titleKey: "services.items.onlineMarketing.title",
    descKey: "services.items.onlineMarketing.desc"
  },
  {
    id: "ads-setup",
    categoryIds: ["marketing"],
    titleKey: "services.items.adsSetup.title",
    descKey: "services.items.adsSetup.desc"
  },
  {
    id: "business-automation",
    categoryIds: ["automation"],
    titleKey: "services.items.businessAutomation.title",
    descKey: "services.items.businessAutomation.desc"
  },
  {
    id: "crm-integrations",
    categoryIds: ["automation"],
    titleKey: "services.items.crmIntegrations.title",
    descKey: "services.items.crmIntegrations.desc"
  },
  {
    id: "product-design",
    categoryIds: ["productDesign"],
    titleKey: "services.items.productDesign.title",
    descKey: "services.items.productDesign.desc"
  },
  {
    id: "design-system",
    categoryIds: ["productDesign"],
    titleKey: "services.items.designSystem.title",
    descKey: "services.items.designSystem.desc"
  },
  {
    id: "print-design",
    categoryIds: ["print"],
    titleKey: "services.items.printDesign.title",
    descKey: "services.items.printDesign.desc"
  },
  {
    id: "brand-assets",
    categoryIds: ["print", "branding"],
    titleKey: "services.items.brandAssets.title",
    descKey: "services.items.brandAssets.desc"
  },
  {
    id: "mobile-apps",
    categoryIds: ["mobile"],
    titleKey: "services.items.mobileApps.title",
    descKey: "services.items.mobileApps.desc"
  },
  {
    id: "app-ui-ux",
    categoryIds: ["mobile", "productDesign"],
    titleKey: "services.items.appUiUx.title",
    descKey: "services.items.appUiUx.desc"
  },
  {
    id: "code-help",
    categoryIds: ["devHelp"],
    titleKey: "services.items.codeHelp.title",
    descKey: "services.items.codeHelp.desc"
  },
  {
    id: "consulting",
    categoryIds: ["devHelp"],
    titleKey: "services.items.consulting.title",
    descKey: "services.items.consulting.desc"
  },
  {
    id: "logo",
    categoryIds: ["branding"],
    titleKey: "services.items.logo.title",
    descKey: "services.items.logo.desc"
  },
  {
    id: "brand-guidelines",
    categoryIds: ["branding", "productDesign"],
    titleKey: "services.items.brandGuidelines.title",
    descKey: "services.items.brandGuidelines.desc"
  }
];

