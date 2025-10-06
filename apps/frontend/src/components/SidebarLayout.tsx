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
  UserIcon,
  LogOutIcon,
  ChevronRightIcon,
} from "lucide-react";

const SidebarLayout: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isLoggedIn = true;

  const isActive = (path: string) => location.pathname === path;

  // Enhanced color scheme
  const sidebarBgClass = "bg-gradient-to-b from-green-800 to-green-900";
  const defaultTextClass = "text-green-100";
  const hoverBgClass = "hover:bg-green-700/80 hover:shadow-lg";
  const activeBgClass = "bg-white/10 text-white shadow-lg border-l-4 border-yellow-400";
  const transitionClass = "transition-all duration-300 ease-in-out";

  // Navigation items data for better organization
  const mainNavigation = [
    { path: "/create-product", icon: PlusIcon, label: t("nav.createProduct") },
    { path: "/soil-advice", icon: LeafIcon, label: t("nav.soil-advice") },
    { path: "/disease-detection", icon: ActivityIcon, label: t("nav.diseaseDetection") },
    { path: "/news", icon: NewspaperIcon, label: t("nav.news") },
    { path: "/products", icon: PackageIcon, label: t("nav.products") },
    { path: "/weather-detector", icon: CloudSunIcon, label: t("nav.weather"), mobileOnly: true },
    { path: "/calendar", icon: CalendarIcon, label: t("nav.calendar") },
  ];

  const bottomNavigation = [
    { path: "/settings", icon: SettingsIcon, label: t("nav.settings"), mobileOnly: true },
  ];

  return (
    <div
      className={`flex flex-col h-screen w-80 ${sidebarBgClass} ${defaultTextClass} border-r border-green-700/50 shadow-2xl relative overflow-hidden`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-transparent pointer-events-none"></div>
      
      {/* Logo/Brand Area */}
      <div className="p-3.5 border-b border-green-700/50 relative z-10 bg-green-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
              <LeafIcon className="w-6 h-6 text-green-900" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-green-900"></div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white tracking-tight">AgroLink</h1>
            <p className="text-xs text-green-300 mt-1 font-medium">
              Ethiopian Farmers Platform
            </p>
          </div>
        </div>
      </div>

 

      {/* Mobile-only sign-in/sign-up buttons */}
    

      {/* Main Navigation links */}
      <nav className="flex flex-col mt-2 space-y-1 p-4 flex-grow relative z-10">
        <div className="space-y-2">
          {mainNavigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl ${transitionClass} ${
                item.mobileOnly ? 'md:hidden' : ''
              } ${
                isActive(item.path)
                  ? `${activeBgClass} transform scale-105`
                  : `${hoverBgClass} hover:translate-x-1`
              } group relative overflow-hidden`}
            >
              {/* Active indicator dot */}
              {isActive(item.path) && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-r-full"></div>
              )}
              
              {/* Icon with gradient background */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isActive(item.path) 
                  ? 'bg-white/20 shadow-md' 
                  : 'bg-white/10 group-hover:bg-white/15'
              }`}>
                <item.icon className={`w-5 h-5 ${
                  isActive(item.path) ? 'text-yellow-400' : 'text-green-300'
                }`} />
              </div>
              
              <span className="font-medium text-green-100 flex-1">
                {item.label}
              </span>
              
              {/* Hover arrow */}
              <ChevronRightIcon className={`w-4 h-4 text-green-400 transition-transform duration-300 ${
                isActive(item.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} />
            </Link>
          ))}
        </div>
      </nav>

      

   

    </div>
  );
};

export default SidebarLayout;