"use client";

import React from "react";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleSearchChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchText(input);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      const regex = new RegExp(searchText, "gi");
      const filteredPosts = data.filter(
        (post) =>
          regex.test(post.prompt) ||
          regex.test(post.creator.username) ||
          regex.test(post.tag)
      );
      setPosts(filteredPosts);
    };
    fetchPosts();
  }, [searchText]);

  return (
    <section className="feed">
      <form
        onSubmit={handleSearchSubmit}
        className="relative w-full flex-center"
      >
        <input
          text="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
