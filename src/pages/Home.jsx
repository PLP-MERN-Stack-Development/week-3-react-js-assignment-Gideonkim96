import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import Card from "../components/Card";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter(post => post.title.includes(query));

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Search posts..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(post => (
          <Card key={post.id} title={post.title}>
            <p>{post.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}