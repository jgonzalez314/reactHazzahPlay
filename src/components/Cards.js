import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

const Cards = () => {
  const cardinfo = [
    {text:'session 1',path:'/'},
    {text:'session 2',path:'/session/222'},
    {text:'session 3',path:'/session/333'},
    {text:'session 4',path:'/session/444'},
  ];

  const renderCard = (card,index) =>{
    return(
      <CardItem
              text={card.text}
              path={card.path}
              key ={index}/>
    );
  }
  const show = () =>{

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
