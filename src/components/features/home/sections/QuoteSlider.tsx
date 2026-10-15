"use client";

import { Quote } from "lucide-react";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

interface QuoteItem {
  text: string;
  author: string;
  role: string;
}

interface QuoteSliderProps {
  quotes: QuoteItem[];
}

const QuoteSlider = ({ quotes }: QuoteSliderProps) => {
  if (quotes.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={24}
        loop={quotes.length > 1}
        autoplay={
          quotes.length > 1
            ? {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        pagination={{
          clickable: true,
        }}
        a11y={{
          prevSlideMessage: "Previous testimonial",
          nextSlideMessage: "Next testimonial",
          paginationBulletMessage: "Go to testimonial {{index}}",
        }}
        className="quote-swiper"
      >
        {quotes.map((quote, index) => (
          <SwiperSlide
            key={`${quote.author}-${index}`}
            className="h-auto pb-10"
          >
            <blockquote className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card/70 p-6 text-sm text-muted-foreground backdrop-blur-sm transition-colors duration-300 hover:border-primary/30 sm:p-8">
              <Quote
                aria-hidden="true"
                className="mb-5 size-8 text-primary/60"
              />

              <p className="flex-1 text-base leading-7 italic text-foreground/90">
                “{quote.text}”
              </p>

              <footer className="mt-6 border-t border-border pt-4 not-italic">
                <p className="font-semibold text-foreground">{quote.author}</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {quote.role}
                </p>
              </footer>
            </blockquote>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .quote-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .quote-swiper .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background: hsl(var(--muted-foreground));
          opacity: 0.4;
          transition: all 0.3s ease;
        }

        .quote-swiper .swiper-pagination-bullet-active {
          width: 22px;
          border-radius: 999px;
          background: hsl(var(--primary));
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default QuoteSlider;
