
import React, { useLayoutEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

import {
  ArrowRight,
  Plus,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FinalCTA = () => {
  const { navigateTo } = useApp();

  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const cardRef = useRef(null);
  const badgeRef = useRef(null);
  const headingFirstRef = useRef(null);
  const headingSecondRef = useRef(null);
  const highlightRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef([]);
  const trustRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const buttons = buttonsRef.current.filter(Boolean);
      const trustItems = trustRef.current
        ? Array.from(trustRef.current.children)
        : [];

      const firstArrow = buttons[0]?.querySelector('svg');
      const secondPlus = buttons[1]?.querySelector('svg');

      // --------------------------------------
      // INITIAL STATES
      // --------------------------------------

      gsap.set(cardRef.current, {
        opacity: 0,
        y: 110,
        scale: 0.88,
        rotationX: 12,
        transformPerspective: 1200,
        transformOrigin: 'center bottom',
      });

      gsap.set(badgeRef.current, {
        opacity: 0,
        y: -35,
        scale: 0.65,
        rotation: -8,
      });

      gsap.set(
        [headingFirstRef.current, headingSecondRef.current],
        {
          opacity: 0,
          y: 75,
          rotationX: -35,
          transformPerspective: 900,
        }
      );

      gsap.set(highlightRef.current, {
        opacity: 0,
        scale: 0.45,
        rotation: -12,
        y: 30,
      });

      gsap.set(descriptionRef.current, {
        opacity: 0,
        y: 45,
        filter: 'blur(12px)',
      });

      gsap.set(buttons, {
        opacity: 0,
        y: 65,
        scale: 0.75,
        rotationX: 20,
      });

      gsap.set(trustItems, {
        opacity: 0,
        y: 25,
        scale: 0.8,
      });

      // --------------------------------------
      // MAIN SCROLL ANIMATION
      // --------------------------------------

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Main card entrance
      timeline.to(cardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.1,
        ease: 'power4.out',
      });

      // 2. Badge entrance
      timeline.to(
        badgeRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.6)',
        },
        '-=0.65'
      );

      // 3. First heading line
      timeline.to(
        headingFirstRef.current,
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.85,
          ease: 'power4.out',
        },
        '-=0.35'
      );

      // 4. Second heading line
      timeline.to(
        headingSecondRef.current,
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.85,
          ease: 'power4.out',
        },
        '-=0.5'
      );

      // 5. Highlighted neighbors text
      timeline.to(
        highlightRef.current,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 0.9,
          ease: 'elastic.out(1, 0.45)',
        },
        '-=0.45'
      );

      // 6. Description blur reveal
      timeline.to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
        },
        '-=0.4'
      );

      // 7. CTA buttons
      timeline.to(
        buttons,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.85,
          stagger: 0.18,
          ease: 'back.out(1.6)',
        },
        '-=0.3'
      );

      // 8. Trust indicators
      timeline.to(
        trustItems,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'back.out(1.5)',
        },
        '-=0.25'
      );

      // --------------------------------------
      // PURPLE GLOW FLOATING ANIMATION
      // --------------------------------------

      gsap.to(glowRef.current, {
        y: -28,
        x: 12,
        scale: 1.2,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // --------------------------------------
      // BUTTON LERP HOVER
      // --------------------------------------

      const cleanups = [];

      buttons.forEach((button, index) => {
        const moveY = gsap.quickTo(button, 'y', {
          duration: 0.55,
          ease: 'power3.out',
        });

        const scale = gsap.quickTo(button, 'scale', {
          duration: 0.55,
          ease: 'power3.out',
        });

        const arrow = index === 0 ? firstArrow : secondPlus;

        const iconX = arrow
          ? gsap.quickTo(arrow, 'x', {
              duration: 0.45,
              ease: 'power3.out',
            })
          : null;

        const iconRotation = arrow
          ? gsap.quickTo(arrow, 'rotation', {
              duration: 0.45,
              ease: 'power3.out',
            })
          : null;

        const handleEnter = () => {
          moveY(-8);
          scale(1.045);
          iconX?.(index === 0 ? 6 : 0);
          iconRotation?.(index === 0 ? 0 : 90);
        };

        const handleLeave = () => {
          moveY(0);
          scale(1);
          iconX?.(0);
          iconRotation?.(0);
        };

        button.addEventListener('mouseenter', handleEnter);
        button.addEventListener('mouseleave', handleLeave);

        cleanups.push(() => {
          button.removeEventListener('mouseenter', handleEnter);
          button.removeEventListener('mouseleave', handleLeave);
        });
      });

      // --------------------------------------
      // TRUST INDICATOR HOVER
      // --------------------------------------

      trustItems.forEach((item) => {
        const moveY = gsap.quickTo(item, 'y', {
          duration: 0.35,
          ease: 'power3.out',
        });

        const scale = gsap.quickTo(item, 'scale', {
          duration: 0.4,
          ease: 'power3.out',
        });

        const handleEnter = () => {
          moveY(-4);
          scale(1.08);
        };

        const handleLeave = () => {
          moveY(0);
          scale(1);
        };

        item.addEventListener('mouseenter', handleEnter);
        item.addEventListener('mouseleave', handleLeave);

        cleanups.push(() => {
          item.removeEventListener('mouseenter', handleEnter);
          item.removeEventListener('mouseleave', handleLeave);
        });
      });

      // --------------------------------------
      // SCROLLTRIGGER REFRESH
      // --------------------------------------

      const refresh = gsap.delayedCall(0.4, () => {
        ScrollTrigger.refresh();
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
        refresh.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">

        {/* FLOATING PURPLE GLOW */}
        <div
          ref={glowRef}
          className="w-80 h-80 bg-[#7C3AED]/15 rounded-full blur-3xl mx-auto -mb-40 pointer-events-none"
        />

        {/* MAIN CTA CARD */}
        <div
          ref={cardRef}
          className="p-8 sm:p-14 rounded-[36px] bg-white border border-[#E9D5FF] shadow-2xl relative z-10"
          style={{ willChange: 'transform, opacity' }}
        >

          {/* BADGE */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E9D5FF] border border-[#C4B5FD] text-xs font-bold text-[#30105E] mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#7C3AED]" />
            <span>
              Join India's Fastest Growing Sharing Economy
            </span>
          </div>

          {/* HEADING */}
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#30105E] tracking-tight leading-[1.12]">

            <span
              ref={headingFirstRef}
              className="block"
            >
              Stop borrowing from stores.
            </span>

            <span
              ref={headingSecondRef}
              className="block mt-2"
            >
              Start borrowing from{' '}

              <span
                ref={highlightRef}
                className="relative inline-block"
              >
                <span className="bg-[#C4B5FD] text-[#30105E] px-4 py-1 rounded-3xl shadow-neu-pill">
                  neighbors.
                </span>
              </span>
            </span>

          </h2>

          {/* DESCRIPTION */}
          <p
            ref={descriptionRef}
            className="mt-6 text-base sm:text-xl text-[#30105E]/75 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Borrow cameras, tools, camping equipment, and drones when you need them. Or turn your unused gear into regular monthly income.
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

            <button
              ref={(el) => (buttonsRef.current[0] = el)}
              onClick={() => navigateTo('marketplace')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm tracking-tight shadow-lg hover:shadow-xl transition-[background-color,box-shadow] duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Start Renting — It's Free</span>

              <ArrowRight className="w-4 h-4 text-[#C4B5FD] group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <button
              ref={(el) => (buttonsRef.current[1] = el)}
              onClick={() => navigateTo('list-item')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#E9D5FF] hover:bg-[#DDD6FE] text-[#30105E] font-bold text-sm tracking-tight shadow-md hover:shadow-lg border border-[#C4B5FD] transition-[background-color,box-shadow] duration-300 flex items-center justify-center gap-2 group"
            >
              <Plus className="w-4 h-4 stroke-[3] text-[#7C3AED]" />

              <span>List Your Gear & Earn</span>
            </button>

          </div>

          {/* TRUST GUARANTEES */}
          <div
            ref={trustRef}
            className="mt-10 pt-8 border-t border-[#E9D5FF]/70 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-[#30105E]/70"
          >

            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
              <span>DigiLocker ID Verified</span>
            </div>

            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
              <span>RBI Regulated Escrow</span>
            </div>

            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
              <span>Encrypted QR Handover</span>
            </div>

            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
              <span>24/7 Community Support</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
