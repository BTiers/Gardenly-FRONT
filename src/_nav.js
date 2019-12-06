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
      icon: 'icon-camera'
    },
    {
      name: 'Photos',
      url: '/pictures',
      icon: 'icon-camera'
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