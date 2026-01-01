import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  role?: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  industry?: string;
}

const TestimonialsCarousel = ({ testimonials, industry }: TestimonialsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 md:py-24 bg-accent/30">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold tracking-wider mb-2 block">
            DEPOIMENTOS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O que nossos clientes dizem
          </h2>
          {industry && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Veja como empresas de {industry.toLowerCase()} estão transformando seu atendimento com a ClickOne AI.
            </p>
          )}
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-background shadow-md hover:bg-muted"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-background shadow-md hover:bg-muted"
            onClick={goToNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Testimonial Card */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-background border-none shadow-lg">
                    <CardContent className="p-8 md:p-12">
                      <div className="flex justify-center mb-6">
                        <Quote className="h-12 w-12 text-primary/20" />
                      </div>
                      
                      {/* Stars */}
                      <div className="flex justify-center gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-primary fill-primary" />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-xl md:text-2xl text-center italic text-foreground mb-8 leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author */}
                      <div className="text-center">
                        <p className="font-semibold text-lg">{testimonial.author}</p>
                        {testimonial.role && (
                          <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                        )}
                        <p className="text-primary font-medium">{testimonial.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
