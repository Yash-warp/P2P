
import React, { useLayoutEffect, useRef } from 'react';
import { TESTIMONIALS } from '../data/mockData';
import {
  Star,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Testimonials = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);

      // Initial states
      gsap.set(
        [
          badgeRef.current,
          headingRef.current,
          descriptionRef.current,
        ],
        {
          willChange: 'transform, opacity',
        }
      );

      // --------------------------------
      // HEADER SCROLL ANIMATION
      // --------------------------------

      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      headerTimeline
        .fromTo(
          badgeRef.current,
          {
            opacity: 0,
            y: 25,
            scale: 0.85,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: 'power3.out',
          }
        )
        .fromTo(
          headingRef.current,
          {
            opacity: 0,
            y: 40,
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.35'
        )
        .fromTo(
          descriptionRef.current,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
          },
          '-=0.4'
        );

      // --------------------------------
      // TESTIMONIAL CARDS SCROLL REVEAL
      // --------------------------------

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 85,
          scale: 0.88,
          rotationX: 8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.9,
          stagger: 0.16,
          ease: 'power3.out',
          clearProps: 'willChange',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // --------------------------------
      // STARS & VERIFIED ICON ANIMATION
      // --------------------------------

      cards.forEach((card, index) => {
        const stars = card.querySelectorAll('.testimonial-star');
        const verifiedIcon = card.querySelector('.testimonial-verified');

        gsap.fromTo(
          stars,
          {
            opacity: 0,
            scale: 0.3,
            rotation: -45,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.45,
            stagger: 0.07,
            ease: 'back.out(2)',
            delay: index * 0.12,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        if (verifiedIcon) {
          gsap.fromTo(
            verifiedIcon,
            {
              opacity: 0,
              scale: 0,
              rotation: -90,
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: card,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // --------------------------------
      // LERP-STYLE SMOOTH HOVER EFFECTS
      // --------------------------------

      const cleanups = [];

      cards.forEach((card) => {
        const stars = card.querySelectorAll('.testimonial-star');
        const verifiedIcon = card.querySelector('.testimonial-verified');

        // Smooth interpolation using GSAP quickTo
        const moveY = gsap.quickTo(card, 'y', {
          duration: 0.45,
          ease: 'power3.out',
        });

        const scaleCard = gsap.quickTo(card, 'scale', {
          duration: 0.5,
          ease: 'power3.out',
        });

        const scaleIcon = verifiedIcon
          ? gsap.quickTo(verifiedIcon, 'scale', {
              duration: 0.4,
              ease: 'power3.out',
            })
          : null;

        const rotateIcon = verifiedIcon
          ? gsap.quickTo(verifiedIcon, 'rotation', {
              duration: 0.45,
              ease: 'power3.out',
            })
          : null;

        const scaleStars = stars.length
          ? gsap.quickTo(stars, 'scale', {
              duration: 0.4,
              ease: 'power3.out',
            })
          : null;

        const handleEnter = () => {
          moveY(-8);
          scaleCard(1.035);

          scaleIcon?.(1.2);
          rotateIcon?.(8);
          scaleStars?.(1.12);
        };

        const handleLeave = () => {
          moveY(0);
          scaleCard(1);

          scaleIcon?.(1);
          rotateIcon?.(0);
          scaleStars?.(1);
        };

        card.addEventListener('mouseenter', handleEnter);
        card.addEventListener('mouseleave', handleLeave);

        cleanups.push(() => {
          card.removeEventListener('mouseenter', handleEnter);
          card.removeEventListener('mouseleave', handleLeave);
        });
      });

      // --------------------------------
      // REFRESH SCROLLTRIGGER
      // --------------------------------

      const refreshCall = gsap.delayedCall(0.3, () => {
        ScrollTrigger.refresh();
      });

      // Cleanup event listeners and delayed call
      return () => {
        cleanups.forEach((cleanup) => cleanup());
        refreshCall.kill();
      };

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#E9D5FF]/20 border-t border-[#E9D5FF] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* SECTION HEADER */}
        <div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E9D5FF] text-xs font-bold text-[#30105E] shadow-neu-pill mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Community Stories</span>
          </div>

          <h2
            ref={headingRef}
            className="font-display font-black text-3xl sm:text-5xl text-[#30105E] tracking-tight"
          >
            Trusted by locals
          </h2>

          <p
            ref={descriptionRef}
            className="mt-3 text-base sm:text-lg text-[#30105E]/75 font-medium"
          >
            Hear from genuine lenders and borrowers in Bangalore neighborhoods sharing gear and saving money every day.
          </p>
        </div>

        {/* TESTIMONIAL CARDS */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {TESTIMONIALS.map((t, index) => (
            <div
              key={t.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="testimonial-card p-7 rounded-[30px] bg-white border border-[#E9D5FF] shadow-neu-pill hover:shadow-xl hover:border-[#7C3AED]/60 transition-[box-shadow,border-color] duration-300 flex flex-col justify-between relative group"
              style={{
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
              }}
            >
              <div>

                {/* STARS & BADGE */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="testimonial-star w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <span className="text-[11px] font-bold text-[#30105E] bg-[#E9D5FF] border border-[#C4B5FD] px-2.5 py-0.5 rounded-full">
                    {t.earnings}
                  </span>
                </div>

                {/* QUOTE */}
                <p className="text-sm sm:text-base text-[#30105E]/85 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* USER PROFILE */}
              <div className="pt-4 border-t border-[#E9D5FF]/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[#C4B5FD]"
                  />

                  <div>
                    <h4 className="font-display font-bold text-sm text-[#30105E] flex items-center gap-1">
                      {t.name}

                      <ShieldCheck className="testimonial-verified w-3.5 h-3.5 text-[#7C3AED]" />
                    </h4>

                    <p className="text-xs text-[#30105E]/70">
                      {t.role}
                    </p>

                    <p className="text-[11px] text-[#30105E]/50">
                      {t.location}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#30105E]/50 block">
                    Gear
                  </span>

                  <span className="text-xs font-semibold text-[#30105E]">
                    {t.item}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
