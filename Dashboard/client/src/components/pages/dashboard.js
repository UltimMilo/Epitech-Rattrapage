import { useState } from 'react';
import { Container } from '@material-ui/core';

import ConverterDispatch from '../services/Converter/dispatch'
import WeatherDispatch from '../services/weather/dispatch';
import NewsDispatch from '../services/News/dispatch';

const widgets = [
  {'service': 'converter', 'widget': 'converter', 'parameters': {}},
  {'service': 'weather', 'widget': 'day', 'parameters': {'city': 'Paris', 'country': 'France'}},
  {'service': 'news', 'widget': 'news', 'parameters': {}},
  {'service': 'news', 'widget': 'date', 'parameters': {}},
  {'service': 'news', 'widget': 'topic', 'parameters': {}},
];

const serviceDispatch = {
    'converter': ConverterDispatch,
    'weather': WeatherDispatch,
    'news': NewsDispatch,
}

function Dashboard(props) {
  const [userWidgets, setUserWidget] = useState(widgets);

  return (
    <Container component='main'>
      {userWidgets.map((item) => {
        return serviceDispatch[item.service](item.widget, item.parameters);
      })}
    </Container>
  );
}

export default Dashboard;