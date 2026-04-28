import { addNews, deleteNews } from "../repositories/news.repository.js";

const ANNOUNCEMENTS_LIMITS = {
  titleMax: 500,
  contentMax: 10000,
};

export async function createAnnouncementService(data) {
  if (typeof data.caption !== "string" || typeof data.content !== "string") {
    throw new Error("invalid data");
  }

  const caption = data.caption.trim();
  const content = data.content.trim();

  if (!caption || !content) {
    throw new Error("title and content are required");
  }

  if (
    caption.length > ANNOUNCEMENTS_LIMITS.titleMax ||
    content.length > ANNOUNCEMENTS_LIMITS.contentMax
  ) {
    throw new Error("one or more values is too long");
  }

  await addNews({
    title: caption,
    content: content,
  });
}

export async function deleteAnnouncementService(id) {
  const parsedId = Number(id);

  if (parsedId <= 0 || !Number.isInteger(parsedId)) {
    throw new Error("invalid data");
  }

  await deleteNews(parsedId);
}
