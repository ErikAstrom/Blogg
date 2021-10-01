import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Toolbar from "../components/Toolbar";
import imageUrlBuilder from "@sanity/image-url";

import { useState, useEffect } from "react";

export default function Home({ posts }) {
  const router = useRouter();
  const [mappedPosts, setMappedPosts] = useState([]);

  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: "sztfzzdp",
        dataset: "production",
      });

      setMappedPosts(
        posts.map((p) => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
          };
        })
      );
    } else {
      setMappedPosts([]);
    }
  }, [posts]);
  console.log(posts);

  return (
    <>
      <Toolbar />;<h1>Welcome To My Blog</h1>
      <h3>Recent Posts:</h3>
      <section>
        {mappedPosts.length ? (
          mappedPosts.map((p, index) => (
            <div
              onClick={() => router.push(`/post/${p.slug.current}`)}
              key={index}
            >
              <h3> {p.title} </h3>
              <img src={p.mainImage} />
            </div>
          ))
        ) : (
          <>No Posts Yet</>
        )}
      </section>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent('*[ _type == "post" ]');

  const url = `https://${process.env.SANITY_API}.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then((res) => res.json());

  if (!result.result || !result.result.length) {
    return {
      props: {
        posts: [],
      },
    };
  } else {
    return {
      props: {
        posts: result.result,
      },
    };
  }
};
