'use client'
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";


export function Brands() {
  
  const comapnys: {imageUrl: string}[] = [
    {
        imageUrl: 'https://res.cloudinary.com/zapier-media/image/upload/v1705948449/Homepage%20ZAP%20Jan%2024/Vector_jnrowo.svg'
    },{
        imageUrl: 'https://res.cloudinary.com/zapier-media/image/upload/v1705948703/Homepage%20ZAP%20Jan%2024/Group_1479600_cyfpbe.svg'
    },{
        imageUrl: 'https://res.cloudinary.com/zapier-media/image/upload/v1705948703/Homepage%20ZAP%20Jan%2024/Vector_1_rejvyb.svg'
    }, {
        imageUrl: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1685631505/Company%20logos/asana_sgibbb.svg'
    }, {
        imageUrl: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1685631505/Company%20logos/dropbox_bfeqf0.svg'
    }, {
        imageUrl: 'https://res.cloudinary.com/zapier-media/image/upload/v1705948702/Homepage%20ZAP%20Jan%2024/Vector_2_swaqlt.svg'
    }, {
        imageUrl: 'https://res.cloudinary.com/zapier-media/image/upload/v1705948702/Homepage%20ZAP%20Jan%2024/Group_vbzbwb.svg'
    }, {
        imageUrl: 'https://res.cloudinary.com/zapier-media/image/upload/v1705948702/Homepage%20ZAP%20Jan%2024/Group_1479596_fhwtpe.svg'
    }, {
        imageUrl: 'https://res.cloudinary.com/zapier-media/image/upload/v1711677526/Solutions/Company%20Size/Enterprise/April%202%20launch/logo-okta_m8un8n.svg'
    }, {
        imageUrl: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1685631782/Company%20logos/lyft_xb3vqy.svg'
    }, {
        imageUrl: 'https://res.cloudinary.com/zapier-media/image/upload/v1711677851/Solutions/Company%20Size/Enterprise/April%202%20launch/logo-sysco_h3r1ny.svg'
    }, {
        imageUrl: 'https://res.cloudinary.com/zapier-media/image/upload/v1711677825/Solutions/Company%20Size/Enterprise/April%202%20launch/logo-lululemon_w1ubj4.svg'
    }, {
        imageUrl: 'https://res.cloudinary.com/zapier-media/image/upload/v1705948701/Homepage%20ZAP%20Jan%2024/Group_1479595_ft3jlc.svg'
    },{
        imageUrl: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1685631507/Company%20logos/hello-fresh_spytbw.svg'
    },{
        imageUrl: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1685631505/Company%20logos/calendly_cte1mk.svg'
    }, {
        imageUrl: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1685631507/Company%20logos/hudl_wd0it2.svg'
    }, {
        imageUrl: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1685631505/Company%20logos/getaround_flyjf8.svg'
    }
  ]
  
    return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 1000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
        dragFree: true,
      }}
    >
      <CarouselContent className="-ml-1 flex items-center">
        {comapnys.map((p, index) => (
          <CarouselItem key={index} className=" basis-1/4 md:basis-1/12 lg:basis-1/12">
            <div className="p-1">
                <img src={p.imageUrl} width={150} height={80} className="p-4"/>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
