import { motion } from "motion/react";
import Hero from "./components/Hero/Hero.jsx";
import MainLayout from "./components/MainLayout/MainLayout.jsx";
import Ftr from "./components/Ftr/Ftr.jsx";

export default function App() {
  const appData = {
    captions: {
      heroMajor: "Юридическое партнерство 'СТАТУС'",
      heroMinor:
        "Tantum possumus, quantum scimus (лат.) – мы можем столько, сколько знаем (Ф.Бэкон).",
      newsCaption: "Объявления",
      employeesCaption: "Адвокаты",
      detailsCaption: "Реквизиты",
      contactsCaption: "Контакты",
    },
    blocksContent: {
      detailsBlock: [
        "Юридический адрес: 305007, г. Курск, ул. Моковская, д. 11а, помещ. 208",
        "ОГРН: 1194600000011 ИНН: 4632249825 КПП: 463201001",
        "Управляющий партнер: Адвокат Телегин Руслан Евгеньевич (регистрационный номер 46/521 в реестре адвокатов Курской области), ИНН 463213679060",
      ],
      contactsBlock: {
        majorCaption: "Будем рады ответить на любые вопросы!",
        minorCaptions: [
          "Адрес: 305007, Курская область, г. Курск, ул. Моковская, д. 11а",
          "Телефон: +7 903 639 72 70",
          "e-mail: y.p.status@mail.ru",
        ],
      },
    },
    news: [
      {
        id: 1,
        date: "13.01.2025, 14:57",
        title: "Коллегия предупреждает об участившихся случаях мошенничества",
        content: "Content of the news number 1 Telegin Телегин",
      },
      {
        id: 2,
        date: "13.01.2025, 14:57",
        title: "У нас новый сайт",
        content: "У нас новый сайт",
      },
    ],
    employees: [
      {
        id: 1,
        imageUrl: "/data/images/656336264.jpg",
        imageAlt: "Фото Телегина Р.Е.",
        name: "Телегин Руслан Евгеньевич",
        post: "Адвокат, управляющий партнер",
      },
      {
        id: 2,
        imageUrl: "/data/images/28001200.png",
        imageAlt: "Фото Пятницкого К.С.",
        name: "Пятницкий Кирилл Сергеевич",
        post: "Адвокат, партнер",
      },
      {
        id: 3,
        imageUrl: "/data/images/38001200.png",
        imageAlt: "Фото Шелухина К.Ю.",
        name: "Шелухин Константин Юрьевич",
        post: "Адвокат, партнер",
      },
      {
        id: 4,
        imageUrl: "/data/images/48001200.png",
        imageAlt: "Фото Семенина К.Б.",
        name: "Семенин Константин Борисович",
        post: "Адвокат",
      },
    ],
    footerLink: {
      caption:
        "Политика Коллегии адвокатов «Юридическое Партнерство «Статус» Адвокатской палаты Курской области в отношении обработки персональных данных",
      link: "#",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.25, ease: "easeInOut" }}
    >
      <Hero
        heroMajor={appData.captions.heroMajor}
        heroMinor={appData.captions.heroMinor}
        heroButtons={[
          appData.captions.employeesCaption,
          appData.captions.detailsCaption,
        ]}
      />
      <MainLayout
        mainLayoutNewsCaption={appData.captions.newsCaption}
        mainLayoutEmployeesCaption={appData.captions.employeesCaption}
        mainLayoutDetailsCaption={appData.captions.detailsCaption}
        mainLayoutContactsCaption={appData.captions.contactsCaption}
        news={appData.news}
        employees={appData.employees}
        details={appData.blocksContent.detailsBlock}
        contacts={appData.blocksContent.contactsBlock}
      />
      <Ftr ftr={appData.footerLink} />
    </motion.div>
  );
}
