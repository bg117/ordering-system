"use client";

import MenuCard from "../../components/MenuCard";

export default function Menu() {
  return (
    <main className="container">
      <h1>Menu</h1>

      <div className="row d-flex justify-content-start">
        <div className="col-md-4">
          <MenuCard 
            name="Beef Salpicao" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
            image="/images/beefsalpicao.jpg" 
            price={80}
          />
        </div>
        <div className="col-md-4">
          <MenuCard 
            name="Chicken Adobo" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
            image="/images/chickenadobo.jpg" 
            price={80}
          />
        </div>
        <div className="col-md-4">
          <MenuCard 
            name="Sinigang" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
            image="/images/sinigang.jpg" 
            price={80}
          />
        </div>
      </div>
      
      <div className="row d-flex justify-content-start mt-4">
        <div className="col-md-4">
          <MenuCard 
            name="Chopsuey" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
            image="/images/chopsuey.jpg" 
            price={60}
          />
        </div>
        <div className="col-md-4">
          <MenuCard 
            name="Carbonara"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            image="/images/carbonara.jpg" 
            price={70}          
          />
        </div>
        <div className="col-md-4">
          <MenuCard 
            name="Chicken Curry" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
            image="/images/chickencurry.jpg" 
            price={80}
          />
        </div>
      </div>
      
      <div className="row d-flex justify-content-start mt-4">
        <div className="col-md-4">
          <MenuCard 
            name="Fried Chicken" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
            image="/images/friedchicken.jpg" 
            price={60}
          />
        </div>
        <div className="col-md-4">
          <MenuCard 
            name="Hotdog" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
            image="/images/hotdog.jpg" 
            price={30}
          />
        </div>
      </div>

      <div className="row d-flex justify-content-start mt-4">
        <div className="col-md-4">
          <MenuCard 
            name="Pancit Canton"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
            image="/images/pancitcanton.jpg" 
            price={30}
          />
        </div>
      </div>
    </main>
  );
}
