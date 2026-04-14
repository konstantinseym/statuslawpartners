import {
  ANNOUNCEMENT_VALIDATION_RULES,
  CAPTIONS_VALIDATION_RULES,
  CONTACTS_VALIDATION_RULES,
} from "./validationrules.js";

///////////////////
// ANNOUNCEMENTS //
///////////////////

export function validateFormAddAnnouncement(values) {
  const caption = values.caption.trim();
  const content = values.content.trim();

  if (!caption || !content) {
    return "Все поля должны быть заполнены";
  }

  if (caption.length < ANNOUNCEMENT_VALIDATION_RULES.captionMin) {
    return (
      "Заголовок должен быть больше " +
      ANNOUNCEMENT_VALIDATION_RULES.captionMin +
      " символов."
    );
  }

  if (caption.length > ANNOUNCEMENT_VALIDATION_RULES.captionMax) {
    return (
      "Заголовок должен быть меньше " +
      ANNOUNCEMENT_VALIDATION_RULES.captionMax +
      " символов."
    );
  }

  if (content.length < ANNOUNCEMENT_VALIDATION_RULES.contentMin) {
    return (
      "Текст должен быть больше " +
      ANNOUNCEMENT_VALIDATION_RULES.contentMin +
      " символов"
    );
  }
  if (content.length > ANNOUNCEMENT_VALIDATION_RULES.contentMax) {
    return (
      "Текст должен быть меньше " +
      ANNOUNCEMENT_VALIDATION_RULES.contentMax +
      " символов"
    );
  }

  return null;
}

//////////////
// CAPTIONS //
//////////////

export function validateFormUpdateCaptions(values) {
  const heroMajor = values.heroMajor.trim();
  const heroMinor = values.heroMinor.trim();
  const newsCaption = values.newsCaption.trim();
  const employeesCaption = values.employeesCaption.trim();
  const detailsCaption = values.detailsCaption.trim();
  const contactsCaption = values.contactsCaption.trim();

  if (
    !heroMajor ||
    !heroMinor ||
    !newsCaption ||
    !employeesCaption ||
    !detailsCaption ||
    !contactsCaption
  ) {
    return "Все поля должны быть заполнены";
  }

  if (heroMajor.length > CAPTIONS_VALIDATION_RULES.heroMajorMax) {
    return (
      "Заголовок должен быть меньше " +
      CAPTIONS_VALIDATION_RULES.heroMajorMax +
      " символов"
    );
  }

  if (heroMinor.length > CAPTIONS_VALIDATION_RULES.heroMinorMax) {
    return (
      "Подаголовок должен быть меньше " +
      CAPTIONS_VALIDATION_RULES.heroMinorMax +
      " символов"
    );
  }

  if (newsCaption.length > CAPTIONS_VALIDATION_RULES.newsCaptionMax) {
    return (
      "Название раздела публикаций должно быть меньше " +
      CAPTIONS_VALIDATION_RULES.newsCaptionMax +
      " символов"
    );
  }

  if (employeesCaption.length > CAPTIONS_VALIDATION_RULES.employeesCaptionMax) {
    return (
      "Название раздела сотрудников должно быть меньше " +
      CAPTIONS_VALIDATION_RULES.employeesCaptionMax +
      " символов"
    );
  }

  if (detailsCaption.length > CAPTIONS_VALIDATION_RULES.detailsCaptionMax) {
    return (
      "Название раздела реквизитов должно быть меньше " +
      CAPTIONS_VALIDATION_RULES.detailsCaptionMax +
      " символов"
    );
  }

  if (contactsCaption.length > CAPTIONS_VALIDATION_RULES.contactsCaptionMax) {
    return (
      "Название раздела контактов должно быть меньше " +
      CAPTIONS_VALIDATION_RULES.contactsCaptionMax +
      " символов"
    );
  }

  return null;
}

//////////////
// CONTACTS //
//////////////

export function validateFormUpdateContacts(values) {
  const majorCaption = values.majorCaption;
  const minorCaptions = [...values.minorCaptions];

  if (!majorCaption) {
    return "Основное поле должно быть заполнено";
  }

  if (majorCaption.length > CONTACTS_VALIDATION_RULES.majorCaptionMax) {
    return (
      "Основное поле должно быть меньше " +
      CAPTIONS_VALIDATION_RULES.majorCaptionMax +
      " символов"
    );
  }

  for (let i = 0; i < minorCaptions.length; i++) {
    const value = minorCaptions[i].value;

    if (!value) {
      return "Дополнительное поле №" + (i + 1) + " должно быть заполнено";
    }

    if (value.length > CONTACTS_VALIDATION_RULES.minorCaptionsMax) {
      return (
        "Дополнительное поле №" +
        (i + 1) +
        " должно быть меньше" +
        CONTACTS_VALIDATION_RULES.minorCaptionsMax +
        "символов"
      );
    }
  }

  return null;
}
