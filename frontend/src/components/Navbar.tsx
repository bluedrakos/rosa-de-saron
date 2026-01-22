"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Nosotros", href: "/nosotros" },
    { 
      name: "Explorar", 
      href: "#", 
      dropdown: [
        { name: "Ministerios", href: "/ministerios" },
        { name: "Reuniones", href: "/reuniones" },
      ]
    },
    { 
      name: "Organización", 
      href: "#", 
      dropdown: [
        { name: "Templos", href: "/templos" },
        { name: "Pastorado", href: "/pastorado" },
      ]
    },
    { name: "Eventos", href: "/eventos" },
    { name: "Blog", href: "/blog" },
  ];

  const handleDropdownEnter = (name: string) => {
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav 
      className={cn(
        "fixed w-full z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-secondary/95 backdrop-blur-md shadow-lg py-4" 
          : "bg-transparent py-6 md:py-8"
      )}
    >
      <div className="w-full max-w-[95%] xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          
          {/* LEFT: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
               <div className="relative w-12 h-12 flex items-center justify-center">
                  <Image
                    src="/assets/svg/logo.svg"
                    alt="Rosa de Saron Logo"
                    fill
                    className="object-contain brightness-0 invert"
                  />
               </div>
               <span className={cn(
                 "font-heading font-bold text-lg uppercase tracking-wider transition-colors",
                 isScrolled ? "text-white group-hover:text-primary" : "text-white group-hover:text-gray-200"
               )}>
                 ROSA DE SARON
               </span>
            </Link>
          </div>

          {/* CENTER: Navigation (Desktop) */}
          <div className="hidden lg:flex flex-1 justify-center items-center space-x-14">
            {navigation.map((item) => (
              <div 
                key={item.name} 
                className="relative group h-full flex items-center"
                onMouseEnter={() => item.dropdown && handleDropdownEnter(item.name)}
                onMouseLeave={handleDropdownLeave}
              >
                {item.dropdown ? (
                  <button
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-bold uppercase transition-colors outline-none",
                      isScrolled ? "text-gray-200 hover:text-white" : "text-gray-200 hover:text-white"
                    )}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-bold uppercase transition-colors",
                      isScrolled ? "text-gray-200 hover:text-white" : "text-gray-200 hover:text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && (
                   <div 
                     className={cn(
                       "absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-xl rounded-md py-2 transition-all duration-200 transform origin-top",
                       activeDropdown === item.name ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                     )}
                   >
                     {item.dropdown.map((subItem) => (
                       <Link
                         key={subItem.name}
                         href={subItem.href}
                         className="block px-4 py-3 text-sm text-secondary hover:bg-gray-50 hover:text-primary transition-colors font-medium border-b border-gray-100 last:border-0"
                       >
                         {subItem.name}
                       </Link>
                     ))}
                   </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT: Actions (Search + Button) */}
          <div className="hidden lg:flex items-center gap-6">
            <button className={cn(
              "p-2 rounded-full transition-colors hover:bg-white/10",
              isScrolled ? "text-white" : "text-white"
            )}>
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/contacto"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-sm font-bold uppercase text-sm transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 tracking-widest"
            >
              Contacto
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none"
            >
              <span className="sr-only">Abrir menú</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-secondary border-t border-gray-700 h-screen overflow-y-auto pb-20">
          <div className="px-4 pt-4 pb-3 space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <>
                     <span className="block px-3 py-2 text-primary font-bold uppercase text-xs tracking-wider mt-4 mb-1">
                       {item.name}
                     </span>
                     <div className="pl-4 space-y-1 border-l-2 border-gray-700 ml-3">
                       {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-3 py-2 text-gray-300 hover:text-white rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                       ))}
                     </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-white hover:text-primary hover:bg-white/5 rounded-md text-base font-bold uppercase"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-6 mt-6 border-t border-gray-700">
               <Link
                href="/contacto"
                className="bg-primary hover:bg-primary-dark text-white block w-full text-center px-3 py-3 rounded-sm text-base font-bold uppercase shadow-lg tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
