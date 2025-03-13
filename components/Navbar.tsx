"use client";
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Menu as MenuIcon, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavbarSection() {
  return (
    <div className="relative w-full flex items-center justify-center z-[9999]">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load
    checkIsMobile();
    // Listen for screen resize
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Close dropdown when switching to mobile
  useEffect(() => {
    if (isMobile) {
      setActive(null);
    }
  }, [isMobile]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (href: string) => {
    // Check if target element exists on current page
    const targetId = href.split('#')[1];
    const element = document.getElementById(targetId);

    if (element) {
      // If element exists, smooth scroll to it
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // If element doesn't exist, navigate to new page
      router.push(href);
    }
  };

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      {isMobile ? (
        // ─────────────────────────────────────────────────────────────────
        // Mobile Menu
        // ─────────────────────────────────────────────────────────────────
        <div className="relative">
          {/* Mobile Toggle Button */}
          <div className="flex justify-end px-4">
            <button
              onClick={toggleMobileMenu}
              className="rounded-full bg-black p-2 border border-white/20 text-white z-50"
            >
              {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>

          {/* Mobile Menu Container */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black/95 pt-16 px-4 overflow-y-auto min-h-screen">
              <div className="flex flex-col space-y-6 mt-4">
                {/* Example: Direct Link (no accordion) */}
                <MobileDirectLink href="#about" label="About" onClick={closeMobileMenu} onNavigate={handleNavigation} />
                <MobileDirectLink href="#timeline" label="Time Line" onClick={closeMobileMenu} onNavigate={handleNavigation} />

                <MobileMenuItem title="Events" onClose={closeMobileMenu}>
                  <div className="grid grid-cols-1 gap-6 py-2">
                    <MobileProductItem
                      title="Technical"
                      href="/events/#tech"
                      src="/images/main_event/tech.jpg"
                      description="Showcase your technical prowess with coding challenges, hackathons, and innovative problem-solving events."
                      onClick={closeMobileMenu}
                      onNavigate={handleNavigation}
                    />
                    <MobileProductItem
                      title="Cultural"
                      href="/events/#cultural"
                      src="/images/main_event/cultural.jpg"
                      description="Celebrate creativity with music, dance, drama, and artistic showcases that bring cultures together."
                      onClick={closeMobileMenu}
                      onNavigate={handleNavigation}
                    />
                    <MobileProductItem
                      title="General"
                      href="/events/#general"
                      src="/images/main_event/general.png"
                      description="Engage in fun and thought-provoking competitions that test your wit, knowledge, and spontaneity."
                      onClick={closeMobileMenu}
                      onNavigate={handleNavigation}
                    />
                    <MobileProductItem
                      title="Gaming"
                      href="/events/#gaming"
                      src="/images/main_event/game.png"
                      description="Dive into the ultimate gaming battles with esports tournaments, arcade challenges, and strategy showdowns."
                      onClick={closeMobileMenu}
                      onNavigate={handleNavigation}
                    />
                  </div>
                </MobileMenuItem>
                <MobileDirectLink href="/login" label="Login" onClick={closeMobileMenu} onNavigate={handleNavigation} />

              </div>
            </div>
          )}
        </div>
      ) : (
        // ─────────────────────────────────────────────────────────────────
        // Desktop Menu
        // ─────────────────────────────────────────────────────────────────
        <Menu setActive={setActive}>
          <MenuItem direct href="#about" item="About" setActive={setActive} active={active} onNavigate={handleNavigation} />
          <MenuItem direct href="#timeline" item="Time Line" setActive={setActive} active={active} onNavigate={handleNavigation} />
          <MenuItem direct href="#gallery" item="Gallery" setActive={setActive} active={active} onNavigate={handleNavigation} />

          <MenuItem setActive={setActive} active={active} item="Events">
            <div className="text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem
                title="Technical"
                href="/events/#tech"
                src="/images/main_event/tech.jpg"
                description="Showcase your technical prowess with coding challenges, hackathons, and innovative problem-solving events."
                onNavigate={handleNavigation}
              />
              <ProductItem
                title="Cultural"
                href="/events/#cultural"
                src="/images/main_event/cultural.jpg"
                description="Celebrate creativity with music, dance, drama, and artistic showcases that bring cultures together."
                onNavigate={handleNavigation}
              />
              <ProductItem
                title="General"
                href="/events/#general"
                src="/images/main_event/general.png"
                description="Engage in fun and thought-provoking competitions that test your wit, knowledge, and spontaneity."
                onNavigate={handleNavigation}
              />
              <ProductItem
                title="Gaming"
                href="/events/#gaming"
                src="/images/main_event/game.png"
                description="Dive into the ultimate gaming battles with esports tournaments, arcade challenges, and strategy showdowns."
                onNavigate={handleNavigation}
              />
            </div>
          </MenuItem>
          <MenuItem direct href="/login" item="Login" setActive={setActive} active={active} onNavigate={handleNavigation} />
        </Menu>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Mobile-specific components
// ──────────────────────────────────────────────────────────────

// Accordion-like mobile item
const MobileMenuItem = ({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left text-white font-medium py-2"
      >
        {title}
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className="pl-4 mt-2">{children}</div>}
    </div>
  );
};

// Direct link for mobile (no accordion)
const MobileDirectLink = ({
  href,
  label,
  onClick,
  onNavigate,
}: {
  href: string;
  label: string;
  onClick: () => void;
  onNavigate: (href: string) => void;
}) => {
  return (
    <div className="border-b border-white/10 pb-4">
      <Link
        href={href}
        className="block w-full text-left text-white font-medium py-2 
                   hover:bg-purple-800 rounded-lg transition-colors"
        onClick={(e) => {
          e.preventDefault();
          onClick();
          onNavigate(href);
        }}
      >
        {label}
      </Link>
    </div>
  );
};

const MobileProductItem = ({
  title,
  description,
  href,
  src,
  onClick,
  onNavigate,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
  onClick: () => void;
  onNavigate: (href: string) => void;
}) => {
  return (
    <Link 
      href={href} 
      className="flex flex-col space-y-2" 
      onClick={(e) => {
        e.preventDefault();
        onClick();
        onNavigate(href);
      }}
    >
      <div className="flex items-center space-x-3">
        <Image
          src={src}
          width={80}
          height={40}
          alt={title}
          className="rounded-md shadow-lg"
        />
        <h4 className="text-lg font-bold text-white">{title}</h4>
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </Link>
  );
};
