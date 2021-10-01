import { useState, useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";
import styles from "../../styles/post.module.css";
import BlockContent from "@sanity/block-content-to-react";
import Toolbar from "../../components/Toolbar";

export const Post = ({ title, body, image }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: "sztfzzdp",
      dataset: "production",
    });

    setImageUrl(imgBuilder.image(image));
  }, [image]);

  return (
    <>
      <Toolbar />
      <div className={styles.main}>
        <h1> {title}</h1>
        {imageUrl && <img src={imageUrl} className={styles.mainImage} />}
        <div className={styles.body}>
          <BlockContent blocks={body} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (pageContect) => {
  const pageSlug = pageContect.query.slug;

  if (!pageSlug) {
    return {
      notFound: true,
    };
  }

  const query = encodeURIComponent(
    `*[ _type == "post" && slug.current == "${pageSlug}"]`
  );
  const url = `https://${process.env.SANITY_API}.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then((res) => res.json());

  const post = result.result[0];

  if (!post) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        body: post.body,
        title: post.title,
        image: post.mainImage,
      },
    };
  }
};
export default Post;
