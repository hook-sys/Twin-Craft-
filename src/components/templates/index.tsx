import type { SiteContent } from "@/lib/site-content";
import BasicTemplate from "./basic";
import ConsultantTemplate from "./consultant";
import EducationTemplate from "./education";
import EventTemplate from "./event";
import ManufacturerTemplate from "./manufacturer";
import RestaurantTemplate from "./restaurant";
import RetailTemplate from "./retail";
import ServiceTemplate from "./service";

const registry: Record<
  string,
  (props: { content: SiteContent }) => React.ReactNode
> = {
  retail: RetailTemplate,
  service: ServiceTemplate,
  consultant: ConsultantTemplate,
  restaurant: RestaurantTemplate,
  manufacturer: ManufacturerTemplate,
  event: EventTemplate,
  education: EducationTemplate,
  basic: BasicTemplate,
};

export function TemplateRenderer({
  template,
  content,
}: {
  template: string;
  content: SiteContent;
}) {
  const Template = registry[template] ?? BasicTemplate;
  return <Template content={content} />;
}
