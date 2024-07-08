"use client";
import Link from "next/link";
import RootLayout from "@/app/layout";
import ClientLayout from "@/components/ClientLay";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const cards = document.querySelectorAll(".card");
    let styleElement = document.querySelector(".hover");

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.classList.add("hover");
      document.head.appendChild(styleElement);
    }

    function handleMouseMove(e) {
      const styleElement = document.querySelector(".hover");
      if (!styleElement) return;

      let pos = [e.offsetX, e.offsetY];
      if (e.type === "touchmove") {
        pos = [e.touches[0].clientX, e.touches[0].clientY];
      }
      const card = e.currentTarget;
      const l = pos[0];
      const t = pos[1];
      const h = card.offsetHeight;
      const w = card.offsetWidth;
      const px = Math.abs(Math.floor((100 / w) * l) - 100);
      const py = Math.abs(Math.floor((100 / h) * t) - 100);
      const pa = 50 - px + (50 - py);
      const lp = 50 + (px - 50) / 1.5;
      const tp = 50 + (py - 50) / 1.5;
      const px_spark = 50 + (px - 50) / 7;
      const py_spark = 50 + (py - 50) / 7;
      const p_opc = 20 + Math.abs(pa) * 1.5;
      const ty = ((tp - 50) / 2) * -1;
      const tx = ((lp - 50) / 1.5) * 0.5;
      const grad_pos = `background-position: ${lp}% ${tp}%;`;
      const sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`;
      const opc = `opacity: ${p_opc / 100};`;
      const tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg);`;

      const style = `
        .card:hover:before { ${grad_pos} }
        .card:hover:after { ${sprk_pos} ${opc} }
      `;
      cards.forEach(card => card.classList.remove("active"));
      card.classList.remove("animated");
      card.setAttribute("style", tf);
      styleElement.innerHTML = style;
      if (e.type === "touchmove") {
        return false;
      }
    }

    function handleMouseOut(e) {
      const styleElement = document.querySelector(".hover");
      if (!styleElement) return;

      const card = e.currentTarget;
      styleElement.innerHTML = "";
      card.removeAttribute("style");
      setTimeout(() => {
        card.classList.add("animated");
      }, 2500);
    }

    cards.forEach(card => {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("touchmove", handleMouseMove);
      card.addEventListener("mouseout", handleMouseOut);
      card.addEventListener("touchend", handleMouseOut);
      card.addEventListener("touchcancel", handleMouseOut);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("touchmove", handleMouseMove);
        card.removeEventListener("mouseout", handleMouseOut);
        card.removeEventListener("touchend", handleMouseOut);
        card.removeEventListener("touchcancel", handleMouseOut);
      });
    };
  }, []);

  return (
    <RootLayout>
      <ClientLayout>
        <header className="relative h-screen flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: "url('/Back1.png')" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#171925] opacity-80 z-0"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-black text-center px-4">
            <h1 className="text-5xl font-bold">Bienvenue sur Kollector's</h1>
            <p className="mt-4 text-xl max-w-2xl">
              Votre destination ultime pour tout ce qui concerne les cartes ! Que vous soyez un collectionneur passionné ou un nouvel adepte, notre plateforme complète vous propose une expérience immersive.
            </p>
            <div className="mt-8 flex space-x-4">
              <Link href="/construction" className="px-6 py-3 bg-red-600 rounded hover:bg-red-700 text-white">
              Télécharger
              </Link>
              <Link href="/construction" className="px-6 py-3 border border-black rounded hover:bg-black hover:text-white">
               En savoir plus 
              </Link>
            </div>
          </div>
        </header>

        <div className="bg-[#171925]">
          <section className="py-16 text-center text-white">
            <h2 className="text-3xl font-bold">Découvrez nos cartes !</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
              <div className="flex justify-center">
                <div className="card charizard animated"></div>
              </div>
              <div className="flex justify-center">
                <div className="card pika animated"></div>
              </div>
              <div className="flex justify-center">
                <div className="card eevee animated"></div>
              </div>
              <div className="flex justify-center">
                <div className="card mewtwo animated"></div>
              </div>
              <div className="flex justify-center">
                <div className="card levia animated"></div>
              </div>
              <div className="flex justify-center">
                <div className="card tortank animated"></div>
              </div>
              <div className="flex justify-center">
                <div className="card flori animated"></div>
              </div>
              <div className="flex justify-center">
                <div className="card deoxys animated"></div>
              </div>
            </div>
          </section>

          <section className="py-16 text-center text-white">
            <h2 className="text-3xl font-bold">Comment ça marche ?</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              Kollector's est votre compagnon idéal pour gérer vos collections de cartes. Scannez vos cartes, ajoutez-les à votre collection, et découvrez les cartes rares que vous n'avez pas encore. Utilisez notre application pour organiser vos collections, échanger des cartes avec d'autres collectionneurs et rester à jour avec les dernières sorties et événements.
            </p>
            <div className="mt-8">
              <Link href="/construction" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white">
                En savoir plus
              </Link>
            </div>
          </section>

          <section className="py-16 text-white bg-[#171925]">
  <div className="container mx-auto flex flex-wrap items-center justify-center space-y-8">
    <div className="w-full md:w-1/2 p-4 flex justify-center">
      <div className="card fonctionali animated"></div>
    </div>
    <div className="w-full md:w-1/2 p-4 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4">
      <h3 className="text-3xl font-bold text-hover-effect">Recherche</h3>
      <p className="mt-2 text-lg text-hover-effect">
        Description de la fonctionnalité 1. Détails supplémentaires sur cette fonctionnalité.
      </p>
      <p className="mt-2 text-lg text-hover-effect">
        Plus d'informations ici pour rendre le texte plus riche.
      </p>
    </div>
  </div>
</section>

<section className="py-16 text-white bg-[#171925]">
  <div className="container mx-auto flex flex-wrap items-center justify-center space-y-8">
    <div className="w-full md:w-1/2 p-4 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4 order-2 md:order-1">
      <h3 className="text-3xl font-bold text-hover-effect">Gestion de votre collection</h3>
      <p className="mt-2 text-lg text-hover-effect">
        Description de la fonctionnalité 2. Détails supplémentaires sur cette fonctionnalité.
      </p>
      <p className="mt-2 text-lg text-hover-effect">
        Information additionnelle.
      </p>
      <p className="mt-2 text-lg text-hover-effect">
        Plus de détails.
      </p>
    </div>
    <div className="w-full md:w-1/2 p-4 flex justify-center order-1 md:order-2">
      <div className="card fonctionali1 animated"></div>
    </div>
  </div>
</section>


          <section className="py-16 text-center text-white">
            <h2 className="text-3xl font-bold">Nos Futur licences !</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8">
              <div className="flex flex-col items-center">
                <div className="card licence animated"></div>
                <p className="mt-4 text-lg text-hover-effect">Description de la licence 1</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="card licence1 animated"></div>
                <p className="mt-4 text-lg text-hover-effect">Description de la licence 2</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="card licence2 animated"></div>
                <p className="mt-4 text-lg text-hover-effect">Description de la licence 3</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="card licence3 animated"></div>
                <p className="mt-4 text-lg text-hover-effect">Description de la licence 4</p>
              </div>
            </div>
          </section>

          <section className="py-16 text-center text-white">
            <h2 className="text-3xl font-bold">Télécharger notre application !</h2>
            <p className="mt-4 text-lg">Gérez votre collection de cartes Pokémon où que vous soyez.</p>
            <div className="mt-8">
              <Link href="/construction" className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white">
                Télécharger
              </Link>
            </div>
          </section>

          <section className="py-16 text-center text-white">
            <h2 className="text-3xl font-bold">Vidéos de Présentation</h2>
            <div className="video-grid px-4">
              <div className="w-full p-4">
                <div className="video-container">
                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/FQfBwSxqhVo?lazy=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
              <div className="w-full p-4">
                <div className="video-container">
                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/v-blzL0Q1oA?lazy=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
        </div>
      </ClientLayout>
    </RootLayout>
  );
}
