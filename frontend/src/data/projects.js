export const projectsContent = {
  hero: {
    title: 'Our Projects',
    subtitle:
      'Explore our work and open live demo portals in a new browser tab — view-only demonstrations of our hosted database systems.',
  },
  featuredIds: ['waste-portal-ministry', 'anz-logistics', 'solomon-star-cloud'],
  items: [
    {
      id: 'waste-portal-ministry',
      title: 'Waste Management Database Portal',
      client: 'Ministry of Environment, Climate Change, Disaster Management & Meteorology',
      category: 'Software Development',
      year: 'June 2026',
      summary:
        'Custom database portal for national waste management tracking, reporting, and operational workflows.',
      image: '/images/gallery-dev.jpg',
      featured: true,
      links: [
        { label: 'Open live demo', href: 'https://wastedb.srllogisticsandholdings.com', external: true },
        { label: 'View hosted solution', href: '/services/hosted/waste-management', external: false },
        { label: 'Database development service', href: '/services/software/database-development', external: false },
        { label: 'Request full project access', href: '/contact?project=waste-management-portal', external: false },
      ],
    },
    {
      id: 'anz-logistics',
      title: 'Transportation Logistics',
      client: 'ANZ Solomon Islands',
      category: 'Transportation Logistics',
      year: '2019–Present',
      summary:
        'End-to-end transport logistics support — fleet coordination, delivery operations, and ongoing supply chain assistance.',
      image: '/images/gallery-fleet.jpg',
      featured: true,
      links: [
        { label: 'Open live demo', href: 'https://fleetdb.srllogisticsandholdings.com', external: true },
        { label: 'Logistics services', href: '/services/logistics', external: false },
        { label: 'Fleet management system', href: '/services/hosted/fleet-management', external: false },
      ],
    },
    {
      id: 'solomon-star-cloud',
      title: 'Cloud Server Migration & Hosting',
      client: 'For the Current Company Infrastructure through Cloud',
      category: 'Cloud Hosting',
      year: 'June 2026',
      summary:
        'Full infrastructure migration to secure cloud hosting with monitoring, backups, and zero-downtime cutover.',
      image: '/images/gallery-server.jpg',
      featured: true,
      links: [
        { label: 'Cloud hosting services', href: '/services/cloud-hosting', external: false },
        { label: 'Get a hosting quote', href: '/contact?project=cloud-migration', external: false },
      ],
    },
    {
      id: 'starlink-provincial',
      title: 'Remote Site Starlink Deployment',
      client: 'Provincial Operations Client',
      category: 'Starlink & Connectivity',
      year: '2024–Current',
      summary:
        'Starlink installation and network setup for remote locations with structured cabling and WiFi access.',
      image: '/images/gallery-delivery.jpg',
      featured: false,
      links: [
        { label: 'Starlink deployments', href: '/services/starlink-deployments', external: false },
        { label: 'WiFi management system', href: '/services/hosted/wifi-management', external: false },
      ],
    },
    {
      id: 'office-network-cctv',
      title: 'Office Network & CCTV Security',
      client: 'Commercial Client — Honiara',
      category: 'IT & Network',
      year: '2023',
      summary:
        'Structured cabling, network design, firewall security, and CCTV installation for a multi-office site.',
      image: '/images/gallery-office.jpg',
      featured: false,
      links: [
        { label: 'CCTV installations', href: '/services/cctv-installations', external: false },
        { label: 'Network design & security', href: '/services/network-design-security', external: false },
      ],
    },
    {
      id: 'student-management-demo',
      title: 'Student Management Platform',
      client: 'Education Sector — Sample Deployment',
      category: 'Hosted Systems',
      year: '2024',
      summary:
        'Hosted student records, enrollment, and reporting platform ready for schools and training institutions.',
      image: '/images/gallery-dev.jpg',
      featured: false,
      links: [
        { label: 'Open live demo', href: 'https://studentdb.srllogisticsandholdings.com', external: true },
        { label: 'View hosted solution', href: '/services/hosted/student-management', external: false },
        { label: 'Software development', href: '/services/software-development', external: false },
      ],
    },
  ],
}
