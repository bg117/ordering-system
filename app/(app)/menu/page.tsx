"use client";

import MenuCard from "@/components/MenuCard";

export default function Menu() {
  return (
    <main className="container">
      <h1>Menu</h1>
      <p>gusto q na pumasok</p>

      <div className="row d-flex justify-content-start">
        <div className="col-md-4">
          <MenuCard 
            name="Beef Salpicao" 
            description="Masarap naman talaga ang beef salpicao, mapait lang talaga sa part na nahulog ka sa kaibigan." 
            image="/images/beefsalpicao.jpg" 
            price={80}
          />
        </div>
        <div className="col-md-4">
          <MenuCard 
            name="Chicken Adobo" 
            description="Hindi mahirap magluto ng adobo, mahirap lang talagang pilitin ang isang taong mahalin din nila tayo." 
            image="/images/chickenadobo.jpg" 
            price={80}
          />
        </div>
        <div className="col-md-4">
          <MenuCard 
            name="Sinigang" 
            description="Asim kilig talaga sa sinigang, 'di katulad niyo na hanggang friends lang." 
            image="/images/sinigang.jpg" 
            price={80}
          />
        </div>
      </div>
      
      <div className="row d-flex justify-content-start mt-4">
        <div className="col-md-4">
          <MenuCard 
            name="Chopsuey" 
            description="Kumain ka na ng gulay, kasi 'di naman kayo pang habang buhay." 
            image="/images/chopsuey.jpg" 
            price={60}
          />
        </div>
        <div className="col-md-4">
          <MenuCard 
            name="Carbonara"
            description="Favorite ko talaga ang carbonara, pero ikaw, favorite ka ba?"
            image="/images/carbonara.jpg" 
            price={70}          
          />
        </div>
        <div className="col-md-4">
          <MenuCard 
            name="Chicken Curry" 
            description="Kain ka na lang ng curry, kasi sa'yo, hindi pa siya ready." 
            image="/images/chickencurry.jpg" 
            price={80}
          />
        </div>
      </div>
      
      <div className="row d-flex justify-content-start mt-4">
        <div className="col-md-4">
          <MenuCard 
            name="Fried Chicken" 
            description="Since then favorite talaga ang chicken, pero kung magugustuhan ka ba niya, yun ang when." 
            image="/images/friedchicken.jpg" 
            price={60}
          />
        </div>
        <div className="col-md-4">
          <MenuCard 
            name="Hotdog" 
            description="Lagi talaga kasama ang hotdog sa umagahan, pero diba sinaktan ka niya nang dahan dahan?" 
            image="/images/hotdog.jpg" 
            price={30}
          />
        </div>
      </div>

      <div className="row d-flex justify-content-start mt-4">
        <div className="col-md-4">
          <MenuCard 
            name="Pancit Canton"
            description="Pancit Canton ka na lang tuwing madaling araw na at namimiss mo siya." 
            image="/images/pancitcanton.jpg" 
            price={30}
          />
        </div>
      </div>
    </main>
  );
}
