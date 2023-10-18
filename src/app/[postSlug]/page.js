import React from "react";

import BlogHero from "@/components/BlogHero";
import { compileMDX } from "next-mdx-remote/rsc";
import styles from "./postSlug.module.css";
import CodeSnippet from "@/components/CodeSnippet";
import { getBlogPostList, loadBlogPost } from "@/helpers/file-helpers";

export async function generateStaticParams() {
	const blogpostList = await getBlogPostList();
	const slug = blogpostList.map((blogpost) => {
		return {
			slug: blogpost.slug,
		};
	});
	return slug;
}

async function BlogPost({ params }) {
	const { postSlug } = params;
	const blogPost = await loadBlogPost(postSlug);
	const { frontmatter } = blogPost;
	const { content } = await compileMDX({
		source: blogPost.content,
		components: {
			pre: CodeSnippet,
		},
	});

	return (
		<article className={styles.wrapper}>
			<BlogHero
				title={frontmatter.title}
				publishedOn={frontmatter.publishedOn}
			/>
			<div className={styles.page}>{content}</div>
		</article>
	);
}

export default BlogPost;
