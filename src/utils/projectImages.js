export const PROJECT_IMAGES = {
  'worksphere': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
  'pschool': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
  'sales-tracking-system': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
  'lara-classified': 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop',
  'job-portal-application': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop',
  'phonebook-directory': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
  'contactless-switch': 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
  'dynamic-user-registration': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
  'javascript-quiz-app': 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=1200&auto=format&fit=crop'
};

export const getProjectImage = (project) => {
  const slug = project?.slug?.toLowerCase() || '';
  if (PROJECT_IMAGES[slug]) return PROJECT_IMAGES[slug];

  const title = (project?.title || '').toLowerCase();
  if (title.includes('worksphere') || title.includes('workspace')) return PROJECT_IMAGES['worksphere'];
  if (title.includes('pschool') || title.includes('school') || title.includes('institute')) return PROJECT_IMAGES['pschool'];
  if (title.includes('sales')) return PROJECT_IMAGES['sales-tracking-system'];
  if (title.includes('e-commerce') || title.includes('classified') || title.includes('lara')) return PROJECT_IMAGES['lara-classified'];
  if (title.includes('job')) return PROJECT_IMAGES['job-portal-application'];
  if (title.includes('phone') || title.includes('contactbook') || title.includes('phonebook')) return PROJECT_IMAGES['phonebook-directory'];
  if (title.includes('iot') || title.includes('switch') || title.includes('contactless')) return PROJECT_IMAGES['contactless-switch'];
  if (title.includes('registration') || title.includes('form')) return PROJECT_IMAGES['dynamic-user-registration'];
  if (title.includes('quiz')) return PROJECT_IMAGES['javascript-quiz-app'];

  if (project?.imageUrl && project.imageUrl.startsWith('http')) {
    return project.imageUrl;
  }

  return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop';
};
