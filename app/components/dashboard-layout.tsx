import { ReactNode, useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from '@remix-run/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Settings, LogOut, Menu, X, Home, ChevronDown, ChevronLeft, ChevronRight,
  Search, Bell, Plus, Hash, Bot, Brain, BookOpen, Headphones, TrendingUp, Users, Inbox,
  UserPlus, HelpCircle, Mic, Slash
} from 'lucide-react';
import { useAuth } from '~/lib/auth-context';
import { cn } from '~/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

interface Breadcrumb {
  label: string;
  href: string;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
        event.preventDefault();
        toggleSidebar();
      }
      if (event.key === '/' && !searchFocused) {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === 'Escape' && searchFocused) {
        searchRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchFocused]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (userDropdownOpen) setUserDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userDropdownOpen]);

  const getInitials = () => {
    if (!user || !user.name) return 'U';
    return user.name.split(' ').map((name: string) => name[0]).join('').toUpperCase().substring(0, 2);
  };

  const getBreadcrumbs = (): Breadcrumb[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: Breadcrumb[] = [];
    
    if (pathSegments.length === 1 && pathSegments[0] === 'dashboard') {
      return [{ label: 'Overview', href: '/dashboard' }];
    }
    
    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      if (segment === 'dashboard') {
        breadcrumbs.push({ label: 'Dashboard', href: currentPath });
      } else {
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);
        breadcrumbs.push({ label, href: currentPath });
      }
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Overview', href: '/dashboard' },
    { icon: <MessageCircle className="h-5 w-5" />, label: 'Conversations', href: '/dashboard/conversations' },
    { icon: <Hash className="h-5 w-5" />, label: 'Channels', href: '/dashboard/channels' },
    { icon: <Bot className="h-5 w-5" />, label: 'AI Agents', href: '/dashboard/agents' },
    { icon: <Brain className="h-5 w-5" />, label: 'Personas', href: '/dashboard/personas' },
    { icon: <BookOpen className="h-5 w-5" />, label: 'Knowledge', href: '/dashboard/knowledge' },
    { icon: <Headphones className="h-5 w-5" />, label: 'Voice Studio', href: '/dashboard/voice' },
    { icon: <TrendingUp className="h-5 w-5" />, label: 'Analytics', href: '/dashboard/analytics' }
  ];

  const toolsItems = [
    { icon: <Bell className="h-4 w-4" />, label: 'Notifications', href: '/dashboard/notifications', badge: '3' },
    { icon: <Users className="h-4 w-4" />, label: 'Members', href: '/dashboard/members' },
    { icon: <Inbox className="h-4 w-4" />, label: 'Inbox', href: '/dashboard/inbox' },
    { icon: <UserPlus className="h-4 w-4" />, label: 'Integrations', href: '/dashboard/integrations' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-charcoal-50 to-charcoal-100 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: collapsed ? -200 : -280 }}
        animate={{ x: 0, width: collapsed ? 80 : 280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "glass-card border-r border-charcoal-200/50 flex flex-col shadow-lg backdrop-blur-xl",
          collapsed ? "w-20" : "w-70"
        )}
      >
        {/* Logo & Search */}
        <div className="p-4 border-b border-charcoal-100/50">
          <div className="flex items-center space-x-2 mb-4">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">OA</span>
              </div>
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="font-semibold text-charcoal-900">OmniAgent</span>
                    <span className="text-xs text-charcoal-500 block">Pro</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
            
            <button
              onClick={toggleSidebar}
              className="ml-auto p-1.5 rounded-lg hover:bg-charcoal-100/50 transition-colors group"
              title={collapsed ? "Expand sidebar (⌘B)" : "Collapse sidebar (⌘B)"}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4 text-charcoal-500 group-hover:text-charcoal-700" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-charcoal-500 group-hover:text-charcoal-700" />
              )}
            </button>
          </div>

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                <input
                  ref={searchRef}
                  placeholder="Search..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={cn(
                    "w-full pl-10 pr-10 h-9 glass rounded-xl text-sm transition-all duration-200",
                    "focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300",
                    "placeholder:text-charcoal-400"
                  )}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                  <kbd className="text-xs text-charcoal-400 bg-charcoal-100/50 px-1.5 py-0.5 rounded border border-charcoal-200/50">
                    <Slash className="h-3 w-3" />
                  </kbd>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dashboard Dropdown */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 py-2"
            >
              <button className="w-full flex items-center justify-between h-8 px-2 text-sm font-medium text-charcoal-700 hover:bg-charcoal-50/50 rounded-lg transition-colors">
                Dashboard
                <ChevronDown className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item, index) => {
            const isActive = item.href === '/dashboard' 
              ? location.pathname === '/dashboard' 
              : location.pathname.startsWith(item.href);
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center rounded-xl text-sm font-medium transition-all duration-200 group relative",
                    collapsed ? "px-2 py-3 justify-center" : "px-3 py-2",
                    isActive
                      ? "glass text-charcoal-900 shadow-md"
                      : "text-charcoal-600 hover:glass hover:text-charcoal-900"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <div className={cn(
                    "transition-colors flex-shrink-0",
                    collapsed ? "mr-0" : "mr-3",
                    isActive
                      ? "text-charcoal-900"
                      : "text-charcoal-400 group-hover:text-charcoal-600"
                  )}>
                    {item.icon}
                  </div>
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="truncate"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Tools Section */}
        <div className="px-4 py-2 border-t border-charcoal-100/50">
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs font-medium text-charcoal-500 mb-2 px-3"
              >
                Tools
              </motion.div>
            )}
          </AnimatePresence>
          <div className="space-y-1">
            {toolsItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navItems.length + index) * 0.1 }}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center rounded-xl text-sm font-medium transition-all duration-200 group relative",
                    collapsed ? "px-2 py-3 justify-center" : "px-3 py-2",
                    "text-charcoal-600 hover:glass hover:text-charcoal-900"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <div className={cn(
                    "text-charcoal-400 group-hover:text-charcoal-600 transition-colors flex-shrink-0",
                    collapsed ? "mr-0" : "mr-3"
                  )}>
                    {item.icon}
                  </div>
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="truncate"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {item.badge && !collapsed && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Help & Settings */}
        <div className="px-4 py-2 border-t border-charcoal-100/50 space-y-1">
          <Link
            to="/dashboard/help"
            className={cn(
              "flex items-center rounded-xl text-sm font-medium transition-all duration-200 group",
              collapsed ? "px-2 py-3 justify-center" : "px-3 py-2",
              "text-charcoal-600 hover:glass hover:text-charcoal-900"
            )}
            title={collapsed ? "Help Center" : undefined}
          >
            <HelpCircle className={cn(
              "h-4 w-4 text-charcoal-400 group-hover:text-charcoal-600 transition-colors flex-shrink-0",
              collapsed ? "mr-0" : "mr-3"
            )} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Help Center
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Link
            to="/dashboard/settings"
            className={cn(
              "flex items-center rounded-xl text-sm font-medium transition-all duration-200 group",
              collapsed ? "px-2 py-3 justify-center" : "px-3 py-2",
              "text-charcoal-600 hover:glass hover:text-charcoal-900"
            )}
            title={collapsed ? "Settings" : undefined}
          >
            <Settings className={cn(
              "h-4 w-4 text-charcoal-400 group-hover:text-charcoal-600 transition-colors flex-shrink-0",
              collapsed ? "mr-0" : "mr-3"
            )} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-charcoal-100/50">
          <div className="relative">
            <button
              onClick={toggleUserDropdown}
              className={cn(
                "w-full flex items-center space-x-3 p-2 rounded-xl hover:glass cursor-pointer group transition-all duration-200",
                collapsed && "justify-center space-x-0"
              )}
            >
              <div className="h-8 w-8 bg-gradient-to-br from-charcoal-700 to-charcoal-900 text-white text-sm rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                {getInitials()}
              </div>
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 text-left"
                  >
                    <div className="text-sm font-medium text-charcoal-900">
                      {user?.name || 'David Johnson'}
                    </div>
                    <div className="text-xs text-charcoal-500">
                      {user?.email || 'david@gmail.com'}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className={cn(
                      "h-4 w-4 text-charcoal-400 transition-transform duration-200",
                      userDropdownOpen && "rotate-180"
                    )} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {userDropdownOpen && !collapsed && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-0 right-0 mb-2 glass-card p-2 shadow-xl border border-charcoal-200/50"
                >
                  <Link
                    to="/dashboard/profile"
                    className="flex items-center px-3 py-2 text-sm text-charcoal-700 hover:bg-charcoal-50/50 rounded-lg transition-colors"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-3 text-charcoal-400" />
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50/50 rounded-lg transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
              onClick={toggleMobileMenu}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-72 glass-card border-r border-charcoal-200/50 md:hidden shadow-2xl"
            >
              <div className="h-16 border-b border-charcoal-100/50 px-4 flex items-center justify-between">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2"
                  onClick={toggleMobileMenu}
                >
                  <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">OA</span>
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal-900">OmniAgent</span>
                    <span className="text-xs text-charcoal-500 block">Pro</span>
                  </div>
                </Link>
                <button
                  onClick={toggleMobileMenu}
                  className="p-1.5 rounded-xl hover:bg-charcoal-100/50 transition-colors"
                >
                  <X className="h-5 w-5 text-charcoal-500" />
                </button>
              </div>

              <div className="p-4 border-b border-charcoal-100/50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                  <input
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 h-10 glass rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 placeholder:text-charcoal-400"
                  />
                </div>
              </div>

              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item, index) => {
                  const isActive = item.href === '/dashboard'
                    ? location.pathname === '/dashboard'
                    : location.pathname.startsWith(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        onClick={toggleMobileMenu}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative",
                          isActive
                            ? "glass text-charcoal-900 shadow-md"
                            : "text-charcoal-700 hover:glass hover:text-charcoal-900"
                        )}
                      >
                        <div className={cn(
                          "mr-3 transition-colors",
                          isActive ? "text-charcoal-900" : "text-charcoal-400"
                        )}>
                          {item.icon}
                        </div>
                        <span>{item.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="mobileActiveTab"
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl -z-10"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="pt-4 mt-4 border-t border-charcoal-100/50">
                  <div className="text-xs font-medium text-charcoal-500 mb-3 px-4">Tools</div>
                  <div className="space-y-1">
                    {toolsItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={toggleMobileMenu}
                        className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-charcoal-600 hover:glass hover:text-charcoal-900 transition-all duration-200 relative"
                      >
                        <div className="mr-3 text-charcoal-400">{item.icon}</div>
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              <div className="p-4 border-t border-charcoal-100/50">
                <div className="flex items-center space-x-3 p-3 rounded-xl glass">
                  <div className="h-10 w-10 bg-gradient-to-br from-charcoal-700 to-charcoal-900 text-white text-sm rounded-full flex items-center justify-center shadow-md">
                    {getInitials()}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-charcoal-900">
                      {user?.name || 'David Johnson'}
                    </div>
                    <div className="text-xs text-charcoal-500">
                      {user?.email || 'david@gmail.com'}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg hover:bg-red-50/50 transition-colors"
                  >
                    <LogOut className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <motion.header
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          className="h-16 glass-card border-b border-charcoal-200/50 flex items-center justify-between px-6 shadow-lg backdrop-blur-xl"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-xl hover:bg-charcoal-100/50 transition-colors"
            >
              <Menu className="h-5 w-5 text-charcoal-600" />
            </button>
            
            <nav className="flex items-center space-x-2 text-sm">
              <span className="text-charcoal-400 font-medium">omni-agent.studio</span>
              {breadcrumbs.length > 0 && (
                <>
                  <span className="text-charcoal-300">/</span>
                  <div className="flex items-center space-x-2">
                    {breadcrumbs.map((crumb, index) => (
                      <div key={crumb.href} className="flex items-center space-x-2">
                        {index > 0 && <span className="text-charcoal-300">/</span>}
                        <Link
                          to={crumb.href}
                          className={cn(
                            "transition-colors hover:text-charcoal-900",
                            index === breadcrumbs.length - 1
                              ? "text-charcoal-900 font-medium"
                              : "text-charcoal-500 hover:text-charcoal-700"
                          )}
                        >
                          {crumb.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex -space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                JD
              </div>
              <div className="h-8 w-8 bg-gradient-to-br from-green-500 to-green-600 text-white text-xs rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                SM
              </div>
              <div className="h-8 w-8 bg-gradient-to-br from-purple-500 to-purple-600 text-white text-xs rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                AL
              </div>
              <div className="h-8 w-8 border-2 border-white rounded-full bg-charcoal-100 flex items-center justify-center shadow-sm">
                <span className="text-xs font-medium text-charcoal-600">+4</span>
              </div>
            </div>

            <button
              className="h-8 w-8 flex items-center justify-center rounded-xl hover:glass transition-all duration-200 group"
              title="Voice Interface"
            >
              <Mic className="h-4 w-4 text-charcoal-600 group-hover:text-charcoal-900" />
            </button>

            <Link
              to="/dashboard/settings"
              className="h-8 w-8 flex items-center justify-center rounded-xl hover:glass transition-all duration-200 group"
              title="Settings"
            >
              <Settings className="h-4 w-4 text-charcoal-600 group-hover:text-charcoal-900" />
            </Link>

            <button
              className="h-8 w-8 flex items-center justify-center rounded-xl hover:glass transition-all duration-200 relative group"
              title="Notifications"
            >
              <Bell className="h-4 w-4 text-charcoal-600 group-hover:text-charcoal-900" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full shadow-sm"></span>
            </button>

            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 h-8 px-4 text-sm font-medium rounded-xl flex items-center transition-all duration-200 shadow-md hover:shadow-lg">
              <Plus className="h-4 w-4 mr-1" />
              Create Agent
            </button>
          </div>
        </motion.header>

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-charcoal-50/50 to-charcoal-100/50">
          <div className="max-w-7xl mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}