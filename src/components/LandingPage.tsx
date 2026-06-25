import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent, FormEvent, MouseEvent } from 'react';

import mcr from "../assets/mcer.v0-300x300.png";
import toeic from "../assets/toeic.png";
import sepLogo from "../assets/SEP.webp";
import cenniLogo from "../assets/cenni.png";

// Import Individual Testimonial Screenshots
import testimonio1 from "../assets/testimonio1.jpeg";
import testimonio2 from "../assets/testimonio2.jpeg";
import testimonio3 from "../assets/testimonio3.jpeg";
import testimonio4 from "../assets/testimonio4.jpeg";
import testimonio5 from "../assets/testimonio5.jpeg";
import testimonio6 from "../assets/testimonio6.jpeg";

const testimonials = [
  { src: testimonio1, alt: "Testimonio de Rafael Pérez" },
  { src: testimonio2, alt: "Testimonio de Humberto Pérez" },
  { src: testimonio3, alt: "Testimonio de José Amezcua" },
  { src: testimonio4, alt: "Testimonio de Mont PF" },
  { src: testimonio5, alt: "Testimonio de Valeria Benitez" },
  { src: testimonio6, alt: "Testimonio de Jonathan Sánchez" },
];

const TestimonialsSlider = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
        setAnimating(false);
      }, 300);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <div className="relative flex flex-col items-center w-full min-h-[250px]">
      <div
        className="w-full max-w-xl transition-all duration-300"
        style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(8px)' : 'translateY(0)' }}
      >
        {t && (
          <img
            src={t.src}
            alt={t.alt}
            className="w-full h-auto object-contain rounded-xl shadow-sm"
          />
        )}
      </div>
    </div>
  );
};

const LandingPage = () => {
  // Track whether the intro video has finished playing
  const [, setIsVideoFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleWhatsAppSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numeroWhatsApp = "5571080066";
    const texto = `Hola, mi nombre es *${formData.nombre}*.%0A%0A📧 Mi correo es: ${formData.correo}%0A💬 Mi duda/interés es: ${formData.mensaje}`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${texto}`;
    window.open(url, '_blank');
  };

  // Efecto para reproducir el video cuando sea visible en la pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch((err) => console.log("Autoplay prevenido por el navegador:", err));
        }
      },
      { threshold: 0.5 } // Se activará cuando al menos el 50% del video sea visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  // Función para hacer scroll suave hasta el formulario
  const scrollToForm = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('formulario-contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans relative">

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 sm:p-8 md:p-12 flex flex-col items-center text-center border border-slate-200">

        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          Domina un nuevo idioma y <span className="text-blue-600">certifica tu nivel</span> de Inglés
        </h1>
        <p className="text-slate-600 text-base md:text-lg mb-6 md:mb-8 max-w-2xl">
          ¿POR QUÉ NECESITAS EL INGLÉS YA? ¡TE LO DECIMOS! 👇
        </p>

        <div className="w-full max-w-xl mx-auto mb-8 text-left">
          <div className="bg-blue-50 text-blue-700 text-xs md:text-sm font-bold uppercase tracking-wider py-2 px-4 rounded-t-lg inline-block border border-blue-100 border-b-0 mb-2">
            Paso 1
          </div>
          <div className="w-full aspect-video rounded-b-xl rounded-tr-xl border border-blue-100 shadow-sm bg-black overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/9rDUmiWpAU8?autoplay=1&mute=1"
              title="Video promocional Eurocentro"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="w-full min-h-[90px] flex flex-col items-center justify-center mb-10">
          <div className="w-full flex flex-col items-center animate-fade-in">
            <a
              href="#formulario-contacto"
              onClick={scrollToForm}
              className="w-full max-w-md bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl text-base md:text-lg flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.245 3.487 5.236 3.487 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.312 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
              Solicitar Información
            </a>
          </div>
        </div>

        <div className="w-full mb-10 text-left">
          <h3 className="text-slate-900 font-bold text-center mb-6 text-lg md:text-xl">
            Lo que dicen nuestros alumnos
          </h3>
          <TestimonialsSlider />
        </div>

        <div id="formulario-contacto" className="w-full border-t border-slate-200 pt-8 mt-4 text-slate-800">
          <h3 className="font-bold text-center mb-6 text-lg md:text-xl">
            ¿Tienes dudas? Contáctanos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-sm text-left">

            <div className="flex flex-col gap-4">
              <p className="text-slate-600 mb-2">Déjanos tus datos y nos comunicaremos contigo vía WhatsApp.</p>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-4 hover:bg-slate-100 transition-colors shadow-sm">
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900">+52 55 7108 0066</p>
                  <p className="text-slate-500 text-xs">WhatsApp o llamadas</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleWhatsAppSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="nombre" className="block text-slate-600 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all shadow-inner"
                />
              </div>
              <div>
                <label htmlFor="correo" className="block text-slate-600 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all shadow-inner"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-xl text-base md:text-lg flex items-center justify-center gap-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.245 3.487 5.236 3.487 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.312 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                Enviar por WhatsApp
              </button>
            </form>
          </div>
        </div>

        <div className="w-full border-t border-slate-200 pt-8 mt-8">
          <p className="text-slate-400 text-xs md:text-sm font-semibold mb-6 md:mb-8 uppercase tracking-wide">Certificaciones y Avales Oficiales</p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-10 gap-y-6 md:gap-x-16">

            <img
              src={mcr}
              alt="MCR"
              className="h-10 sm:h-14 md:h-20 w-12 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-300"
            />
            <img
              src={toeic}
              alt="TOEIC"
              className="h-10 sm:h-14 md:h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
            <img
              src={sepLogo}
              alt="SEP"
              className="h-10 sm:h-14 md:h-20 w-20 object-contain hover:scale-105 transition-transform duration-300"
            />
            <img
              src={cenniLogo}
              alt="CENNI"
              className="h-10 sm:h-14 md:h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

      </div>

      <a
        href="https://wa.me/5571080066?text=Hola,%20quisiera%20recibir%20más%20información%20sobre%20los%20cursos."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        {/* Tooltip opcional al hacer hover */}
        <span className="absolute right-16 bg-white text-slate-800 text-sm font-bold py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md">
          ¡Chatea con nosotros!
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.245 3.487 5.236 3.487 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.312 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>

    </div>
  );
};

export default LandingPage;