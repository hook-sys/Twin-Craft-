import {
  BlogIcon,
  BoltIcon,
  CheckCircle,
  ClockIcon,
  WarningIcon,
  BoxIcon,
  CardIcon,
  ChartIcon,
  GearIcon,
  HeadsetIcon,
  HomeIcon,
  LayersIcon,
  ListIcon,
  PageIcon,
  PenIcon,
  UserIcon,
  UsersIcon,
} from "@/components/dashboard/icons";

/** One place that maps a module's icon key to a drawn icon. */
export default function ModuleIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  switch (name) {
    case "dashboard":
      return <HomeIcon className={className} />;
    case "account":
      return <UserIcon className={className} />;
    case "site":
      return <BoxIcon className={className} />;
    case "design":
      return <PenIcon className={className} />;
    case "products":
      return <LayersIcon className={className} />;
    case "leads":
      return <UsersIcon className={className} />;
    case "reports":
      return <ChartIcon className={className} />;
    case "subscriptions":
      return <CardIcon className={className} />;
    case "pages":
      return <PageIcon className={className} />;
    case "blog":
      return <BlogIcon className={className} />;
    case "support":
      return <HeadsetIcon className={className} />;
    case "settings":
      return <GearIcon className={className} />;
    // aliases used by summaries and the activity feed
    case "warning":
      return <WarningIcon className={className} />;
    case "check":
      return <CheckCircle className={className} />;
    case "clock":
      return <ClockIcon className={className} />;
    case "money":
      return <CardIcon className={className} />;
    case "bolt":
      return <BoltIcon className={className} />;
    case "production":
      return <LayersIcon className={className} />;
    case "inventory":
      return <BoxIcon className={className} />;
    case "accounts":
      return <CardIcon className={className} />;
    case "hr":
    case "crm":
      return <UsersIcon className={className} />;
    default:
      return <ListIcon className={className} />;
  }
}
