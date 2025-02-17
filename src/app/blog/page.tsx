import { notFound } from "next/navigation";
import { getPageBySlug } from "@/data/loaders";

import { BlockRenderer } from "@/components/BlockRenderer";
import { BlogCard } from "@/components/BlogCard";
import { ContentList } from "@/components/ContentList";

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  if (data.length === 0)
    notFound();
  return { blocks: data[0]?.blocks };
}

interface PageProps {
  searchParams: Promise<{ page?: string; query?: string }>
}

export default async function BlogRoute({ searchParams } : PageProps) {

  const { page, query } = await searchParams;
  const { blocks } = await loader("blog");

  return (
    <div className="blog-page">
      <BlockRenderer blocks={blocks} />
      <ContentList
        headline="Here are our latest articles"
        path="/api/articles"
        component={BlogCard}
        showSearch
        query={query}
        showPagination
        page={page}
      />
    </div>);
}