/* eslint-disable import/no-unresolved, import/extensions, quotes, semi, comma-dangle */
import { getAuthToken } from "./utils/authorization";

const BASE_URL = "https://student-json-api.lidemy.me";

export const getLatestPosts = () =>
  fetch(`${BASE_URL}/posts?_sort=createdAt&_order=DESC&_limit=4`).then((res) =>
    res.json()
  );

export const getPosts = (page) =>
  fetch(
    `${BASE_URL}/posts?_sort=createdAt&_order=DESC&_start=${
      (page - 1) * 5
    }&_limit=5`
  ).then((res) => res.json());

export const getAllPosts = () =>
  fetch(`${BASE_URL}/posts`).then((res) => res.json());

export const getPost = (id) =>
  fetch(`${BASE_URL}/posts/${id}?_expand=user`).then((res) => res.json());

export const registerOrLogin = (username, password, nickname) => {
  let requestBody = {
    username,
    password,
  };

  let url = `${BASE_URL}/login`;

  if (nickname) {
    requestBody = {
      ...requestBody,
      nickname,
    };
    url = `${BASE_URL}/register`;
  }

  return fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }).then((res) => res.json());
};

export const getMe = () =>
  fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: getAuthToken(),
    },
  }).then((res) => res.json());

export const createPost = (title, body) =>
  fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: getAuthToken(),
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
