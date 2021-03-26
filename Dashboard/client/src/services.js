import Converter from 'components/services/Converter/Converter';

import WeatherService from 'components/services/weather/Weather';

const services = [
  {
    id: 'converter',
    name: 'Converter',
    widgets: [
      {
        id: 'converter',
        name: 'Money converter',
        component: Converter,
      },
    ]
  },
  {
    id: 'weather',
    name: 'Weather',
    widgets: [
      {
        id: 'day',
        name: 'Weather',
        component: WeatherService,
      }
    ]
  },
  {
    id: 'news',
    name: 'News',
    widgets: [
      {
        id: 'country-news',
        name: 'Top news of selected country',
        component: 'Component',
      },
      {
        id: 'news-by-date',
        name: 'News by dates',
        component: 'Component',
      },
      {
        id: 'news-by-topic',
        name: 'Top news of selected topic',
        component: 'Component',
      }
    ]
  }
];

export default services;