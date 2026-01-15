import React, { useEffect, useState } from "react";
import { axiosApi } from "../api/axiosAPI";

export default function Statistics() {

  const [readCountData, setReadCountData] = useState(null);
  const [likeCountData, setLikeCountData] = useState(null);
  const [commentCountData, setCommentCountData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 가장 조회수 많은 게시글
  const getMaxReadCount = async () => {
    // 직접 작성해보기

    try {

      const resp = await axiosApi.get("/admin/maxReadCount");

      if (resp.status == 200) {
        // 조회수 가장 많은 게시글 상태에 세팅
        setReadCountData(resp.data);
      }

    } catch (error) {
      console.error("최다 조회수 게시글 조회 중 예외 발생", error)
    }
  }

  // 가장 좋아요 많은 게시글
  const getMaxLikeCount = async () => {
    // 직접 작성해보기

    try {

      const resp = await axiosApi.get("/admin/maxLikeCount");

      if (resp.status == 200) {
        setLikeCountData(resp.data)
      }

    } catch (error) {
      console.error("최다 좋아요 게시글 조회 중 예외 발생", error)
    }


  }

  // 가장 댓글 많은 게시글
  const getMaxCommentCount = async () => {
    // 직접 작성해보기

    try {

      const resp = await axiosApi.get("/admin/maxCommentCount");

      if (resp.status == 200) {
        setCommentCountData(resp.data)
      }

    } catch (error) {
      console.error("최다 댓글 게시글 조회 중 예외 발생", error)
    }


  }

  // 컴포넌트가 처음 마운트 될 때 1번 실행
  useEffect(() => {
    getMaxReadCount();
    getMaxLikeCount();
    getMaxCommentCount();
  }, []); // 의존성 배열이 비어있기 때문에 1번만 실행됨.

  // readCountData, likeCountData, commentCountData
  useEffect(() => {

    if (readCountData != null && likeCountData != null && commentCountData != null) {
      setIsLoading(false);
    }
  }, [readCountData, likeCountData, commentCountData]);

  if (isLoading) {
    return <h1>Loading...</h1>
  } else {

    return (
      <div>
        <section className="statistics-section">
          <h2>가장 조회수 많은 게시글</h2>
          <p>게시판 종류 : {readCountData.boardName} </p>
          <p>게시판 번호/제목 : No.{readCountData.boardNo} / {readCountData.boardTitle}</p>
          <p>게시글 조회수 : {readCountData.readCount}</p>
          <p>작성자 닉네임 : {readCountData.memberNickname}</p>
        </section>

        <section className="statistics-section">
          <h2>가장 좋아요 많은 게시글</h2>
          <p>게시판 종류 : {likeCountData.boardName} </p>
          <p>게시판 번호/제목 : No.{likeCountData.boardNo} / {likeCountData.boardTitle}</p>
          <p>좋아요 수 : {likeCountData.likeCount}</p>
          <p>작성자 닉네임 : {likeCountData.memberNickname}</p>
        </section>

        <section className="statistics-section">
          <h2>가장 댓글 많은 게시글</h2>
          <p>게시판 종류 : {commentCountData.boardName} </p>
          <p>게시판 번호/제목 : No.{commentCountData.boardNo} / {commentCountData.boardTitle}</p>
          <p>댓글 수 : {commentCountData.commentCount}</p>
          <p>작성자 닉네임 : {commentCountData.memberNickname}</p>
        </section>
      </div>
    );
  }
}
