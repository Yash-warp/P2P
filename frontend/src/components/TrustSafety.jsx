
import React, { useLayoutEffect, useRef } from 'react';

import { TRUST_FEATURES } from '../data/mockData';

import {
  ShieldCheck,
  Lock,
  QrCode,
  MapPin,
  CheckCircle,
  ShieldAlert
} from 'lucide-react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TrustSafety = () => {

  // ==========================================
  // REFS
  // ==========================================

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const highlightRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef(null);
  const bannerRef = useRef(null);


  // ==========================================
  // ICON HANDLER
  // ==========================================

  const getIcon = (name) => {
    const iconClass = "w-6 h-6 text-[#7C3AED]";

    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className={iconClass} />;

      case 'Lock':
        return <Lock className={iconClass} />;

      case 'QrCode':
        return <QrCode className={iconClass} />;

      case 'MapPin':
        return <MapPin className={iconClass} />;

      default:
        return <ShieldCheck className={iconClass} />;
    }
  };


  // ==========================================
  // ALL GSAP + SCROLLTRIGGER ANIMATIONS
  // ==========================================

  useLayoutEffect(() => {

    const ctx = gsap.context(() => {

      // --------------------------------------
      // INITIAL STATES
      // --------------------------------------

      const cards = gsap.utils.toArray(
        '.trust-feature-card',
        cardsRef.current
      );

      gsap.set(
        [
          badgeRef.current,
          headingRef.current,
          descriptionRef.current,
          ...cards,
          bannerRef.current
        ],
        {
          willChange: 'transform, opacity'
        }
      );


      // ======================================
      // 1. HEADER SCROLL REVEAL
      // ======================================

      const headerTimeline = gsap.timeline({

        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          markers: false
        }

      });

      headerTimeline

        // Badge
        .fromTo(
          badgeRef.current,
          {
            opacity: 0,
            y: 35,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out'
          }
        )

        // Heading
        .fromTo(
          headingRef.current,
          {
            opacity: 0,
            y: 55,
            scale: 0.92
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power4.out'
          },
          '-=0.3'
        )

        // Highlighted text
        .fromTo(
          highlightRef.current,
          {
            opacity: 0,
            scale: 0.75,
            rotation: -5
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.65,
            ease: 'back.out(1.7)'
          },
          '-=0.45'
        )

        // Description
        .fromTo(
          descriptionRef.current,
          {
            opacity: 0,
            y: 35,
            filter: 'blur(8px)'
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out'
          },
          '-=0.2'
        );


      // ======================================
      // 2. FEATURE CARDS SCROLL REVEAL
      // ======================================

      if (cards.length) {

        gsap.fromTo(
          cards,

          {
            opacity: 0,
            y: 85,
            scale: 0.82,
            rotationX: 8
          },

          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,

            duration: 0.9,

            stagger: {
              each: 0.16,
              from: 'start'
            },

            ease: 'power3.out',

            clearProps: 'willChange',

            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
              markers: false,
              invalidateOnRefresh: true
            }

          }
        );


        // Individual card icon animation

        cards.forEach((card) => {

          const icon = card.querySelector('.trust-icon');

          if (!icon) return;

          gsap.fromTo(
            icon,

            {
              opacity: 0,
              scale: 0.4,
              rotation: -25
            },

            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.75,
              ease: 'back.out(1.8)',

              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
                markers: false
              }

            }
          );

        });

      }


      // ======================================
      // 3. SECURITY BANNER SCROLL REVEAL
      // ======================================

      gsap.fromTo(
        bannerRef.current,

        {
          opacity: 0,
          y: 90,
          scale: 0.9,
          rotationX: 5
        },

        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,

          duration: 1,

          ease: 'power3.out',

          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
            markers: false,
            invalidateOnRefresh: true
          }

        }
      );


      // ======================================
      // 4. LERP-STYLE CARD HOVER
      // ======================================

      cards.forEach((card) => {

        const icon = card.querySelector('.trust-icon');

        // Smooth interpolation
        const moveY = gsap.quickTo(card, 'y', {
          duration: 0.45,
          ease: 'power3.out'
        });

        const scaleCard = gsap.quickTo(card, 'scale', {
          duration: 0.45,
          ease: 'power3.out'
        });

        const iconScale = icon
          ? gsap.quickTo(icon, 'scale', {
              duration: 0.4,
              ease: 'power3.out'
            })
          : null;

        const iconRotation = icon
          ? gsap.quickTo(icon, 'rotation', {
              duration: 0.4,
              ease: 'power3.out'
            })
          : null;


        // Hover enter
        const onEnter = () => {

          moveY(-10);
          scaleCard(1.045);

          if (iconScale) iconScale(1.2);
          if (iconRotation) iconRotation(8);

          gsap.to(card, {
            boxShadow: '0 18px 45px rgba(124,58,237,0.25)',
            borderColor: '#7C3AED',
            duration: 0.4,
            overwrite: 'auto'
          });

        };


        // Hover leave
        const onLeave = () => {

          moveY(0);
          scaleCard(1);

          if (iconScale) iconScale(1);
          if (iconRotation) iconRotation(0);

          gsap.to(card, {
            boxShadow: '0 0 0 rgba(124,58,237,0)',
            borderColor: '#E9D5FF',
            duration: 0.5,
            overwrite: 'auto'
          });

        };


        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);


        // Clean event listeners
        const cleanup = () => {
          card.removeEventListener('mouseenter', onEnter);
          card.removeEventListener('mouseleave', onLeave);
        };

        card._trustCleanup = cleanup;

      });


    }, sectionRef);


    // ======================================
    // REFRESH SCROLLTRIGGER POSITIONS
    // ======================================

    const refresh = gsap.delayedCall(0.2, () => {
      ScrollTrigger.refresh();
    });

    return () => {

      refresh.kill();

      const cards = cardsRef.current?.querySelectorAll(
        '.trust-feature-card'
      );

      cards?.forEach((card) => {
        card._trustCleanup?.();
        delete card._trustCleanup;
      });

      ctx.revert();

    };

  }, []);


  // ==========================================
  // COMPONENT UI
  // ==========================================

  return (

    <section
      id="trust-section"
      ref={sectionRef}
      className="py-16 md:py-24 overflow-hidden"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6">


        {/* ================================= */}
        {/* SECTION HEADER */}
        {/* ================================= */}

        <div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-12"
        >

          {/* TRUST BADGE */}

          <div
            ref={badgeRef}
            className="
              inline-flex items-center gap-1.5
              px-3.5 py-1 rounded-full
              bg-[#E9D5FF]
              border border-[#C4B5FD]
              text-xs font-bold text-[#30105E]
              mb-3
              transition-all duration-300
              hover:scale-105
              hover:shadow-[0_0_18px_rgba(124,58,237,0.3)]
            "
          >

            <ShieldCheck className="w-3.5 h-3.5 text-[#7C3AED]" />

            <span>
              Bank-Grade Escrow & ID Verification
            </span>

          </div>


          {/* MAIN HEADING */}

          <h2
            ref={headingRef}
            className="
              font-display font-black
              text-3xl sm:text-5xl
              text-[#30105E]
              tracking-tight
            "
          >

            Built on trust,{' '}

            <span className="relative inline-block">

              <span
                ref={highlightRef}
                className="
                  inline-block
                  bg-[#C4B5FD]
                  text-[#30105E]
                  px-3 py-0.5
                  rounded-2xl
                  shadow-neu-pill
                "
              >
                verified in person.
              </span>

            </span>

          </h2>


          {/* SUBHEADING */}

          <p
            ref={descriptionRef}
            className="
              mt-4
              text-base sm:text-lg
              text-[#30105E]/75
              font-medium
            "
          >

            Lendit is engineered with multiple safety layers so you can rent out or borrow expensive equipment with complete peace of mind.

          </p>

        </div>


        {/* ================================= */}
        {/* TRUST FEATURE CARDS */}
        {/* ================================= */}

        <div
          ref={cardsRef}
          className="
            grid grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >

          {TRUST_FEATURES.map((feature, idx) => (

            <div
              key={idx}
              className="
                trust-feature-card
                p-6
                rounded-[28px]
                bg-white
                border border-[#E9D5FF]
                shadow-neu-pill
                flex flex-col justify-between
                group cursor-pointer
                transition-colors duration-300
                [transform-style:preserve-3d]
                will-change-transform
              "
            >

              <div>

                {/* ICON & BADGE */}

                <div className="flex items-center justify-between mb-5">

                  <div
                    className="
                      trust-icon
                      w-12 h-12
                      rounded-2xl
                      bg-[#FAF8FF]
                      border border-[#E9D5FF]
                      flex items-center justify-center
                      transition-colors duration-500
                      group-hover:bg-[#E9D5FF]
                      group-hover:shadow-[0_0_22px_rgba(124,58,237,0.35)]
                    "
                  >

                    {getIcon(feature.icon)}

                  </div>


                  <span
                    className="
                      text-[10px]
                      font-bold
                      text-[#30105E]
                      bg-[#E9D5FF]
                      px-2.5 py-1
                      rounded-full
                      transition-all duration-300
                      group-hover:bg-[#7C3AED]
                      group-hover:text-white
                      group-hover:scale-110
                    "
                  >

                    {feature.badge}

                  </span>

                </div>


                {/* TITLE */}

                <h3
                  className="
                    font-display
                    font-bold
                    text-lg
                    text-[#30105E]
                    mb-2
                    transition-all duration-300
                    group-hover:text-[#7C3AED]
                    group-hover:translate-x-1
                  "
                >

                  {feature.title}

                </h3>


                {/* DESCRIPTION */}

                <p className="
                  text-xs sm:text-sm
                  text-[#30105E]/70
                  leading-relaxed
                ">

                  {feature.description}

                </p>

              </div>


              {/* VERIFIED INDICATOR */}

              <div
                className="
                  mt-6 pt-4
                  border-t border-[#E9D5FF]/60
                  flex items-center gap-1.5
                  text-xs font-bold
                  text-[#30105E]
                  transition-all duration-300
                  group-hover:translate-x-1
                "
              >

                <CheckCircle
                  className="
                    w-4 h-4
                    text-[#7C3AED]
                    transition-all duration-300
                    group-hover:scale-125
                    group-hover:rotate-12
                  "
                />

                <span>
                  Lendit Safety Guarantee
                </span>

              </div>

            </div>

          ))}

        </div>


        {/* ================================= */}
        {/* SECURITY BANNER */}
        {/* ================================= */}

        <div
          ref={bannerRef}
          className="
            mt-12
            p-6 sm:p-8
            rounded-[32px]
            bg-white
            border border-[#E9D5FF]
            shadow-neu-pill
            flex flex-col md:flex-row
            items-center justify-between
            gap-6
            transition-all duration-500
            hover:shadow-[0_15px_40px_rgba(124,58,237,0.2)]
            hover:border-[#7C3AED]/60
          "
        >

          {/* LEFT CONTENT */}

          <div className="flex items-center gap-4">

            <div
              className="
                w-12 h-12
                rounded-2xl
                bg-[#7C3AED]
                text-white
                flex items-center justify-center
                shrink-0 shadow-md
                transition-all duration-500
                hover:scale-110
                hover:rotate-6
                hover:shadow-[0_0_25px_rgba(124,58,237,0.6)]
              "
            >

              <ShieldAlert className="w-6 h-6" />

            </div>


            <div>

              <h4 className="
                font-display
                font-bold
                text-base sm:text-lg
                text-[#30105E]
              ">

                ₹50,000 Equipment Protection Warranty

              </h4>


              <p className="
                text-xs sm:text-sm
                text-[#30105E]/70
                mt-0.5
              ">

                Every verified rental transaction includes secondary damage reimbursement coverage backed by our community guarantee pool.

              </p>

            </div>

          </div>


          {/* RIGHT CONTENT */}

          <div className="
            shrink-0
            flex items-center gap-2
            flex-wrap justify-center
          ">

            <span className="
              text-xs
              font-bold
              text-[#30105E]/70
            ">

              Regulated Escrow Partner:

            </span>


            <span
              className="
                px-3 py-1
                rounded-xl
                bg-[#E9D5FF]
                font-mono
                text-xs
                font-bold
                text-[#30105E]
                transition-all duration-300
                hover:scale-110
                hover:bg-[#C4B5FD]
                hover:shadow-[0_0_20px_rgba(124,58,237,0.35)]
              "
            >

              RBI Escrow Compliant

            </span>

          </div>

        </div>

      </div>

    </section>

  );

};
