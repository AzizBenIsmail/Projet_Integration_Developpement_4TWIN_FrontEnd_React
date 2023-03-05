import i18next from 'i18next';
import DocumentationNavigation from '../main/documentation/DocumentationNavigation';


import authRoles from '../auth/authRoles';

const navigationConfig = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    subtitle: 'Unique dashboard designs',
    type: 'group',
    icon: 'heroicons-outline:home',
    translate: 'DASHBOARDS',
    children: [
      {
        id: 'dashboards.project',
        title: 'Project',
        type: 'item',
        icon: 'heroicons-outline:clipboard-check',
        url: '/dashboards/project',
      },
      {
        id: 'dashboards.analytics',
        title: 'Analytics',
        type: 'item',
        icon: 'heroicons-outline:chart-pie',
        url: '/dashboards/analytics',
      },
      {
        id: 'dashboards.finance',
        title: 'Finance',
        type: 'item',
        icon: 'heroicons-outline:cash',
        url: '/dashboards/finance',
      },
    ],
  },
  {
    id: 'pages',
    title: 'Pages',
    subtitle: 'Custom made page designs',
    type: 'group',
    icon: 'heroicons-outline:document',
    children: [
      {
        id: 'pages.activities',
        title: 'Activities',
        type: 'item',
        icon: 'heroicons-outline:menu-alt-2',
        url: '/pages/activities',
      },
      {
        id: 'pages.authentication',
        title: 'Authentication',
        type: 'collapse',
        icon: 'heroicons-outline:lock-closed',
        children: [
          {
            id: 'pages.authentication.sign-in',
            title: 'Sign in',
            type: 'collapse',
            children: [
              {
                id: 'pages.authentication.sign-in.classic',
                title: 'Classic',
                type: 'item',
                url: '/pages/authentication/sign-in/classic',
              },
              {
                id: 'pages.authentication.sign-in.modern',
                title: 'Modern',
                type: 'item',
                url: '/pages/authentication/sign-in/modern',
              },
              {
                id: 'pages.authentication.sign-in.modern-reversed',
                title: 'Modern Reversed',
                type: 'item',
                url: '/pages/authentication/sign-in/modern-reversed',
              },
              {
                id: 'pages.authentication.sign-in.split-screen',
                title: 'Split Screen',
                type: 'item',
                url: '/pages/authentication/sign-in/split-screen',
              },
              {
                id: 'pages.authentication.sign-in.split-screen-reversed',
                title: 'Split Screen Reversed',
                type: 'item',
                url: '/pages/authentication/sign-in/split-screen-reversed',
              },
              {
                id: 'pages.authentication.sign-in.full-screen',
                title: 'Full Screen',
                type: 'item',
                url: '/pages/authentication/sign-in/full-screen',
              },
              {
                id: 'pages.authentication.sign-in.full-screen-reversed',
                title: 'Full Screen Reversed',
                type: 'item',
                url: '/pages/authentication/sign-in/full-screen-reversed',
              },
            ],
          },
          {
            id: 'pages.authentication.sign-up',
            title: 'Sign up',
            type: 'collapse',
            children: [
              {
                id: 'pages.authentication.sign-up.classic',
                title: 'Classic',
                type: 'item',
                url: '/pages/authentication/sign-up/classic',
              },
              {
                id: 'pages.authentication.sign-up.modern',
                title: 'Modern',
                type: 'item',
                url: '/pages/authentication/sign-up/modern',
              },
              {
                id: 'pages.authentication.sign-up.modern-reversed',
                title: 'Modern Reversed',
                type: 'item',
                url: '/pages/authentication/sign-up/modern-reversed',
              },
              {
                id: 'pages.authentication.sign-up.split-screen',
                title: 'Split Screen',
                type: 'item',
                url: '/pages/authentication/sign-up/split-screen',
              },
              {
                id: 'pages.authentication.sign-up.split-screen-reversed',
                title: 'Split Screen Reversed',
                type: 'item',
                url: '/pages/authentication/sign-up/split-screen-reversed',
              },
              {
                id: 'pages.authentication.sign-up.full-screen',
                title: 'Full Screen',
                type: 'item',
                url: '/pages/authentication/sign-up/full-screen',
              },
              {
                id: 'pages.authentication.sign-up.full-screen-reversed',
                title: 'Full Screen Reversed',
                type: 'item',
                url: '/pages/authentication/sign-up/full-screen-reversed',
              },
            ],
          },
          {
            id: 'pages.authentication.sign-out',
            title: 'Sign out',
            type: 'collapse',
            children: [
              {
                id: 'pages.authentication.sign-out.classic',
                title: 'Classic',
                type: 'item',
                url: '/pages/authentication/sign-out/classic',
              },
              {
                id: 'pages.authentication.sign-out.modern',
                title: 'Modern',
                type: 'item',
                url: '/pages/authentication/sign-out/modern',
              },
              {
                id: 'pages.authentication.sign-out.modern-reversed',
                title: 'Modern Reversed',
                type: 'item',
                url: '/pages/authentication/sign-out/modern-reversed',
              },
              {
                id: 'pages.authentication.sign-out.split-screen',
                title: 'Split Screen',
                type: 'item',
                url: '/pages/authentication/sign-out/split-screen',
              },
              {
                id: 'pages.authentication.sign-out.split-screen-reversed',
                title: 'Split Screen Reversed',
                type: 'item',
                url: '/pages/authentication/sign-out/split-screen-reversed',
              },
              {
                id: 'pages.authentication.sign-out.full-screen',
                title: 'Full Screen',
                type: 'item',
                url: '/pages/authentication/sign-out/full-screen',
              },
              {
                id: 'pages.authentication.sign-out.full-screen-reversed',
                title: 'Full Screen Reversed',
                type: 'item',
                url: '/pages/authentication/sign-out/full-screen-reversed',
              },
            ],
          },
          {
            id: 'pages.authentication.forgot-password',
            title: 'Forgot password',
            type: 'collapse',
            children: [
              {
                id: 'pages.authentication.forgot-password.classic',
                title: 'Classic',
                type: 'item',
                url: '/pages/authentication/forgot-password/classic',
              },
              {
                id: 'pages.authentication.forgot-password.modern',
                title: 'Modern',
                type: 'item',
                url: '/pages/authentication/forgot-password/modern',
              },
              {
                id: 'pages.authentication.forgot-password.modern-reversed',
                title: 'Modern Reversed',
                type: 'item',
                url: '/pages/authentication/forgot-password/modern-reversed',
              },
              {
                id: 'pages.authentication.forgot-password.split-screen',
                title: 'Split Screen',
                type: 'item',
                url: '/pages/authentication/forgot-password/split-screen',
              },
              {
                id: 'pages.authentication.forgot-password.split-screen-reversed',
                title: 'Split Screen Reversed',
                type: 'item',
                url: '/pages/authentication/forgot-password/split-screen-reversed',
              },
              {
                id: 'pages.authentication.forgot-password.full-screen',
                title: 'Full Screen',
                type: 'item',
                url: '/pages/authentication/forgot-password/full-screen',
              },
              {
                id: 'pages.authentication.forgot-password.full-screen-reversed',
                title: 'Full Screen Reversed',
                type: 'item',
                url: '/pages/authentication/forgot-password/full-screen-reversed',
              },
            ],
          },
          {
            id: 'pages.authentication.reset-password',
            title: 'Reset password',
            type: 'collapse',
            children: [
              {
                id: 'pages.authentication.reset-password.classic',
                title: 'Classic',
                type: 'item',
                url: '/pages/authentication/reset-password/classic',
              },
              {
                id: 'pages.authentication.reset-password.modern',
                title: 'Modern',
                type: 'item',
                url: '/pages/authentication/reset-password/modern',
              },
              {
                id: 'pages.authentication.reset-password.modern-reversed',
                title: 'Modern Reversed',
                type: 'item',
                url: '/pages/authentication/reset-password/modern-reversed',
              },
              {
                id: 'pages.authentication.reset-password.split-screen',
                title: 'Split Screen',
                type: 'item',
                url: '/pages/authentication/reset-password/split-screen',
              },
              {
                id: 'pages.authentication.reset-password.split-screen-reversed',
                title: 'Split Screen Reversed',
                type: 'item',
                url: '/pages/authentication/reset-password/split-screen-reversed',
              },
              {
                id: 'pages.authentication.reset-password.full-screen',
                title: 'Full Screen',
                type: 'item',
                url: '/pages/authentication/reset-password/full-screen',
              },
              {
                id: 'pages.authentication.reset-password.full-screen-reversed',
                title: 'Full Screen Reversed',
                type: 'item',
                url: '/pages/authentication/reset-password/full-screen-reversed',
              },
            ],
          },
          {
            id: 'pages.authentication.unlock-session',
            title: 'Unlock session',
            type: 'collapse',
            children: [
              {
                id: 'pages.authentication.unlock-session.classic',
                title: 'Classic',
                type: 'item',
                url: '/pages/authentication/unlock-session/classic',
              },
              {
                id: 'pages.authentication.unlock-session.modern',
                title: 'Modern',
                type: 'item',
                url: '/pages/authentication/unlock-session/modern',
              },
              {
                id: 'pages.authentication.unlock-session.modern-reversed',
                title: 'Modern Reversed',
                type: 'item',
                url: '/pages/authentication/unlock-session/modern-reversed',
              },
              {
                id: 'pages.authentication.unlock-session.split-screen',
                title: 'Split Screen',
                type: 'item',
                url: '/pages/authentication/unlock-session/split-screen',
              },
              {
                id: 'pages.authentication.unlock-session.split-screen-reversed',
                title: 'Split Screen Reversed',
                type: 'item',
                url: '/pages/authentication/unlock-session/split-screen-reversed',
              },
              {
                id: 'pages.authentication.unlock-session.full-screen',
                title: 'Full Screen',
                type: 'item',
                url: '/pages/authentication/unlock-session/full-screen',
              },
              {
                id: 'pages.authentication.unlock-session.full-screen-reversed',
                title: 'Full Screen Reversed',
                type: 'item',
                url: '/pages/authentication/unlock-session/full-screen-reversed',
              },
            ],
          },
          {
            id: 'pages.authentication.confirmation-required',
            title: 'Confirmation required',
            type: 'collapse',
            children: [
              {
                id: 'pages.authentication.confirmation-required.classic',
                title: 'Classic',
                type: 'item',
                url: '/pages/authentication/confirmation-required/classic',
              },
              {
                id: 'pages.authentication.confirmation-required.modern',
                title: 'Modern',
                type: 'item',
                url: '/pages/authentication/confirmation-required/modern',
              },
              {
                id: 'pages.authentication.confirmation-required.modern-reversed',
                title: 'Modern Reversed',
                type: 'item',
                url: '/pages/authentication/confirmation-required/modern-reversed',
              },
              {
                id: 'pages.authentication.confirmation-required.split-screen',
                title: 'Split Screen',
                type: 'item',
                url: '/pages/authentication/confirmation-required/split-screen',
              },
              {
                id: 'pages.authentication.confirmation-required.split-screen-reversed',
                title: 'Split Screen Reversed',
                type: 'item',
                url: '/pages/authentication/confirmation-required/split-screen-reversed',
              },
              {
                id: 'pages.authentication.confirmation-required.full-screen',
                title: 'Full Screen',
                type: 'item',
                url: '/pages/authentication/confirmation-required/full-screen',
              },
              {
                id: 'pages.authentication.confirmation-required.full-screen-reversed',
                title: 'Full Screen Reversed',
                type: 'item',
                url: '/pages/authentication/confirmation-required/full-screen-reversed',
              },
            ],
          },
        ],
      },
      {
        id: 'pages.coming-soon',
        title: 'Coming Soon',
        type: 'collapse',
        icon: 'heroicons-outline:clock',
        url: '/pages/coming-soon',
        children: [
          {
            id: 'pages.coming-soon.classic',
            title: 'Classic',
            type: 'item',
            url: '/pages/coming-soon/classic',
          },
          {
            id: 'pages.coming-soon.modern',
            title: 'Modern',
            type: 'item',
            url: '/pages/coming-soon/modern',
          },
          {
            id: 'pages.coming-soon.modern-reversed',
            title: 'Modern Reversed',
            type: 'item',
            url: '/pages/coming-soon/modern-reversed',
          },
          {
            id: 'pages.coming-soon.split-screen',
            title: 'Split Screen',
            type: 'item',
            url: '/pages/coming-soon/split-screen',
          },
          {
            id: 'pages.coming-soon.split-screen-reversed',
            title: 'Split Screen Reversed',
            type: 'item',
            url: '/pages/coming-soon/split-screen-reversed',
          },
          {
            id: 'pages.coming-soon.full-screen',
            title: 'Full Screen',
            type: 'item',
            url: '/pages/coming-soon/full-screen',
          },
          {
            id: 'pages.coming-soon.full-screen-reversed',
            title: 'Full Screen Reversed',
            type: 'item',
            url: '/pages/coming-soon/full-screen-reversed',
          },
        ],
      },
      {
        id: 'pages.error',
        title: 'Error',
        type: 'collapse',
        icon: 'heroicons-outline:exclamation-circle',
        children: [
          {
            id: 'pages.error.404',
            title: '404',
            type: 'item',
            url: '/pages/error/404',
          },
          {
            id: 'pages.error.500',
            title: '500',
            type: 'item',
            url: '/pages/error/500',
          },
        ],
      },
      {
        id: 'pages.invoice',
        title: 'Invoice',
        type: 'collapse',
        icon: 'heroicons-outline:calculator',
        children: [
          {
            id: 'pages.invoice.printable',
            title: 'Printable',
            type: 'collapse',
            children: [
              {
                id: 'pages.invoice.printable.compact',
                title: 'Compact',
                type: 'item',
                url: '/pages/invoice/printable/compact',
              },
              {
                id: 'pages.invoice.printable.modern',
                title: 'Modern',
                type: 'item',
                url: '/pages/invoice/printable/modern',
              },
            ],
          },
        ],
      },
      {
        id: 'pages.maintenance',
        title: 'Maintenance',
        type: 'item',
        icon: 'heroicons-outline:exclamation',
        url: '/pages/maintenance',
      },
      {
        id: 'pages.pricing',
        title: 'Pricing',
        type: 'collapse',
        icon: 'heroicons-outline:cash',
        children: [
          {
            id: 'pages.pricing.modern',
            title: 'Modern',
            type: 'item',
            url: '/pages/pricing/modern',
          },
          {
            id: 'pages.pricing.simple',
            title: 'Simple',
            type: 'item',
            url: '/pages/pricing/simple',
          },
          {
            id: 'pages.pricing.single',
            title: 'Single',
            type: 'item',
            url: '/pages/pricing/single',
          },
          {
            id: 'pages.pricing.table',
            title: 'Table',
            type: 'item',
            url: '/pages/pricing/table',
          },
        ],
      },
      {
        id: 'pages.search',
        title: 'Search',
        type: 'collapse',
        icon: 'search',
        children: [
          {
            id: 'pages.search.classic-search',
            title: 'Classic Search',
            type: 'item',
            url: 'pages/search/classic',
          },
          {
            id: 'pages.search.modern-search',
            title: 'Modern Search',
            type: 'item',
            url: 'pages/search/modern',
          },
        ],
      },
    ],
  },
  {
    id: 'divider-1',
    type: 'divider',
  },
];

export default navigationConfig;
