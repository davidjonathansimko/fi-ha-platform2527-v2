// Admin configuration
export const ADMIN_CONFIG = {
  // Add your email address here to make it an admin account
  adminEmails: [
    'davidsimko22@yahoo.com', // Admin email - full system access
  ],
  
  // Admin permissions
  permissions: {
    canViewAllUsers: true,
    canManageUsers: true,
    canAccessAnalytics: true,
    canModifySettings: true,
  }
}

export function isAdmin(email: string): boolean {
  return ADMIN_CONFIG.adminEmails.includes(email.toLowerCase())
}

export function hasAdminPermission(email: string, permission: keyof typeof ADMIN_CONFIG.permissions): boolean {
  return isAdmin(email) && ADMIN_CONFIG.permissions[permission]
}
