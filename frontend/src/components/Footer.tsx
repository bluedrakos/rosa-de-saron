import Link from "next/link";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* About Column */}
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-bold text-white font-heading uppercase tracking-wider block mb-4">
              IGLESIA
            </span>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Somos una comunidad dedicada a seguir a Jesús y compartir su amor con el mundo. Únete a nosotros para adorar y servir.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://instagram.com" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://youtube.com" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/nosotros" className="text-gray-400 hover:text-primary text-sm">Nosotros</Link></li>
              <li><Link href="/reuniones" className="text-gray-400 hover:text-primary text-sm">Reuniones</Link></li>
              <li><Link href="/eventos" className="text-gray-400 hover:text-primary text-sm">Eventos</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-primary text-sm">Blog</Link></li>
            </ul>
          </div>

           {/* Schedule */}
           <div>
            <h3 className="text-lg font-bold mb-4 text-white">Reuniones</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex justify-between">
                <span>Domingo General:</span>
                <span>10:00 AM</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo Jovenes:</span>
                <span>5:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Miercoles de Oración:</span>
                <span>7:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contacto</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <span>123 Calle Principal, Ciudad, País</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <span>contacto@iglesia.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Iglesia. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
