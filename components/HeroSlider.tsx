
"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    tag: "WELCOME TO BOOKNOOK",
    title: "Your Next Great Adventure Starts Here",
    description:
      "Explore incredible stories, discover new authors, and find the perfect book for your next reading adventure.",
    button: "Explore Books",
    link: "/books",
    emoji: "📚",
    background: "from-indigo-700 via-violet-600 to-purple-500",
  },
  {
    tag: "DISCOVER NEW STORIES",
    title: "A World of Knowledge Awaits You",
    description:
      "From timeless classics to modern favorites, discover books that inspire, educate, and entertain.",
    button: "Browse Collection",
    link: "/books",
    emoji: "📖",
    background: "from-sky-700 via-blue-600 to-indigo-500",
  },
  {
    tag: "YOUR READING JOURNEY",
    title: "Read More, Discover More",
    description:
      "Find books you love, borrow your favorites, and keep track of your reading journey with BookNook.",
    button: "Start Exploring",
    link: "/books",
    emoji: "✨",
    background: "from-rose-700 via-pink-600 to-orange-400",
  },
];

export default function HeroSlider() {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        className="booknook-slider"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div
              className={`flex min-h-[520px] items-center bg-gradient-to-r ${slide.background} px-6 py-16 text-white md:min-h-[580px]`}
            >
              <div className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2">
                <div>
                  <p className="mb-5 text-sm font-bold tracking-[0.25em] text-white/80">
                    {slide.tag}
                  </p>

                  <h1 className="max-w-2xl text-4xl font-extrabold leading-tight md:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
                    {slide.description}
                  </p>

                  <Link
                    href={slide.link}
                    className="mt-9 inline-block rounded-xl bg-white px-8 py-4 font-bold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
                  >
                    {slide.button}
                  </Link>
                </div>

                <div className="hidden items-center justify-center md:flex">
                  <div className="flex h-72 w-72 items-center justify-center rounded-[3rem] border border-white/30 bg-white/15 text-[140px] shadow-2xl backdrop-blur-sm lg:h-96 lg:w-96">
                    {slide.emoji}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
