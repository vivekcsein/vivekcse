import type { Metadata } from "next";
import { BookmarksList } from "@/components/features/articles/BookmarksList";
import { Icon } from "@/components/ui";

export const metadata: Metadata = {
  title: "Bookmarks",
  robots: { index: false },
};

const BookmarksPage = () => (
  <div className="container-page animate-fade-up py-8">
    <header className="mb-6 flex items-start gap-4">
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
        <Icon name="bookmark" size={24} />
      </span>
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Bookmarks
        </h1>
        <p className="mt-2 text-muted-foreground">
          Articles you saved, stored in this browser only.
        </p>
      </div>
    </header>
    <BookmarksList />
  </div>
);

export default BookmarksPage;
