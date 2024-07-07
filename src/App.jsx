import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from './components/Header';
import Current from './components/Current';
import Today from './components/Today';
import Weekly from './components/Weekly';

function App() {
  const [units, setUnits] = useState('imperial');
  let { city } = useParams();
  if (!city) city = 'NewYork';

  // turn city from camelCase to Title Case
  city = city.replace(/([A-Z])/g, ' $1').trim().split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');

  return <>
    <Header units={units} setUnits={setUnits}/>
    <br />
    <div className="content">
      <Current city={city} units={units}/>
    </div>
    <br />
    <div className="content">
      <Today city={city} units={units}/>
    </div>
  </>
}

export default App;
