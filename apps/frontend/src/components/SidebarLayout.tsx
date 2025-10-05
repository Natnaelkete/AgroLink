import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  HomeIcon,
  PackageIcon,
  PlusIcon,
  ShoppingCartIcon,
  ActivityIcon,
  NewspaperIcon,
  CalendarIcon,
  LeafIcon,
  CloudSunIcon,
  SettingsIcon,
  HelpCircleIcon,
} from "lucide-react";
const SidebarLayout: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isLoggedIn = true; 
  const isActive = (path: string) => location.pathname === path;
  const sidebarBgClass = "bg-green-800";
  const defaultTextClass = "text-green-100";
  const hoverBgClass = "hover:bg-green-700";
  const activeBgClass = "bg-green-600 text-white";
  const transitionClass = "transition-all duration-300 ease-in-out";

  return (
    <div
      className={`flex flex-col h-screen ${sidebarBgClass} ${defaultTextClass} rounded-r-xl border-r border-green-700`}
    >
      {/* Logo/Brand Area */}
      <div className="p-4 border-b border-green-700">
        <div className="flex items-center justify-center">
          <LeafIcon className="w-8 h-8 text-green-300 mr-2" />
          <h1 className="text-xl font-bold text-white">AgroLink</h1>
        </div>
        <p className="text-xs text-green-300 text-center mt-1">
          Ethiopian Farmers Platform
        </p>
      </div>

      {/* Mobile-only sign-in/sign-up buttons, hidden on larger screens */}
      {!isLoggedIn && (
        <div className="flex flex-col gap-2 px-3 py-3 border-b border-green-700 md:hidden">
          <Link
            to="/sign-in"
            className="flex items-center justify-center w-full px-4 py-2 bg-green-700 text-green-100 rounded-md hover:bg-green-600 transition-colors"
          >
            {t("auth.signIn")}
          </Link>
          <Link
            to="/sign-up"
            className="flex items-center justify-center w-full px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-400 transition-colors"
          >
            {t("auth.signUp")}
          </Link>
        </div>
      )}

      {/* Main Navigation links */}
      <nav className="flex flex-col mt-2 space-y-1 p-2 flex-grow">
        {/* Dashboard Link */}
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-3 py-3 rounded-lg ${transitionClass} ${
            isActive("/dashboard")
              ? `${activeBgClass} shadow-md`
              : `${hoverBgClass}`
          }`}
        >
          <HomeIcon className="w-5 h-5" />
          <span className="font-medium">{t("nav.home")}</span>
        </Link>

        {/* Create Product Link */}
        <Link
          to="/create-product"
          className={`flex items-center gap-3 px-3 py-3 rounded-lg ${transitionClass} ${
            isActive("/create-product")
              ? `${activeBgClass} shadow-md`
              : `${hoverBgClass}`
          }`}
        >
          <PlusIcon className="w-5 h-5" />
          <span className="font-medium">{t("nav.createProduct")}</span>
        </Link>

        {/* soil-advice Link */}
        <Link
          to="/soil-advice"
          className={`flex items-center gap-3 px-3 py-3 rounded-lg ${transitionClass} ${
            isActive("/soil-advice")
              ? `${activeBgClass} shadow-md`
              : `${hoverBgClass}`
          }`}
        >
          <LeafIcon className="w-5 h-5" />
          <span className="font-medium">{t("nav.soil-advice")}</span>
        </Link>

        {/* Disease Detection Link */}
        <Link
          to="/disease-detection"
          className={`flex items-center gap-3 px-3 py-3 rounded-lg ${transitionClass} ${
            isActive("/disease-detection")
              ? `${activeBgClass} shadow-md`
              : `${hoverBgClass}`
          }`}
        >
          <ActivityIcon className="w-5 h-5" />
          <span className="font-medium">{t("nav.diseaseDetection")}</span>
        </Link>

        {/* News Link */}
        <Link
          to="/news"
          className={`flex items-center gap-3 px-3 py-3 rounded-lg ${transitionClass} ${
            isActive("/news") ? `${activeBgClass} shadow-md` : `${hoverBgClass}`
          }`}
        >
          <NewspaperIcon className="w-5 h-5" />
          <span className="font-medium">{t("nav.news")}</span>
        </Link>

        {/* Products Link */}
        <Link
          to="/products"
          className={`flex items-center gap-3 px-3 py-3 rounded-lg ${transitionClass} ${
            isActive("/products")
              ? `${activeBgClass} shadow-md`
              : `${hoverBgClass}`
          }`}
        >
          <PackageIcon className="w-5 h-5" />
          <span className="font-medium">{t("nav.products")}</span>
        </Link>

        {/* Weather Detector Link (hidden on larger screens) */}
        <Link
          to="/weather-detector"
          className={`flex md:hidden items-center gap-3 px-3 py-3 rounded-lg ${transitionClass} ${
            isActive("/weather-detector")
              ? `${activeBgClass} shadow-md`
              : `${hoverBgClass}`
          }`}
        >
          <CloudSunIcon className="w-5 h-5" />
          <span className="font-medium">{t("nav.weather")}</span>
        </Link>

        {/* Calendar Link */}
        <Link
          to="/calendar"
          className={`flex items-center gap-3 px-3 py-3 rounded-lg ${transitionClass} ${
            isActive("/calendar")
              ? `${activeBgClass} shadow-md`
              : `${hoverBgClass}`
          }`}
        >
          <CalendarIcon className="w-5 h-5" />
          <span className="font-medium">{t("nav.calendar")}</span>
        </Link>
      </nav>

      {/* Bottom Section */}
      <div className="p-2 space-y-1 border-t border-green-700 mt-auto">
        {/* Settings Link (hidden on larger screens) */}
        <Link
          to="/settings"
          className={`flex md:hidden items-center gap-3 px-3 py-3 rounded-lg ${transitionClass} ${hoverBgClass}`}
        >
          <SettingsIcon className="w-5 h-5" />
          <span className="font-medium">{t("nav.settings")}</span>
        </Link>

        {/* Help Center Link */}
        <Link
          to="/help"
          className={`flex items-center gap-3 px-3 py-3 rounded-lg ${transitionClass} ${hoverBgClass}`}
        >
          <HelpCircleIcon className="w-5 h-5" />
          <span className="font-medium">{t("nav.helpCenter")}</span>
        </Link>
      </div>

      {/* Footer */}
      <div className="p-3 text-xs text-green-300 text-center border-t border-green-700">
        {t("footer.copyright")} • AgroLink v1.0
      </div>
    </div>
  );
};

export default SidebarLayout;
