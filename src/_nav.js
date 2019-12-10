export default {
  items: [
    {
      name: 'Administrateur',
      url: '/dashboard',
      icon: 'icon-speedometer',
      admin: true
    },
    {
      title: true,
      name: 'Activitées'
    },
    {
      name: 'Activitées',
      url: '/activities',
      icon: 'icon-grid'
    },
    {
      name: 'Photos',
      url: '/pictures',
      icon: 'icon-camera'
    },
    {
      name: 'News',
      url: '/news',
      icon: 'icon-book-open'
    },
    {
      title: true,
      name: 'Jardinage'
    },
    {
      name: 'Jardins',
      url: '/garden',
      icon: 'icon-drop',
      children: []
    },
    {
      title: true,
      name: 'Base de connaissance'
    },
    {
      name: 'Fleurs',
      url: '/flowers',
      icon: 'icon-drop'
    }
  ]
};
