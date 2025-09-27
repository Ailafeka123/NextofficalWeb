"use client";
// import { useState } from "react";
import { Swiper,SwiperSlide } from "swiper/react";

import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
export default function ScrollDiv(){

    return (
        <article className="h-svh w-full relative  overflow-hidde">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className={`mySwiper h-full`}
            >
                <SwiperSlide><img src="https://picsum.photos/300/200?id=1" className="w-full h-full object-cover " /></SwiperSlide>
                <SwiperSlide><img src="https://picsum.photos/300/200?id=2" className="w-full h-full object-cover " /></SwiperSlide>
                <SwiperSlide><img src="https://picsum.photos/300/200?id=3" className="w-full h-full object-cover " /></SwiperSlide>
            </Swiper>
        </article>
    )
}