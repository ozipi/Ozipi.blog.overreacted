import Link from "./Link";
import Color from "colorjs.io";
import { metadata, getPosts } from "./posts";
import { display, sans } from "./fonts";
import TechIcons from "./components/TechIcons";

export { metadata };

export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="relative max-w-[1100px] mx-auto">
      {/* Posts grid */}
      <div className="flex flex-col gap-12">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            className="group block relative"
            href={"/" + post.slug + "/"}
            style={{
              animation: `fade-in-up 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            <article className="relative p-8 rounded-2xl bg-gradient-to-br from-[--bg-secondary] to-[--bg-tertiary] border border-[--bg-tertiary] hover:border-[--accent-primary]/30 transition-all duration-500 overflow-hidden group-hover:shadow-2xl group-hover:shadow-[--accent-primary]/10">
              {/* Gradient accent bar */}
              <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-[--accent-gradient-start] to-[--accent-gradient-end] group-hover:h-full transition-all duration-500 ease-out"></div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[--accent-primary]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <PostTitle post={post} />
                <PostMeta post={post} />
                <PostSubtitle post={post} />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

function PostTitle({ post }) {
  let accentStart = new Color("#6366f1");
  let accentEnd = new Color("#06b6d4");
  let accentRange = accentStart.range(accentEnd);
  let today = new Date();
  let timeSinceFirstPost = (today - new Date(2018, 10, 30)).valueOf();
  let timeSinceThisPost = (today - new Date(post.date)).valueOf();
  let staleness = timeSinceThisPost / timeSinceFirstPost;

  return (
    <div className="flex items-start gap-4 mb-4">
      <h2
        className={[
          display.className,
          "text-4xl sm:text-5xl font-bold leading-tight tracking-tight",
          "text-[--accentColor] group-hover:scale-[1.01] transition-transform duration-300",
        ].join(" ")}
        style={{
          "--accentColor": accentRange(staleness * 0.7).toString(),
        }}
      >
        {post.title}
      </h2>
      {post.technologies && (
        <div className="flex-shrink-0 pt-2">
          <TechIcons technologies={post.technologies} />
        </div>
      )}
    </div>
  );
}

function PostMeta({ post }) {
  return (
    <div className={`${sans.className} flex items-center gap-3 text-sm text-[--text-tertiary] mb-4`}>
      <time className="font-medium">
        {new Date(post.date).toLocaleDateString("en", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </time>
      <span className="w-1 h-1 rounded-full bg-[--text-tertiary]"></span>
      <span className="font-medium">{post.readTimeMinutes} min read</span>
    </div>
  );
}

function PostSubtitle({ post }) {
  return (
    <p className={`${sans.className} text-lg text-[--text-secondary] leading-relaxed group-hover:text-[--text-primary] transition-colors duration-300`}>
      {post.spoiler}
    </p>
  );
}
