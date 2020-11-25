import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

const Sessioncards = () => {
  const cardinfo = [
    {text:'session 1',path:'/studentsession/111'},
    {text:'session 2',path:'/studentsession/222'},
    {text:'session 3',path:'/studentsession/333'},
    {text:'session 4',path:'/studentsession/444'},
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

export default Sessioncards;
