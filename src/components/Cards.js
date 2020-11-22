import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

const Cards = () => {
  const cardinfo = [
    {text:'1',path:'dash/111'},
    {text:'2',path:'session/222'},
    {text:'3',path:'studentsession/333'},
    {text:'4',path:'4'},
  ];

  const renderCard = (card,index) =>{
    return(
      <CardItem
              text={card.text}
              path={card.path}
              key ={index}/>
    );
  }

  return (

    <div className='cards'>

      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {cardinfo.map(renderCard)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
