/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Menu,
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronRight,
  MapPin,
  Flame,
  Star,
  Award,
} from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen text-neutral-800 font-sans selection:bg-[#F2863B] selection:text-white bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex">
        {/* Backgrounds */}
        <div className="absolute inset-0 flex pointer-events-none z-0">
          <div className="w-full md:w-[40%] bg-[#1E1E1E]"></div>
          <div className="hidden md:block w-[60%] bg-[#F9F9F9]"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col md:flex-row h-full">
          {/* Left Column (Dark) */}
          <div className="w-full md:w-[40%] flex flex-col pt-8 px-6 md:px-12 text-white h-full relative">
            {/* Nav Left */}
            <div className="flex items-center gap-6 md:gap-10 tracking-widest text-[#A0A0A0] text-[10px] font-bold uppercase">
              <button className="text-white hover:text-[#F2863B] transition-colors">
                <Menu className="w-6 h-6" />
              </button>
              <a href="#about" className="hover:text-white transition-colors">
                О нас
              </a>
              <a href="#catalog" className="hover:text-white transition-colors">
                Каталог
              </a>
              <a href="#contacts" className="hover:text-white transition-colors">
                Контакты
              </a>
            </div>

            {/* Brand Logo inside hero if mobile, or just standard text */}
            <div className="block md:hidden mt-12 mb-4">
               <h2 className="text-3xl font-black tracking-widest">НОМОХ</h2>
               <p className="text-[10px] tracking-widest text-neutral-400">ЯКУТСКИЕ ИЗДЕЛИЯ</p>
            </div>

            {/* Hero Text */}
            <div className="mt-auto mb-auto md:pr-12 md:pb-32">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
                Традиции,<br />
                скованные<br />
                в металл
              </h1>
              <p className="text-[#A0A0A0] text-sm leading-relaxed max-w-sm mb-10">
                Якутские ножи и изделия ручной работы — в лучших традициях
                сибирских мастеров. Доставка в любую точку мира.
              </p>
              <a href="#catalog" className="inline-flex bg-white text-black text-xs font-bold uppercase tracking-widest py-4 px-8 hover:bg-[#F2863B] hover:text-white transition-all items-center gap-3">
                Перейти в каталог
              </a>
            </div>
          </div>

          {/* Right Column (Light) */}
          <div className="w-full md:w-[60%] flex flex-col pt-8 px-6 md:px-12 h-[50vh] md:h-full relative overflow-hidden md:overflow-visible">
            {/* Nav Right */}
            <div className="hidden md:flex items-center justify-end gap-6 text-neutral-400">
              <button className="hover:text-black transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="hover:text-black transition-colors relative">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-2 bg-neutral-200 text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="hover:text-black transition-colors relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-2 bg-[#F2863B] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  4
                </span>
              </button>
              <button className="hover:text-black transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>

            {/* Main Hero Image */}
            <div className="absolute inset-0 md:inset-auto md:top-[15%] md:bottom-[15%] md:left-0 md:right-12 z-0 md:shadow-2xl flex items-center justify-center md:justify-end bg-neutral-100 md:bg-transparent">
              <img
                src="https://images.unsplash.com/photo-1620023447990-2bd394fcd60b?auto=format&fit=crop&q=80&w=1200"
                alt="Yakut Knives"
                className="w-full h-full object-cover md:h-auto md:max-h-full md:object-contain object-right"
              />
            </div>

            {/* Orange Highlight Box */}
            <div className="absolute bottom-0 right-0 md:right-12 w-full md:w-3/5 bg-[#F2863B] p-6 md:p-8 text-white flex items-center justify-between z-20">
              <div>
                <h3 className="font-bold text-base md:text-lg mb-1">
                  Нож из якутской стали Н003
                </h3>
                <p className="text-white/80 text-[10px] md:text-xs">
                  Твердость клинка, HRC: 62-64
                  <br />
                  Ножны (чехол): кожа
                </p>
              </div>
              <button className="bg-white text-[#F2863B] p-3 hover:bg-neutral-100 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-20 md:py-32 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 md:gap-0">
          {/* Left Block */}
          <div className="w-full md:w-[40%] flex flex-col justify-center relative md:pr-16">
            <div className="w-2 h-12 bg-[#F2863B] absolute left-0 md:left-6 rounded-sm"></div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 pl-6 md:pl-12 leading-tight">
              Много лет считалось, что уникальный способ производства стали давно
              утерян.
            </h2>
            <div className="pl-6 md:pl-12 text-neutral-500 space-y-4 text-sm leading-relaxed">
              <p>Якутским мастерам удалось восстановить его.</p>
              <p>
                Старинные рецепты и возможности современных технологий дали
                уникальный результат. Истинно народные изделия, сочетающие в
                себе дух предков и надежность.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-[60%]">
            <img
              src="https://images.unsplash.com/photo-1576023612845-a7b218bd7bb5?auto=format&fit=crop&q=80&w=1000"
              alt="Damascus Steel"
              className="w-full h-64 md:h-full object-cover min-h-[300px] md:min-h-[400px] shadow-sm transform hover:scale-[1.01] transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-[#303030] py-16 md:py-24 text-white relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <h2 className="text-xl md:text-2xl font-bold mb-10 md:mb-0 md:w-[40%] text-center md:text-left">
            Уникальность нашей продукции:
          </h2>

          <div className="flex flex-col md:flex-row mt-4 md:mt-2">
            {/* Orange Feature Box */}
            <div className="md:w-[25%] bg-[#F2863B] p-8 md:p-12 md:-mt-32 md:ml-[15%] z-10 shadow-xl mb-12 md:mb-0 flex flex-col items-center text-center">
              <Flame className="w-10 h-10 mb-6 text-white" strokeWidth={1.5} />
              <h4 className="text-base md:text-lg font-medium leading-snug">
                Старинные методы ковки и плавки стали
              </h4>
            </div>

            {/* Other Features */}
            <div className="md:w-[60%] flex flex-col sm:flex-row md:ml-auto items-center justify-around gap-12 py-4 px-4">
              <div className="flex flex-col items-center text-center">
                <Award
                  className="w-10 h-10 mb-5 text-neutral-400 font-light"
                  strokeWidth={1.2}
                />
                <h4 className="text-sm text-neutral-300 font-medium">
                  Высокое качество
                </h4>
              </div>
              <div className="flex flex-col items-center text-center">
                <Star
                  className="w-10 h-10 mb-5 text-neutral-400 font-light"
                  strokeWidth={1.2}
                />
                <h4 className="text-sm text-neutral-300 font-medium">
                  Эксклюзивный дизайн
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories / Catalog Section */}
      <section id="catalog" className="w-full bg-[#f4f4f4] relative">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row">
          {/* Title Row */}
          <div className="w-full md:w-[25%] flex flex-col">
            <div className="bg-[#F2863B] h-24 md:h-48 flex items-center px-8 md:px-10 text-white text-xl md:text-2xl font-bold">
              Наш каталог
            </div>
            <div className="hidden md:block flex-1 border-r border-neutral-200"></div>
          </div>

          {/* Grid Layout */}
          <div className="w-full md:w-[75%] grid grid-cols-1 sm:grid-cols-2">
            {/* Category 1 */}
            <a
              href="#"
              className="group relative overflow-hidden bg-black aspect-[4/3] sm:aspect-[16/10] flex"
            >
              <img
                src="https://images.unsplash.com/photo-1582239401738-95ef87d2efd4?auto=format&fit=crop&q=80"
                alt="Ножи"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all group-hover:scale-105 duration-700"
              />
              <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 w-full h-full">
                <h3 className="text-white text-lg md:text-xl font-bold tracking-wide mb-3 uppercase">
                  Ножи сувенирные и практичные
                </h3>
                <p className="text-neutral-300 text-[10px] md:text-xs leading-relaxed max-w-[220px] mb-6">
                  В арсенале любого мужчины, будь то охотник, рыбак или турист.
                </p>
                <div className="w-10 h-[2px] bg-[#F2863B] mt-auto"></div>
              </div>
            </a>

            {/* Category 2 */}
            <a
              href="#"
              className="group relative overflow-hidden bg-white aspect-[4/3] sm:aspect-[16/10] flex"
            >
              <img
                src="https://images.unsplash.com/photo-1605335011985-2c8c46deefc7?auto=format&fit=crop&q=80"
                alt="Термопосуда"
                className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply transition-transform group-hover:scale-105 duration-700 object-right"
              />
              <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 w-full h-full bg-gradient-to-r from-white/90 to-transparent">
                <h3 className="text-neutral-900 text-lg md:text-xl font-bold tracking-wide mb-3 uppercase">
                  Термопосуда<br />
                  цена = качество
                </h3>
                <p className="text-neutral-600 text-[10px] md:text-xs leading-relaxed max-w-[220px] mb-6">
                  Надежная посуда, не заменимый атрибут для долгих походов.
                </p>
                <div className="w-10 h-[2px] bg-[#F2863B] mt-auto"></div>
              </div>
            </a>

            {/* Category 3 */}
            <a
              href="#"
              className="group relative overflow-hidden bg-[#EDEDED] aspect-[4/3] sm:aspect-[16/10] flex"
            >
              <img
                src="https://images.unsplash.com/photo-1520975618175-1facf0b484ba?auto=format&fit=crop&q=80"
                alt="Одежда"
                className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply transition-transform group-hover:scale-105 duration-700 object-left"
              />
              <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 w-full h-full bg-gradient-to-t from-white/80 to-transparent sm:bg-none">
                <h3 className="text-neutral-900 text-lg md:text-xl font-bold tracking-wide mb-3 uppercase mt-auto sm:mt-0">
                  Якутская одежда
                </h3>
                <p className="text-neutral-700 sm:text-neutral-600 text-[10px] md:text-xs leading-relaxed max-w-[220px] mb-6">
                  На каждый день и праздники. Утепленная и стильная.
                </p>
                <div className="w-10 h-[2px] bg-[#F2863B] mt-auto hidden sm:block"></div>
              </div>
            </a>

            {/* Category 4 */}
            <a
              href="#"
              className="group relative overflow-hidden bg-[#222] aspect-[4/3] sm:aspect-[16/10] flex"
            >
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80"
                alt="Украшения"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-transform group-hover:scale-105 duration-700"
              />
              <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 w-full h-full">
                <h3 className="text-white text-lg md:text-xl font-bold tracking-wide mb-3 uppercase">
                  Якутские украшения
                </h3>
                <p className="text-neutral-300 text-[10px] md:text-xs leading-relaxed max-w-[220px] mb-6">
                  Ручная работа, бусины, дэйбиир — традиция и уникальность в
                  каждой детали.
                </p>
                <div className="w-10 h-[2px] bg-[#F2863B] mt-auto"></div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="w-full bg-white py-12 md:py-20 border-b border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-center md:text-left border-y border-neutral-200 py-10 md:border-none md:py-0">
          <div className="md:w-3/5 md:pl-[15%] mb-6 md:mb-0">
            <h2 className="text-xl md:text-3xl font-bold md:mb-2">
              Хотите абсолютно эксклюзивное изделие?
            </h2>
            <p className="text-neutral-500 text-xs md:text-sm mt-2 md:mt-0">
              Напишите нам, и мы разработаем дизайн специально для вас.
            </p>
          </div>
          <div className="md:w-2/5 flex md:justify-end md:pr-[10%]">
            <a href="#contacts" className="bg-[#F2863B] text-white text-[10px] md:text-xs font-bold uppercase py-4 px-10 md:px-12 hover:bg-[#d96a23] transition-colors tracking-widest">
              Написать
            </a>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="w-full bg-[#f4f4f4] relative flex flex-col md:flex-row">
        {/* Left Block */}
        <div className="w-full md:w-[40%] flex flex-col">
          <div className="bg-[#F2863B] h-24 md:h-48 md:w-full flex items-center px-8 md:px-20 text-white text-xl md:text-2xl font-bold z-10">
            Дополнительные услуги
          </div>
          <div className="hidden md:block bg-[#333333] h-[300px] w-full mt-24 shadow-2xl relative left-6 md:left-12 skew-x-[-3deg] overflow-hidden opacity-90"></div>
        </div>

        {/* Right Rows */}
        <div className="w-full md:w-[60%] flex flex-col divide-y divide-[#555]">
          {/* Row 1 */}
          <div className="flex h-36 md:h-[180px] bg-[#666666] text-white overflow-hidden group">
            <div className="w-1/2 md:w-[60%] flex items-center px-6 md:px-16 text-xs md:text-sm font-medium tracking-wide leading-relaxed uppercase">
              Возможность исполнения рукояти из экзотических, дорогих пород дерева
            </div>
            <div
              className="w-1/2 md:w-[40%] bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1543884814-c1ea9b977717?auto=format&fit=crop&q=80')",
              }}
            ></div>
          </div>
          {/* Row 2 */}
          <div className="flex h-36 md:h-[180px] bg-[#444444] text-white overflow-hidden group">
            <div className="w-1/2 md:w-[60%] flex items-center px-6 md:px-16 text-xs md:text-sm font-medium tracking-wide uppercase">
              Подарочная упаковка
            </div>
            <div
              className="w-1/2 md:w-[40%] bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80')",
              }}
            ></div>
          </div>
          {/* Row 3 */}
          <div className="flex h-36 md:h-[180px] bg-[#A0A0A0] text-white overflow-hidden group">
            <div className="w-1/2 md:w-[60%] flex items-center px-6 md:px-16 text-xs md:text-sm font-medium tracking-wide uppercase">
              Возможность нанесения гравировки, золочения
            </div>
            <div
              className="w-1/2 md:w-[40%] bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1618193132174-8b652baabeb4?auto=format&fit=crop&q=80')",
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section
        id="contacts"
        className="w-full flex flex-col md:flex-row border-t border-[#EEE]"
      >
        {/* Form Left */}
        <div className="w-full md:w-[50%] py-16 md:py-24 px-6 md:px-[10%] lg:px-[15%] flex flex-col justify-center bg-white border-r border-[#EEEEEE]">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:pr-10">
            Хотите абсолютно эксклюзивное изделие?
          </h2>
          <p className="text-neutral-500 text-xs md:text-sm mb-10">
            Оставьте свою заявку и Мы перезвоним Вам через 5 минут!
          </p>

          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Ваше имя"
              className="border-b border-neutral-300 py-3 bg-transparent outline-none focus:border-[#F2863B] transition-colors placeholder-neutral-400 text-sm"
              required
            />
            <input
              type="tel"
              placeholder="Ваш телефон"
              className="border-b border-neutral-300 py-3 bg-transparent outline-none focus:border-[#F2863B] transition-colors placeholder-neutral-400 text-sm"
              required
            />

            <label className="flex items-start gap-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 accent-[#F2863B]"
                required
              />
              <span className="text-xs text-neutral-400">
                Согласен на обработку{" "}
                <a href="#" className="underline hover:text-neutral-600">
                  персональных данных
                </a>
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 bg-[#F2863B] text-white text-xs font-bold uppercase py-4 px-8 w-fit hover:bg-[#d96a23] transition-colors tracking-widest shadow-md hover:shadow-xl"
            >
              Оставить заявку
            </button>
          </form>
        </div>

        {/* Map Right */}
        <div className="w-full md:w-[50%] h-[350px] md:h-auto min-h-[400px] bg-neutral-200 relative order-first md:order-last">
          {/* Example Map using iframe pointing to Yakutsk */}
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=129.715367%2C62.030588&z=15"
            className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
            allowFullScreen
            loading="lazy"
            title="Map"
          ></iframe>
          {/* Floating Address Box */}
          <div className="absolute top-6 left-6 md:top-12 md:left-12 bg-white p-5 shadow-xl z-10 max-w-[280px]">
            <div className="font-bold mb-2 flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-[#F2863B]" /> Лермонтова 62/2г
            </div>
            <div className="text-xs text-neutral-500 leading-relaxed pl-6">
              Якутск, Россия, 677000
              <br />
              Магазин якутских изделий
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#333333] text-white py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-10 md:gap-0 items-start align-top justify-between">
          {/* Left Info */}
          <div className="flex flex-col gap-6 w-full md:w-1/2 lg:w-1/3">
            <a
              href="tel:+79244640888"
              className="text-2xl md:text-3xl font-bold hover:text-[#F2863B] transition-colors"
            >
              8 (924) 464-08-88
            </a>
            <div className="flex flex-wrap gap-4 md:gap-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#A0A0A0]">
              <a href="#about" className="hover:text-white transition-colors">
                О нас
              </a>
              <a href="#catalog" className="hover:text-white transition-colors">
                Каталог
              </a>
              <a href="#contacts" className="hover:text-white transition-colors">
                Контакты
              </a>
            </div>
            <div className="text-[#666] text-xs underline cursor-pointer hover:text-white mt-2 md:mt-8">
              Политика конфиденциальности
            </div>
          </div>

          {/* Right Info */}
          <div className="flex flex-col gap-4 items-start md:items-end w-full md:w-1/2 lg:w-1/3">
            <div className="font-black tracking-[0.2em] text-2xl md:text-3xl text-white">
              НОМОХ
            </div>
            <a
              href="https://wa.me/+79244640888"
              target="_blank"
              rel="noreferrer"
              className="text-[#888888] text-sm hover:text-white transition-colors"
            >
              wa.me/+79244640888
            </a>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://wa.me/+79244640888"
                target="_blank"
                rel="noreferrer"
                className="bg-[#242424] text-[#A0A0A0] p-2 hover:bg-[#F2863B] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-[#242424] text-[#A0A0A0] p-2 hover:bg-[#F2863B] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                   <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                   <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                   <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
            <div className="text-[#666] text-[10px] uppercase tracking-widest mt-2 md:mt-6">
              Разработка сайта
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

