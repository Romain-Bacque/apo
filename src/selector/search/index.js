import { useSelector } from 'react-redux';
const paris = 'paris'
const data = [
  {
    id: 1,
    title: 'brasserie lulu',
    address: '11 rue dore, 78370 plaisir'
  },
  {
    id: 2,
    title: 'brasserie toto',
    address: '12 rue mary, 75009 paris'
  },
  {
    id: 3,
    title: 'brasserie lala',
    address: '11 rue dore, 78320 paris'
  }
]

const FindBrewery = data.map(brewery => {
  if(brewery.address.slice(13, 19).includes('75') || brewery.title.includes('tata')){
    return brewery
  }
  return brewery
})
  
  console.log(data)
 

 
