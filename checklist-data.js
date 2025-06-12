const checklistData = [
  {
    id: 'technical-performance',
    title: 'Technical Performance & Infrastructure',
    icon: 'settings',
    color: 'blue',
    description: 'Core technical requirements and performance optimization',
    items: [
      {
        id: 'pagespeed-score',
        title: 'PageSpeed Score ≥ 70+ (Desktop & Mobile via PageSpeed Insights)',
        category: 'Site Speed & Core Web Vitals',
        priority: 'high',
        hint: 'Use Google PageSpeed Insights to test your store performance',
        links: [
          {
            text: 'Google PageSpeed Insights',
            url: 'https://pagespeed.web.dev/',
            type: 'tool'
          },
          {
            text: 'Shopify Core Web Vitals Optimization',
            url: 'https://www.2hatslogic.com/blog/shopify/shopify-core-web-vitals-optimization/',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'lcp-optimization',
        title: 'LCP (Largest Contentful Paint) < 2.5s',
        category: 'Site Speed & Core Web Vitals',
        priority: 'high',
        hint: 'Optimize hero images and prioritize above-the-fold content loading',
        links: [
          {
            text: 'How to Improve Core Web Vitals - Shopify',
            url: 'https://www.shopify.com/blog/how-to-improve-core-web-vitals',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'inp-optimization',
        title: 'INP (Interaction to Next Paint) < 200ms',
        category: 'Site Speed & Core Web Vitals',
        priority: 'high',
        hint: 'Minimize JavaScript blocking and optimize button responsiveness',
        links: [
          {
            text: 'Core Web Vitals Technical Guide',
            url: 'https://www.devisedlabs.com/blog/core-web-vitals-shopify',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'cls-optimization',
        title: 'CLS (Cumulative Layout Shift) < 0.1',
        category: 'Site Speed & Core Web Vitals',
        priority: 'high',
        hint: 'Set dimensions for images and avoid dynamic content insertion',
        links: [
          {
            text: 'Shopify Speed Optimization Guide',
            url: 'https://uxify.com/blog/post/how-to-speed-up-shopify-website',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'image-optimization',
        title: 'Image optimization verified (JPEG for photos, PNG for graphics)',
        category: 'Site Speed & Core Web Vitals',
        priority: 'medium',
        hint: 'Use WebP format when possible and compress images under 100KB',
        links: [
          {
            text: 'Shopify Simple Image Resizer',
            url: 'https://www.shopify.com/tools/image-resizer',
            type: 'tool'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'file-compression',
        title: 'File compression and lazy loading implemented',
        category: 'Site Speed & Core Web Vitals',
        priority: 'medium',
        hint: 'Enable Shopify built-in lazy loading and use compression apps',
        links: [
          {
            text: 'TinyIMG Image Optimizer',
            url: 'https://apps.shopify.com/tiny-img',
            type: 'app'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'cdn-performance',
        title: 'CDN performance validated',
        category: 'Site Speed & Core Web Vitals',
        priority: 'medium',
        hint: 'Shopify automatically uses CDN, verify images are served from CDN',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'custom-domain',
        title: 'Custom domain properly connected and configured',
        category: 'Domain & SSL Configuration',
        priority: 'high',
        hint: 'Point A record to 23.227.38.65 and CNAME to shops.myshopify.com',
        links: [
          {
            text: 'Shopify Domain Connection',
            url: 'https://help.shopify.com/en/manual/domains/managing-domains/connecting-domains',
            type: 'guide'
          },
          {
            text: 'Complete Domain Setup Guide',
            url: 'https://www.mageplaza.com/insights/how-to-connect-domain-to-shopify.html',
            type: 'tutorial'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'ssl-certificate',
        title: 'SSL certificate active and valid (HTTPS enforced)',
        category: 'Domain & SSL Configuration',
        priority: 'high',
        hint: 'SSL activates automatically within 48 hours of domain connection',
        links: [
          {
            text: 'Shopify SSL Setup',
            url: 'https://help.shopify.com/en/manual/domains/managing-domains/secure-connections',
            type: 'guide'
          },
          {
            text: 'SSL Certificate Issues',
            url: 'https://help.shopify.com/en/manual/domains/troubleshoot-issues-with-domains',
            type: 'troubleshooting'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'www-preference',
        title: 'WWW vs non-WWW preference set consistently',
        category: 'Domain & SSL Configuration',
        priority: 'medium',
        hint: 'Choose one version and set up proper redirects for the other',
        links: [
          {
            text: 'Domain Redirects Setup',
            url: 'https://shopthemedetector.com/blog/how-to-add-ssl-to-shopify/',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'domain-redirects',
        title: 'Domain redirects working correctly (301 redirects)',
        category: 'Domain & SSL Configuration',
        priority: 'medium',
        hint: 'Test both www and non-www versions redirect properly',
        links: [
          {
            text: 'Redirect Checker',
            url: 'https://httpstatus.io/',
            type: 'tool'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'mixed-content',
        title: 'No mixed content warnings',
        category: 'Domain & SSL Configuration',
        priority: 'medium',
        hint: 'Ensure all resources (images, scripts) use HTTPS',
        links: [
          {
            text: 'SSL Security Best Practices',
            url: 'https://keepshoppers.com/blog/how-to-get-and-fix-ssl-certificates-https-on-shopify',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'xml-sitemap',
        title: 'XML sitemap generated and submitted to Google Search Console',
        category: 'Technical SEO Foundation',
        priority: 'high',
        hint: 'Sitemap automatically generated at yourstore.com/sitemap.xml',
        links: [
          {
            text: 'Google Search Console Setup',
            url: 'https://search.google.com/search-console/',
            type: 'setup'
          },
          {
            text: 'Shopify SEO Technical Audit',
            url: 'https://www.shopify.com/blog/technical-seo-audit',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'robots-txt',
        title: 'Robots.txt file configured properly',
        category: 'Technical SEO Foundation',
        priority: 'medium',
        hint: 'Located at yourstore.com/robots.txt, usually auto-configured',
        links: [
          {
            text: 'Robots.txt Best Practices',
            url: 'https://www.promodo.com/blog/shopify-seo-audit-checklist',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'structured-data',
        title: 'Structured data markup implemented (JSON-LD)',
        category: 'Technical SEO Foundation',
        priority: 'high',
        hint: 'Add Product, Organization, and BreadcrumbList schema',
        links: [
          {
            text: 'Shopify Schema Implementation',
            url: 'https://www.charle.co.uk/articles/add-schema-product-data-seo/',
            type: 'guide'
          },
          {
            text: 'Complete Structured Data Guide',
            url: 'https://gofishdigital.com/blog/shopify-structured-data-guide/',
            type: 'tutorial'
          },
          {
            text: 'Schema Generator App',
            url: 'https://apps.shopify.com/json-ld-for-seo',
            type: 'tool'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'meta-tags',
        title: 'Meta tags optimized (title, description, keywords)',
        category: 'Technical SEO Foundation',
        priority: 'high',
        hint: 'Keep titles under 60 characters, descriptions under 160',
        links: [
          {
            text: 'Meta Tags SEO Guide',
            url: 'https://www.shopify.com/blog/meta-tags-seo',
            type: 'guide'
          },
          {
            text: 'SEO Meta Tags Setup',
            url: 'https://shopify.dev/docs/storefronts/themes/seo/metadata',
            type: 'template'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'alt-text',
        title: 'Alt text added to all images',
        category: 'Technical SEO Foundation',
        priority: 'medium',
        hint: 'Describe images for accessibility and SEO',
        links: [
          {
            text: 'Smart SEO Alt Text Generator',
            url: 'https://apps.shopify.com/smart-seo',
            type: 'app'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'header-structure',
        title: 'Header structure (H1, H2, H3) logically implemented',
        category: 'Technical SEO Foundation',
        priority: 'medium',
        hint: 'One H1 per page, use H2-H6 hierarchically',
        links: [
          {
            text: 'SEO Content Structure',
            url: 'https://sitebulb.com/resources/guides/beginner-s-guide-to-shopify-seo-auditing/',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'internal-linking',
        title: 'Internal linking structure optimized',
        category: 'Technical SEO Foundation',
        priority: 'medium',
        hint: 'Link related products, categories, and content pages',
        links: [
          {
            text: 'Internal Linking Strategy',
            url: 'https://www.promodo.com/blog/shopify-seo-audit-checklist',
            type: 'best-practices'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'url-structure',
        title: 'URL structure clean and SEO-friendly',
        category: 'Technical SEO Foundation',
        priority: 'medium',
        hint: 'Use descriptive, short URLs without special characters',
        links: [
          {
            text: 'URL Optimization',
            url: 'https://clickysoft.com/shopify-seo-audit-guide/',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      }
    ]
  },
  {
    id: 'functionality-testing',
    title: 'Functionality Testing',
    icon: 'play-circle',
    color: 'green',
    description: 'Complete testing of all store functionality',
    items: [
      {
        id: 'homepage-loading',
        title: 'Homepage loads correctly with all hero sections, banners',
        category: 'Homepage & Navigation',
        priority: 'high',
        hint: 'Test loading speed and visual elements display',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'main-navigation',
        title: 'Main navigation menu functions across all devices',
        category: 'Homepage & Navigation',
        priority: 'high',
        hint: 'Test dropdown menus, mobile hamburger menu',
        links: [
          {
            text: 'Mobile Navigation Testing',
            url: 'https://ecomposer.io/blogs/shopify-knowledge/make-shopify-store-mobile-friendly',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'search-functionality',
        title: 'Search functionality works with relevant results',
        category: 'Homepage & Navigation',
        priority: 'high',
        hint: 'Test search autocomplete and filtering',
        links: [
          {
            text: 'Search Configuration',
            url: 'https://help.shopify.com/en/manual/online-store/search-and-discovery',
            type: 'setup'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'featured-collections',
        title: 'Featured collections display properly',
        category: 'Homepage & Navigation',
        priority: 'medium',
        hint: 'Verify products load and links work correctly',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'promotional-banners',
        title: 'Promotional banners and CTAs functional',
        category: 'Homepage & Navigation',
        priority: 'medium',
        hint: 'Test all call-to-action buttons and promotional links',
        links: [
          {
            text: 'CRO Testing Guide',
            url: 'https://cro.media/shopify-development/qa-checklist/',
            type: 'tool'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'footer-links',
        title: 'Footer links and contact information accurate',
        category: 'Homepage & Navigation',
        priority: 'medium',
        hint: 'Verify all footer links work and information is current',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'product-filtering',
        title: 'Product filtering and sorting functions correctly',
        category: 'Product Pages & Collections',
        priority: 'high',
        hint: 'Test all filter options (price, color, size, etc.)',
        links: [
          {
            text: 'Product Collection Setup',
            url: 'https://help.shopify.com/en/manual/products/collections',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'product-variants',
        title: 'Product variants (size, color, etc.) work seamlessly',
        category: 'Product Pages & Collections',
        priority: 'high',
        hint: 'Test variant switching updates price, images, inventory',
        links: [
          {
            text: 'Variant Testing Guide',
            url: 'https://www.klizer.com/blog/shopify-testing/',
            type: 'testing'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'inventory-levels',
        title: 'Inventory levels display accurately',
        category: 'Product Pages & Collections',
        priority: 'high',
        hint: 'Verify stock levels match backend inventory',
        links: [
          {
            text: 'Inventory Management',
            url: 'https://help.shopify.com/en/manual/products/inventory',
            type: 'setup'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'product-images',
        title: 'Product image galleries and zoom features functional',
        category: 'Product Pages & Collections',
        priority: 'medium',
        hint: 'Test image carousel, zoom functionality on mobile/desktop',
        links: [
          {
            text: 'Image Gallery Best Practices',
            url: 'https://ecomposer.io/blogs/shopify-knowledge/checklist-to-open-shopify-store',
            type: 'optimization'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'quick-view',
        title: 'Quick view features operational',
        category: 'Product Pages & Collections',
        priority: 'low',
        hint: 'Test product quick view modals and functionality',
        links: [
          {
            text: 'Quick View App Options',
            url: 'https://apps.shopify.com/search?q=quick+view',
            type: 'app'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'related-products',
        title: 'Related products and recommendations working',
        category: 'Product Pages & Collections',
        priority: 'medium',
        hint: 'Verify related product algorithms and manual selections',
        links: [
          {
            text: 'Product Recommendations',
            url: 'https://help.shopify.com/en/manual/online-store/themes/theme-structure/recommendation-section',
            type: 'setup'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'collection-pagination',
        title: 'Collection pagination functions properly',
        category: 'Product Pages & Collections',
        priority: 'medium',
        hint: 'Test "Load More" or page navigation',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'product-reviews',
        title: 'Product reviews and ratings system operational',
        category: 'Product Pages & Collections',
        priority: 'medium',
        hint: 'Test review submission and display',
        links: [
          {
            text: 'Product Reviews Apps',
            url: 'https://apps.shopify.com/search?q=product+reviews',
            type: 'app'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'add-to-cart',
        title: 'Add to cart functionality works across all products',
        category: 'Shopping Cart & Checkout',
        priority: 'high',
        hint: 'Test with different product types and variants',
        links: [
          {
            text: 'Cart Functionality Testing',
            url: 'https://www.lambdatest.com/learning-hub/shopify-test-case-template',
            type: 'testing'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'cart-updates',
        title: 'Cart updates (quantity changes, removals) function correctly',
        category: 'Shopping Cart & Checkout',
        priority: 'high',
        hint: 'Test quantity updates, remove items, cart persistence',
        links: [
          {
            text: 'Cart Testing Checklist',
            url: 'https://cro.media/shopify-development/qa-checklist/',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'checkout-process',
        title: 'Checkout process flows smoothly (guest and account checkout)',
        category: 'Shopping Cart & Checkout',
        priority: 'high',
        hint: 'Test both guest checkout and account creation flows',
        links: [
          {
            text: 'Checkout Process Testing',
            url: 'https://ecomposer.io/blogs/shopify-knowledge/make-shopify-store-mobile-friendly',
            type: 'optimization'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'payment-gateway',
        title: 'Payment gateway integrations tested with test transactions',
        category: 'Shopping Cart & Checkout',
        priority: 'high',
        hint: 'Use Shopify test mode or Bogus Gateway for testing',
        links: [
          {
            text: 'Shopify Payment Testing',
            url: 'https://help.shopify.com/en/manual/payments/shopify-payments/testing-shopify-payments',
            type: 'guide'
          },
          {
            text: 'Complete Payment Testing',
            url: 'https://meetanshi.com/blog/test-shopify-payments/',
            type: 'tutorial'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'shipping-calculations',
        title: 'Shipping calculations accurate for different zones',
        category: 'Shopping Cart & Checkout',
        priority: 'high',
        hint: 'Test various shipping addresses and methods',
        links: [
          {
            text: 'Shipping Configuration',
            url: 'https://help.shopify.com/en/manual/shipping',
            type: 'setup'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'tax-calculations',
        title: 'Tax calculations correct for applicable regions',
        category: 'Shopping Cart & Checkout',
        priority: 'high',
        hint: 'Verify tax rates for different locations',
        links: [
          {
            text: 'Tax Settings',
            url: 'https://help.shopify.com/en/manual/taxes',
            type: 'configuration'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'discount-codes',
        title: 'Discount codes and promotional offers apply correctly',
        category: 'Shopping Cart & Checkout',
        priority: 'medium',
        hint: 'Test various discount types and combinations',
        links: [
          {
            text: 'Discount Codes',
            url: 'https://help.shopify.com/en/manual/discounts',
            type: 'setup'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'order-confirmation',
        title: 'Order confirmation emails triggered properly',
        category: 'Shopping Cart & Checkout',
        priority: 'high',
        hint: 'Test order confirmation, shipping, and delivery emails',
        links: [
          {
            text: 'Email Notifications',
            url: 'https://help.shopify.com/en/manual/sell-online/notifications',
            type: 'configuration'
          }
        ],
        completed: false,
        notes: ''
      }
    ]
  },
  {
    id: 'mobile-responsiveness',
    title: 'Mobile Responsiveness & Cross-Browser Testing',
    icon: 'smartphone',
    color: 'purple',
    description: 'Mobile optimization and browser compatibility',
    items: [
      {
        id: 'responsive-design',
        title: 'Responsive design verified across devices (iPhone, Android, tablets)',
        category: 'Mobile Optimization',
        priority: 'high',
        hint: 'Test on actual devices and browser dev tools',
        links: [
          {
            text: 'Mobile Testing Guide',
            url: 'https://ecomposer.io/blogs/shopify-knowledge/make-shopify-store-mobile-friendly',
            type: 'guide'
          },
          {
            text: 'BrowserStack Mobile Testing',
            url: 'https://www.browserstack.com/guide/how-to-test-payments-in-shopify',
            type: 'tool'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'touch-targets',
        title: 'Touch targets appropriately sized (≥44px)',
        category: 'Mobile Optimization',
        priority: 'high',
        hint: 'Ensure buttons and links are large enough for touch',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'mobile-navigation',
        title: 'Mobile navigation intuitive and accessible',
        category: 'Mobile Optimization',
        priority: 'high',
        hint: 'Test hamburger menu, search, and navigation flow',
        links: [
          {
            text: 'Mobile UX Guidelines',
            url: 'https://ecomposer.io/blogs/shopify-knowledge/make-shopify-store-mobile-friendly',
            type: 'best-practices'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'mobile-product-images',
        title: 'Product images scale properly on mobile',
        category: 'Mobile Optimization',
        priority: 'medium',
        hint: 'Test image galleries, zoom, and loading on mobile',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'mobile-checkout',
        title: 'Checkout process optimized for mobile users',
        category: 'Mobile Optimization',
        priority: 'high',
        hint: 'Test mobile payment methods (Apple Pay, Google Pay)',
        links: [
          {
            text: 'Mobile Checkout Optimization',
            url: 'https://ecomposer.io/blogs/shopify-knowledge/make-shopify-store-mobile-friendly',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'mobile-loading-speed',
        title: 'Loading speed acceptable on mobile networks',
        category: 'Mobile Optimization',
        priority: 'high',
        hint: 'Test on 3G/4G connections using dev tools',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'chrome-compatibility',
        title: 'Chrome (latest version) - full functionality verified',
        category: 'Cross-Browser Compatibility',
        priority: 'high',
        hint: 'Test all features in latest Chrome version',
        links: [
          {
            text: 'Browser Testing Tools',
            url: 'https://www.lambdatest.com/learning-hub/shopify-test-case-template',
            type: 'testing'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'safari-compatibility',
        title: 'Safari (iOS and macOS) - compatibility confirmed',
        category: 'Cross-Browser Compatibility',
        priority: 'high',
        hint: 'Pay special attention to iOS Safari differences',
        links: [
          {
            text: 'Cross-browser Testing',
            url: 'https://www.browserstack.com/',
            type: 'tool'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'firefox-compatibility',
        title: 'Firefox - all features operational',
        category: 'Cross-Browser Compatibility',
        priority: 'medium',
        hint: 'Test Firefox-specific rendering differences',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'edge-compatibility',
        title: 'Edge - cross-platform functionality tested',
        category: 'Cross-Browser Compatibility',
        priority: 'medium',
        hint: 'Test both desktop and mobile Edge browsers',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'javascript-compatibility',
        title: 'JavaScript functions work across all browsers',
        category: 'Cross-Browser Compatibility',
        priority: 'high',
        hint: 'Test interactive elements and AJAX functionality',
        links: [],
        completed: false,
        notes: ''
      }
    ]
  },
  {
    id: 'security-privacy',
    title: 'Security & Privacy Compliance',
    icon: 'shield',
    color: 'red',
    description: 'Security measures and privacy compliance',
    items: [
      {
        id: 'two-factor-auth',
        title: 'Two-factor authentication enabled for admin accounts',
        category: 'Security Measures',
        priority: 'high',
        hint: 'Enable 2FA for all admin users',
        links: [
          {
            text: 'Shopify 2FA Setup',
            url: 'https://help.shopify.com/en/manual/your-account/account-security/two-step-authentication',
            type: 'setup'
          },
          {
            text: 'Security Best Practices',
            url: 'https://checkoutlinks.com/blog/shopify-security-testing-guide-2024/',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'password-policy',
        title: 'Strong password policy enforced',
        category: 'Security Measures',
        priority: 'high',
        hint: 'Use complex passwords for all accounts',
        links: [
          {
            text: 'Password Manager Recommendations',
            url: 'https://1password.com/',
            type: 'tool'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'admin-permissions',
        title: 'Admin access permissions properly configured',
        category: 'Security Measures',
        priority: 'high',
        hint: 'Limit admin access based on roles and responsibilities',
        links: [
          {
            text: 'Staff Permissions',
            url: 'https://help.shopify.com/en/manual/your-account/staff-accounts',
            type: 'setup'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'pci-compliance',
        title: 'PCI DSS compliance verified for payment processing',
        category: 'Security Measures',
        priority: 'high',
        hint: 'Shopify handles PCI compliance automatically',
        links: [
          {
            text: 'PCI Compliance Guide',
            url: 'https://www.shopify.com/blog/what-is-pci-compliance',
            type: 'verification'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'ssl-configuration',
        title: 'SSL certificate properly configured',
        category: 'Security Measures',
        priority: 'high',
        hint: 'Verify HTTPS works across all pages',
        links: [
          {
            text: 'SSL Testing Tools',
            url: 'https://www.ssllabs.com/ssltest/',
            type: 'testing'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'security-scan',
        title: 'Security vulnerability scan completed',
        category: 'Security Measures',
        priority: 'medium',
        hint: 'Use security scanning tools to check for vulnerabilities',
        links: [
          {
            text: 'Security Scanning Apps',
            url: 'https://checkoutlinks.com/blog/shopify-security-testing-guide-2024/',
            type: 'tools'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'privacy-policy',
        title: 'Privacy Policy comprehensive and legally compliant',
        category: 'Privacy & Legal Compliance',
        priority: 'high',
        hint: 'Include data collection, usage, and retention policies',
        links: [
          {
            text: 'Shopify Privacy Policy Generator',
            url: 'https://www.shopify.com/tools/policy-generator/privacy-policy',
            type: 'generator'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'terms-of-service',
        title: 'Terms of Service updated and store-specific',
        category: 'Privacy & Legal Compliance',
        priority: 'high',
        hint: 'Customize terms for your specific business model',
        links: [
          {
            text: 'Terms of Service Generator',
            url: 'https://www.shopify.com/tools/policy-generator/terms-and-conditions',
            type: 'generator'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'return-policy',
        title: 'Return/Refund Policy clearly stated',
        category: 'Privacy & Legal Compliance',
        priority: 'high',
        hint: 'Include timeframes, conditions, and process details',
        links: [
          {
            text: 'Return Policy Examples',
            url: 'https://www.shopify.com/blog/return-policy',
            type: 'template'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'shipping-policy',
        title: 'Shipping Policy accurate and detailed',
        category: 'Privacy & Legal Compliance',
        priority: 'medium',
        hint: 'Include processing times, shipping methods, and costs',
        links: [
          {
            text: 'Shipping Policy Best Practices',
            url: 'https://help.shopify.com/en/manual/shipping/understanding-shipping',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'gdpr-compliance',
        title: 'GDPR compliance measures implemented (if applicable)',
        category: 'Privacy & Legal Compliance',
        priority: 'medium',
        hint: 'Include cookie consent and data processing notifications',
        links: [
          {
            text: 'GDPR Compliance Apps',
            url: 'https://apps.shopify.com/search?q=gdpr',
            type: 'app'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'cookie-consent',
        title: 'Cookie consent mechanism functional',
        category: 'Privacy & Legal Compliance',
        priority: 'medium',
        hint: 'Implement cookie banner and consent management',
        links: [
          {
            text: 'Cookie Consent Apps',
            url: 'https://apps.shopify.com/search?q=cookie+consent',
            type: 'app'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'age-verification',
        title: 'Age verification systems (if required)',
        category: 'Privacy & Legal Compliance',
        priority: 'low',
        hint: 'Implement for age-restricted products',
        links: [
          {
            text: 'Age Verification Apps',
            url: 'https://apps.shopify.com/search?q=age+verification',
            type: 'app'
          }
        ],
        completed: false,
        notes: ''
      }
    ]
  },
  {
    id: 'analytics-tracking',
    title: 'Analytics & Tracking Setup',
    icon: 'bar-chart',
    color: 'yellow',
    description: 'Analytics implementation and marketing tracking',
    items: [
      {
        id: 'google-analytics',
        title: 'Google Analytics 4 properly configured and tracking',
        category: 'Analytics Implementation',
        priority: 'high',
        hint: 'Set up GA4 with enhanced ecommerce tracking',
        links: [
          {
            text: 'Shopify GA4 Setup',
            url: 'https://help.shopify.com/en/manual/reports-and-analytics/google-analytics/google-analytics-setup',
            type: 'guide'
          },
          {
            text: 'Complete GA4 Implementation',
            url: 'https://www.analyticsmania.com/post/install-google-tag-manager-and-ga4-on-shopify/',
            type: 'tutorial'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'search-console',
        title: 'Google Search Console verified and monitoring',
        category: 'Analytics Implementation',
        priority: 'high',
        hint: 'Submit sitemap and monitor for crawl errors',
        links: [
          {
            text: 'Search Console Setup',
            url: 'https://search.google.com/search-console/',
            type: 'setup'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'google-tag-manager',
        title: 'Google Tag Manager implemented (if applicable)',
        category: 'Analytics Implementation',
        priority: 'medium',
        hint: 'Use GTM for advanced tracking and pixels',
        links: [
          {
            text: 'GTM Shopify Setup',
            url: 'https://help.shopify.com/en/manual/promoting-marketing/pixels/custom-pixels/gtm-tutorial',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'ecommerce-tracking',
        title: 'E-commerce tracking events configured',
        category: 'Analytics Implementation',
        priority: 'high',
        hint: 'Track purchase, add to cart, view product events',
        links: [
          {
            text: 'GA4 Ecommerce Events',
            url: 'https://analyzify.com/hub/shopify-pixels',
            type: 'events'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'conversion-goals',
        title: 'Conversion goals and funnels set up',
        category: 'Analytics Implementation',
        priority: 'medium',
        hint: 'Set up goals for purchases, signups, and engagement',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'site-search-tracking',
        title: 'Site search tracking enabled',
        category: 'Analytics Implementation',
        priority: 'medium',
        hint: 'Track internal search queries and results',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'facebook-pixel',
        title: 'Facebook/Meta Pixel installed and firing correctly',
        category: 'Marketing Pixels & Integrations',
        priority: 'high',
        hint: 'Use Facebook Pixel Helper to verify installation',
        links: [
          {
            text: 'Shopify Meta Pixel Setup',
            url: 'https://help.shopify.com/en/manual/promoting-marketing/analyze-marketing/meta-pixel',
            type: 'guide'
          },
          {
            text: 'Meta Pixel Testing',
            url: 'https://www.shopify.com/blog/72787269-relax-advertising-on-facebook-just-got-a-lot-easier',
            type: 'testing'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'google-ads-tracking',
        title: 'Google Ads conversion tracking configured',
        category: 'Marketing Pixels & Integrations',
        priority: 'medium',
        hint: 'Set up conversion tracking for ad campaigns',
        links: [
          {
            text: 'Google Ads Tracking',
            url: 'https://support.google.com/google-ads/answer/1722022',
            type: 'setup'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'email-marketing-integration',
        title: 'Email marketing platform integrated (Klaviyo, Mailchimp, etc.)',
        category: 'Marketing Pixels & Integrations',
        priority: 'medium',
        hint: 'Sync customer data and purchase behavior',
        links: [
          {
            text: 'Email Marketing Apps',
            url: 'https://apps.shopify.com/search?q=email+marketing',
            type: 'apps'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'customer-data-sync',
        title: 'Customer data syncing properly',
        category: 'Marketing Pixels & Integrations',
        priority: 'medium',
        hint: 'Verify customer profiles and segments update correctly',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'abandoned-cart-recovery',
        title: 'Abandoned cart recovery systems operational',
        category: 'Marketing Pixels & Integrations',
        priority: 'high',
        hint: 'Test abandoned cart email triggers and content',
        links: [
          {
            text: 'Shopify Abandoned Cart Setup',
            url: 'https://help.shopify.com/en/manual/promoting-marketing/create-marketing/migrate-abandoned-checkout',
            type: 'guide'
          },
          {
            text: 'Abandoned Cart Automation',
            url: 'https://www.retainful.com/blog/how-to-set-up-abandoned-cart-email-campaign-in-shopify',
            type: 'tutorial'
          }
        ],
        completed: false,
        notes: ''
      }
    ]
  },
  {
    id: 'content-quality',
    title: 'Content Quality & Brand Consistency',
    icon: 'edit',
    color: 'indigo',
    description: 'Content audit and brand alignment',
    items: [
      {
        id: 'product-descriptions',
        title: 'Product descriptions engaging, keyword-optimized, and unique',
        category: 'Content Audit',
        priority: 'high',
        hint: 'Write unique descriptions for each product with target keywords',
        links: [
          {
            text: 'SEO Content Apps',
            url: 'https://apps.shopify.com/smart-seo',
            type: 'tool'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'about-us-page',
        title: 'About Us page compelling and brand-aligned',
        category: 'Content Audit',
        priority: 'high',
        hint: 'Tell your brand story and build trust with customers',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'contact-information',
        title: 'Contact information accurate and easily accessible',
        category: 'Content Audit',
        priority: 'high',
        hint: 'Include multiple contact methods and response times',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'blog-section',
        title: 'Blog section functional (if applicable)',
        category: 'Content Audit',
        priority: 'medium',
        hint: 'Test blog post creation, categories, and SEO',
        links: [
          {
            text: 'Shopify Blog Setup',
            url: 'https://help.shopify.com/en/manual/online-store/blogs',
            type: 'setup'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'faq-section',
        title: 'FAQ section comprehensive and helpful',
        category: 'Content Audit',
        priority: 'medium',
        hint: 'Address common customer questions and concerns',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'placeholder-content',
        title: 'All placeholder content removed',
        category: 'Content Audit',
        priority: 'high',
        hint: 'Remove default theme text and images',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'brand-voice',
        title: 'Brand voice and messaging consistent throughout',
        category: 'Content Audit',
        priority: 'medium',
        hint: 'Maintain consistent tone across all content',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'product-photography',
        title: 'High-quality product images from multiple angles',
        category: 'Visual Elements',
        priority: 'high',
        hint: 'Include lifestyle and detail shots for each product',
        links: [
          {
            text: 'Product Photography Best Practices',
            url: 'https://www.shopify.com/blog/product-photography',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'lifestyle-photography',
        title: 'Lifestyle and contextual product photography included',
        category: 'Visual Elements',
        priority: 'medium',
        hint: 'Show products in use or styled settings',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'brand-logo',
        title: 'Brand logo properly placed and optimized',
        category: 'Visual Elements',
        priority: 'high',
        hint: 'Ensure logo is crisp on all devices and backgrounds',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'color-scheme',
        title: 'Color scheme consistent with brand guidelines',
        category: 'Visual Elements',
        priority: 'medium',
        hint: 'Use brand colors consistently across all elements',
        links: [
          {
            text: 'Color palette tools',
            url: 'https://coolors.co/',
            type: 'tool'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'typography',
        title: 'Typography readable and on-brand',
        category: 'Visual Elements',
        priority: 'medium',
        hint: 'Ensure fonts are legible on all devices',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'visual-hierarchy',
        title: 'Visual hierarchy clear and effective',
        category: 'Visual Elements',
        priority: 'medium',
        hint: 'Use size, color, and spacing to guide user attention',
        links: [],
        completed: false,
        notes: ''
      }
    ]
  },
  {
    id: 'email-automation',
    title: 'Email Automation & Customer Communication',
    icon: 'mail',
    color: 'teal',
    description: 'Email sequences and customer service setup',
    items: [
      {
        id: 'welcome-email-series',
        title: 'Welcome email series configured and testing',
        category: 'Automated Email Sequences',
        priority: 'medium',
        hint: 'Set up 3-5 email welcome sequence for new subscribers',
        links: [
          {
            text: 'Email Automation Apps',
            url: 'https://apps.shopify.com/search?q=email+automation',
            type: 'app'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'order-confirmation-emails',
        title: 'Order confirmation emails formatted properly',
        category: 'Automated Email Sequences',
        priority: 'high',
        hint: 'Include order details, shipping info, and next steps',
        links: [
          {
            text: 'Email Template Customization',
            url: 'https://help.shopify.com/en/manual/sell-online/notifications/email-template-customization',
            type: 'customization'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'shipping-notification-emails',
        title: 'Shipping notification emails functional',
        category: 'Automated Email Sequences',
        priority: 'high',
        hint: 'Include tracking information and delivery estimates',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'delivery-confirmation-emails',
        title: 'Delivery confirmation emails operational',
        category: 'Automated Email Sequences',
        priority: 'medium',
        hint: 'Confirm delivery and request reviews',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'abandoned-cart-emails',
        title: 'Abandoned cart recovery sequence active',
        category: 'Automated Email Sequences',
        priority: 'high',
        hint: 'Set up 3-email sequence with timing optimization',
        links: [
          {
            text: 'Abandoned Cart Email Setup',
            url: 'https://stewartgauld.com/abandoned-cart-in-shopify/',
            type: 'guide'
          },
          {
            text: 'Cart Recovery Strategies',
            url: 'https://pagefly.io/blogs/shopify/abandoned-cart-email',
            type: 'best-practices'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'review-request-emails',
        title: 'Customer review request emails scheduled',
        category: 'Automated Email Sequences',
        priority: 'medium',
        hint: 'Send review requests 1-2 weeks after delivery',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'live-chat-widget',
        title: 'Live chat widget installed and functional (if applicable)',
        category: 'Customer Service Setup',
        priority: 'low',
        hint: 'Test chat availability and response system',
        links: [
          {
            text: 'Live Chat Apps',
            url: 'https://apps.shopify.com/search?q=live+chat',
            type: 'apps'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'contact-forms',
        title: 'Contact forms working and routing properly',
        category: 'Customer Service Setup',
        priority: 'medium',
        hint: 'Test form submission and email delivery',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'auto-responders',
        title: 'Customer service email auto-responders configured',
        category: 'Customer Service Setup',
        priority: 'medium',
        hint: 'Set up auto-reply with response time expectations',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'help-documentation',
        title: 'Help documentation accessible and comprehensive',
        category: 'Customer Service Setup',
        priority: 'medium',
        hint: 'Create FAQ and help center for common issues',
        links: [
          {
            text: 'Help center apps',
            url: 'https://apps.shopify.com/search?q=help+center',
            type: 'platform'
          }
        ],
        completed: false,
        notes: ''
      }
    ]
  },
  {
    id: 'inventory-operations',
    title: 'Inventory & Operations Management',
    icon: 'package',
    color: 'orange',
    description: 'Inventory systems and order management',
    items: [
      {
        id: 'stock-levels',
        title: 'Stock levels accurately reflected across all products',
        category: 'Inventory Systems',
        priority: 'high',
        hint: 'Verify inventory counts match actual stock',
        links: [
          {
            text: 'Inventory Management Best Practices',
            url: 'https://help.shopify.com/en/manual/products/inventory',
            type: 'management'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'low-stock-warnings',
        title: 'Low stock warnings configured',
        category: 'Inventory Systems',
        priority: 'medium',
        hint: 'Set up alerts when inventory drops below threshold',
        links: [
          {
            text: 'Inventory Alert Apps',
            url: 'https://apps.shopify.com/search?q=inventory+alerts',
            type: 'apps'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'out-of-stock-handling',
        title: 'Out-of-stock product handling appropriate',
        category: 'Inventory Systems',
        priority: 'medium',
        hint: 'Configure out-of-stock messaging and alternatives',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'variant-inventory',
        title: 'Variant inventory tracking functional',
        category: 'Inventory Systems',
        priority: 'high',
        hint: 'Test inventory tracking for different product variants',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'supplier-integrations',
        title: 'Supplier integrations operational (if applicable)',
        category: 'Inventory Systems',
        priority: 'low',
        hint: 'Test automated inventory updates from suppliers',
        links: [
          {
            text: 'Supplier Integration Apps',
            url: 'https://apps.shopify.com/search?q=supplier+integration',
            type: 'apps'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'order-processing',
        title: 'Order processing workflow streamlined and efficient',
        category: 'Order Management',
        priority: 'high',
        hint: 'Test order routing and fulfillment process',
        links: [
          {
            text: 'Order Management Best Practices',
            url: 'https://help.shopify.com/en/manual/orders',
            type: 'optimization'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'shipping-integrations',
        title: 'Shipping integrations configured properly',
        category: 'Order Management',
        priority: 'high',
        hint: 'Test shipping label creation and tracking',
        links: [
          {
            text: 'Shipping Apps',
            url: 'https://apps.shopify.com/search?q=shipping',
            type: 'apps'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'return-refund-process',
        title: 'Return and refund processes clearly defined',
        category: 'Order Management',
        priority: 'high',
        hint: 'Document and test return authorization process',
        links: [
          {
            text: 'Return Management',
            url: 'https://help.shopify.com/en/manual/orders/refund-return-order',
            type: 'setup'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'customer-accounts',
        title: 'Customer account areas functional',
        category: 'Order Management',
        priority: 'medium',
        hint: 'Test account creation, login, and order history',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'order-tracking',
        title: 'Order history and tracking accessible',
        category: 'Order Management',
        priority: 'medium',
        hint: 'Verify customers can track orders and view history',
        links: [],
        completed: false,
        notes: ''
      }
    ]
  },
  {
    id: 'conversion-optimization',
    title: 'Conversion Rate Optimization',
    icon: 'target',
    color: 'pink',
    description: 'CRO elements and A/B testing preparation',
    items: [
      {
        id: 'trust-badges',
        title: 'Trust badges and security indicators prominently displayed',
        category: 'CRO Elements',
        priority: 'high',
        hint: 'Display SSL badges, payment security icons, and guarantees',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'customer-testimonials',
        title: 'Customer testimonials and reviews visible',
        category: 'CRO Elements',
        priority: 'high',
        hint: 'Feature reviews on product pages and homepage',
        links: [
          {
            text: 'Review Display Apps',
            url: 'https://apps.shopify.com/search?q=product+reviews',
            type: 'apps'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'urgency-scarcity',
        title: 'Urgency and scarcity elements appropriately used',
        category: 'CRO Elements',
        priority: 'medium',
        hint: 'Use inventory counters and limited-time offers',
        links: [
          {
            text: 'Urgency/Scarcity Apps',
            url: 'https://apps.shopify.com/search?q=urgency',
            type: 'apps'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'value-propositions',
        title: 'Clear value propositions communicated',
        category: 'CRO Elements',
        priority: 'high',
        hint: 'Highlight unique benefits and competitive advantages',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'cta-buttons',
        title: 'Call-to-action buttons optimized and prominent',
        category: 'CRO Elements',
        priority: 'high',
        hint: 'Use contrasting colors and action-oriented text',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'exit-intent-popups',
        title: 'Exit-intent popups configured (if applicable)',
        category: 'CRO Elements',
        priority: 'low',
        hint: 'Offer discount or capture email before visitors leave',
        links: [
          {
            text: 'Exit-Intent Apps',
            url: 'https://apps.shopify.com/search?q=exit+intent',
            type: 'apps'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'testing-framework',
        title: 'Testing framework ready for future optimization',
        category: 'A/B Testing Preparation',
        priority: 'low',
        hint: 'Set up testing tools for ongoing optimization',
        links: [
          {
            text: 'A/B Testing Apps',
            url: 'https://apps.shopify.com/search?q=ab+testing',
            type: 'tools'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'conversion-points',
        title: 'Key conversion points identified and tracked',
        category: 'A/B Testing Preparation',
        priority: 'medium',
        hint: 'Track add to cart, checkout initiation, and purchase',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'baseline-metrics',
        title: 'Baseline metrics established',
        category: 'A/B Testing Preparation',
        priority: 'medium',
        hint: 'Record current conversion rates and performance metrics',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'testing-tools',
        title: 'Testing tools integrated (if applicable)',
        category: 'A/B Testing Preparation',
        priority: 'low',
        hint: 'Install and configure A/B testing platforms',
        links: [],
        completed: false,
        notes: ''
      }
    ]
  },
  {
    id: 'final-verification',
    title: 'Final Verification & Handover',
    icon: 'check-circle',
    color: 'emerald',
    description: 'Pre-launch testing and client handover',
    items: [
      {
        id: 'user-journey-testing',
        title: 'Complete user journey testing from discovery to purchase',
        category: 'Pre-Launch Testing',
        priority: 'high',
        hint: 'Test the entire customer experience end-to-end',
        links: [
          {
            text: 'Complete Store Testing',
            url: 'https://www.klizer.com/blog/shopify-testing/',
            type: 'checklist'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'stress-testing',
        title: 'Stress testing with multiple simultaneous users',
        category: 'Pre-Launch Testing',
        priority: 'medium',
        hint: 'Test store performance under load',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'real-payment-testing',
        title: 'Payment processing with real test transactions',
        category: 'Pre-Launch Testing',
        priority: 'high',
        hint: 'Use small amounts with real cards (then refund)',
        links: [
          {
            text: 'Real Payment Testing',
            url: 'https://pagefly.io/blogs/shopify/shopify-test-orders',
            type: 'guide'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'error-handling',
        title: 'Error handling and 404 page functionality',
        category: 'Pre-Launch Testing',
        priority: 'medium',
        hint: 'Test custom 404 page and error messages',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'backup-systems',
        title: 'Site backup systems verified',
        category: 'Pre-Launch Testing',
        priority: 'medium',
        hint: 'Ensure regular backups are configured',
        links: [
          {
            text: 'Backup Apps',
            url: 'https://apps.shopify.com/search?q=backup',
            type: 'apps'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'admin-credentials',
        title: 'Admin access credentials securely transferred',
        category: 'Client Handover Package',
        priority: 'high',
        hint: 'Use secure password sharing methods',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'analytics-access',
        title: 'Analytics account access provided',
        category: 'Client Handover Package',
        priority: 'high',
        hint: 'Grant client access to Google Analytics and Search Console',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'training-documentation',
        title: 'Training documentation/videos prepared',
        category: 'Client Handover Package',
        priority: 'medium',
        hint: 'Create guides for common admin tasks',
        links: [
          {
            text: 'Shopify Help Center',
            url: 'https://help.shopify.com/',
            type: 'resources'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'support-contact',
        title: 'Support contact information provided',
        category: 'Client Handover Package',
        priority: 'high',
        hint: 'Provide clear escalation and support procedures',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'maintenance-recommendations',
        title: 'Maintenance recommendations documented',
        category: 'Client Handover Package',
        priority: 'medium',
        hint: 'Outline regular maintenance tasks and schedules',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'performance-baseline',
        title: 'Performance baseline report created',
        category: 'Client Handover Package',
        priority: 'medium',
        hint: 'Document initial performance metrics for comparison',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'local-payment-methods',
        title: 'Local payment methods integrated (if applicable)',
        category: 'Moroccan Market Considerations',
        priority: 'medium',
        hint: 'Include popular local payment options',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'multi-language-support',
        title: 'Multi-language support functional (Arabic/French/English)',
        category: 'Moroccan Market Considerations',
        priority: 'medium',
        hint: 'Test language switching and content translation',
        links: [
          {
            text: 'Translation Apps',
            url: 'https://apps.shopify.com/search?q=translation',
            type: 'apps'
          }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 'local-shipping-tax',
        title: 'Local shipping and tax configurations verified',
        category: 'Moroccan Market Considerations',
        priority: 'high',
        hint: 'Configure local shipping zones and tax rates',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'cultural-sensitivity',
        title: 'Cultural sensitivity in content and imagery reviewed',
        category: 'Moroccan Market Considerations',
        priority: 'medium',
        hint: 'Ensure content is appropriate for local market',
        links: [],
        completed: false,
        notes: ''
      },
      {
        id: 'regional-compliance',
        title: 'Regional compliance requirements met',
        category: 'Moroccan Market Considerations',
        priority: 'high',
        hint: 'Verify compliance with local e-commerce regulations',
        links: [],
        completed: false,
        notes: ''
      }
    ]
  }
];

// Performance benchmarks
const performanceBenchmarks = {
  pageLoadSpeed: '≤ 3 seconds',
  mobilePerformanceScore: '≥ 70',
  securityGrade: 'A+ rating',
  seoReadinessScore: '≥ 85%',
  conversionFunnelCompletion: '≥ 95%',
  uptime: '99.9%+'
};

// Priority colors
const priorityColors = {
  high: 'red',
  medium: 'yellow',
  low: 'green'
};

// Category colors
const categoryColors = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: 'text-blue-600'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: 'text-green-600'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-800',
    icon: 'text-purple-600'
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: 'text-red-600'
  },
  yellow: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: 'text-yellow-600'
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-800',
    icon: 'text-indigo-600'
  },
  teal: {
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-800',
    icon: 'text-teal-600'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-800',
    icon: 'text-orange-600'
  },
  pink: {
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    text: 'text-pink-800',
    icon: 'text-pink-600'
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
    icon: 'text-emerald-600'
  }
};