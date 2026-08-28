"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { getCommunityPostsByEvent } from "@/data/communityPosts";
import { getProduct } from "@/data/products";
import { cn } from "@/lib/utils";
import type { CommunityPost } from "@/types";
import { AssetImage } from "@/components/media/AssetImage";
import { UserAvatar } from "@/components/media/UserAvatar";
import { FilterChip } from "@/components/ui/FilterChip";

const filters: Array<"全部" | CommunityPost["type"]> = ["全部", "晒物", "穿搭", "找搭子", "攻略", "现场"];

type EventCommunityFeedProps = {
  eventId: string;
};

export function EventCommunityFeed({ eventId }: EventCommunityFeedProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("全部");
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const posts = useMemo(() => {
    return getCommunityPostsByEvent(eventId).filter((post) => activeFilter === "全部" || post.type === activeFilter);
  }, [activeFilter, eventId]);

  return (
    <section className="mt-4">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {filters.map((filter) => (
          <FilterChip active={activeFilter === filter} key={filter} onClick={() => setActiveFilter(filter)}>
            {filter}
          </FilterChip>
        ))}
      </div>

      <div className="mt-4 grid gap-3">
        {posts.map((post) => {
          const linkedProduct = post.linkedProductId ? getProduct(post.linkedProductId) : undefined;
          const liked = likedIds.includes(post.id);
          return (
            <article className="card w-full p-4" key={post.id}>
              <div className="flex items-center gap-2">
                <UserAvatar className="h-8 w-8 text-xs" name={post.authorName} sizes="32px" />
                <span className="rounded-full bg-orange-50 px-2 py-1 text-[11px] font-black text-brand">{post.type}</span>
                <span className="text-xs font-semibold text-muted">{post.authorName}</span>
              </div>
              <h2 className="mt-3 text-base font-black leading-6 text-ink">{post.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{post.content}</p>
              {post.hasImage ? (
                <AssetImage
                  alt={post.type === "穿搭" ? "橙色应援 T 恤" : "五月天周边卡片"}
                  className="mt-3 h-36 rounded-2xl bg-white"
                  fallbackLabel={post.type === "穿搭" ? "应援服" : "限定卡"}
                  fallbackTone={post.type === "穿搭" ? "shirt" : "card"}
                  objectFit="cover"
                  objectPosition="center"
                  src={post.imagePath}
                  sizes="358px"
                />
              ) : null}
              {linkedProduct ? (
                <Link className="mt-4 block rounded-2xl bg-page p-3" href={`/products/${linkedProduct.id}`}>
                  <p className="text-xs font-bold text-muted">查看关联闲置</p>
                  <div className="mt-2 flex items-center gap-3">
                    <AssetImage
                      alt={linkedProduct.category === "clothing" ? "橙色应援 T 恤" : "五月天荧光棒"}
                      className="h-12 w-12 shrink-0 rounded-xl bg-white"
                      fallbackLabel="关联闲置"
                      fallbackTone={linkedProduct.category === "clothing" ? "shirt" : "glowstick"}
                      objectFit={linkedProduct.category === "glowstick" ? "contain" : "cover"}
                      objectPosition="center"
                      src={linkedProduct.imagePath}
                      sizes="48px"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="min-w-0 truncate text-sm font-black text-ink">{linkedProduct.title}</p>
                      <p className="mt-0.5 text-sm font-black text-brand">¥{linkedProduct.price} &gt;</p>
                    </div>
                  </div>
                </Link>
              ) : null}
              <div className="mt-4 flex items-center gap-4 text-xs font-bold text-muted">
                <button
                  className={cn("inline-flex items-center gap-1", liked && "text-brand")}
                  type="button"
                  onClick={() => setLikedIds((current) => (liked ? current.filter((id) => id !== post.id) : [...current, post.id]))}
                >
                  <Heart size={15} fill={liked ? "currentColor" : "none"} />
                  {post.likes + (liked ? 1 : 0)} 赞
                </button>
                <button className="inline-flex items-center gap-1" type="button">
                  <MessageCircle size={15} />
                  {post.comments} 评论
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
