import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import apiApikiPost from '../../API/apiApikiPost';
import Loading from '../../pages/Loading/Loading';

const Post = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    apiApikiPost(slug)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="">
      <img
        className=""
        src={
          data[0]._embedded['wp:featuredmedia'][0].media_details.sizes.large
            .source_url
        }
        alt=""
      />
      <h1 className="">{data[0].title.rendered}</h1>
      <article
        className=""
        dangerouslySetInnerHTML={{ __html: data[0].content.rendered }}
      />
    </div>
  );
};

export default Post;