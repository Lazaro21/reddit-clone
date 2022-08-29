import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useState } from "react";

import { GET_ALL_POSTS, GET_POSTS_BY_TOPIC } from "../graphql/queries";
import Post from "./Post";
import client from "../apollo-client";

type Props = {
	topic?: string;
};

const Feed = ({ topic }: Props) => {
	const { data, error } = !topic
		? useQuery(GET_ALL_POSTS)
		: useQuery(GET_POSTS_BY_TOPIC, { variables: { topic } });
	// const [data, setData] = useState([])

	// useEffect(() => {
	//     const getPosts = async () => {
	//         const data = await client.query({
	//             query: GET_ALL_POSTS
	//         })
	//         setData(data)
	//     }
	//     getPosts()
	// }, [])
    console.log(topic)
	console.log(error);

	const posts: Post[] = !topic
		? data?.getPostList
		: data?.getPostsListByTopic;
	// console.log(posts)

	return (
		<div className="mt-5 space-y-4">
			{posts?.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</div>
	);
};

export default Feed;
