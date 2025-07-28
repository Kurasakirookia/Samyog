import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * AdminSidebar Component
 * 
 * This is the navigation sidebar for admin dashboard.
 * Features:
 * - Hierarchical navigation menu
 * - Active route highlighting
 * - Collapsible menu sections
 * - Quick stats display
 * - Responsive design with mobile support
 * - Icon-based navigation
 */
const AdminSidebar = ({ isOpen }) => {
  // ============ STATE MANAGEMENT ============
  const [expandedSections, setExpandedSections] = useState({
    content: true,
    users: false,
    settings: false
  });

  // ============ HOOKS ============
  const location = useLocation();

  // ============ HELPER FUNCTIONS ============
  /**
   * Check if the current route is active
   */
  const isActiveRoute = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  /**
   * Toggle expanded state of menu sections
   */
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // ============ NAVIGATION DATA ============
  const navigationMenu = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/admin',
      icon: '📊',
      exact: true
    },
    {
      id: 'content',
      label: 'Content Management',
      icon: '📝',
      expandable: true,
      expanded: expandedSections.content,
      children: [
        {
          id: 'events',
          label: 'Events',
          path: '/admin/events',
          icon: '📅',
          description: 'Manage all events'
        },
        {
          id: 'teachers',
          label: 'Faculty',
          path: '/admin/teachers',
          icon: '👩‍🏫',
          description: 'Manage faculty profiles'
        }
      ]
    },
    {
      id: 'users',
      label: 'User Management',
      icon: '👥',
      expandable: true,
      expanded: expandedSections.users,
      children: [
        {
          id: 'all-users',
          label: 'All Users',
          path: '/admin/users',
          icon: '📋',
          description: 'View all registered users'
        },
        {
          id: 'admins',
          label: 'Administrators',
          path: '/admin/admins',
          icon: '⚡',
          description: 'Manage admin accounts'
        }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      path: '/admin/analytics',
      icon: '📈'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      expandable: true,
      expanded: expandedSections.settings,
      children: [
        {
          id: 'general',
          label: 'General',
          path: '/admin/settings/general',
          icon: '🔧',
          description: 'General site settings'
        },
        {
          id: 'appearance',
          label: 'Appearance',
          path: '/admin/settings/appearance',
          icon: '🎨',
          description: 'Customize site appearance'
        }
      ]
    }
  ];

  // ============ QUICK STATS DATA ============
  const quickStats = [
    { label: 'Total Events', value: '24', icon: '📅', color: 'bg-blue-500' },
    { label: 'Faculty Members', value: '45', icon: '👩‍🏫', color: 'bg-green-500' },
    { label: 'Active Users', value: '156', icon: '👥', color: 'bg-purple-500' }
  ];

  return (
    <aside className={`bg-gray-900 text-white transition-all duration-300 flex-shrink-0 ${
      isOpen ? 'w-64' : 'w-16'
    } overflow-hidden`}>
      <div className="flex flex-col h-full">
        
        {/* ============ SIDEBAR HEADER ============ */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              E
            </div>
            {isOpen && (
              <div>
                <h1 className="text-lg font-semibold">EduManage</h1>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        {/* ============ QUICK STATS (when expanded) ============ */}
        {isOpen && (
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Stats</h3>
            <div className="space-y-2">
              {quickStats.map((stat) => (
                <div key={stat.label} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center text-sm`}>
                    {stat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{stat.value}</p>
                    <p className="text-xs text-gray-400 truncate">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============ NAVIGATION MENU ============ */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {navigationMenu.map((item) => (
              <div key={item.id}>
                
                {/* Main Navigation Item */}
                {item.expandable ? (
                  // === EXPANDABLE MENU ITEM ===
                  <button
                    onClick={() => toggleSection(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      item.children?.some(child => isActiveRoute(child.path))
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{item.icon}</span>
                      {isOpen && <span className="font-medium">{item.label}</span>}
                    </div>
                    {isOpen && (
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          item.expanded ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                ) : (
                  // === REGULAR MENU ITEM ===
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      (item.exact ? location.pathname === item.path : isActiveRoute(item.path))
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {isOpen && <span className="font-medium">{item.label}</span>}
                  </Link>
                )}

                {/* Submenu Items */}
                {item.expandable && item.expanded && isOpen && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.children?.map((child) => (
                      <Link
                        key={child.id}
                        to={child.path}
                        className={`flex items-center space-x-3 p-2 rounded-lg transition-colors text-sm ${
                          isActiveRoute(child.path)
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                      >
                        <span>{child.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{child.label}</p>
                          {child.description && (
                            <p className="text-xs text-gray-500 truncate">{child.description}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* ============ SIDEBAR FOOTER ============ */}
        {isOpen && (
          <div className="p-4 border-t border-gray-800">
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium">System Status</span>
              </div>
              <p className="text-xs text-gray-400">All systems operational</p>
            </div>
          </div>
        )}

        {/* ============ COLLAPSE BUTTON ============ */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => {}} // This will be handled by parent component
            className="w-full flex items-center justify-center p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <svg
              className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;