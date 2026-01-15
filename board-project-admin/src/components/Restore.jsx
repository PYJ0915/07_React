import React, { useEffect, useState } from "react";
import { axiosApi } from "../api/axiosAPI";

export default function Restore() {
  const [withdrawnMembers, setwithdrawnMembers] = useState(null); // 탈퇴 회원 목록

  // 삭제 게시글 목록 상태
  const [deleteBoards, setDeleteBoards] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  // 탈퇴한 회원 목록 조회용 함수
  const getWithdrawnMemberList = async () => {
    try {

      const resp = await axiosApi.get("/admin/withdrawnMemberList");

      if (resp.status == 200) {
        setwithdrawnMembers(resp.data);
      }

    } catch (error) {
      console.error("탈퇴 회원 목록 조회 중 에러 발생 : ", error);
    }
  }

  // 탈퇴한 회원 복구 요청 함수
  const restoreMember = async (member) => {
    if(!window.confirm(member.memberNickname + "님을 탈퇴 복구 시키시겠습니까?")) return;

    try {
      
      const resp = await axiosApi.put("/admin/restoreMember", { memberNo : member.memberNo })

      if(resp.status == 200) {
        alert("복구 완료!");
        getWithdrawnMemberList();
      }
      
    } catch (error) {
      console.error("탈퇴 회원 복구 중 에러 발생 : ", error);
    }
  }

  // 삭제된 게시글 목록 조회용 함수
  const selectDeleteBoardList = async () => {
    try {

      const resp = await axiosApi.get("/admin/deleteBoardList");

      if (resp.status == 200) {
       setDeleteBoards(resp.data);
      }

    } catch (error) {
      console.error("삭제된 게시글 목록 조회 중 에러 발생 : ", error);
    }
  }

  // 삭제된 게시글 복구 요청 함수
  const restoreBoard = async (board) => {
    if(!confirm(board.boardNo + "번 게시글을 복구하시겠습니까?")) return;

    try {
      
      const resp = await axiosApi.put("/admin/restoreBoard", { boardNo : board.boardNo })

      if(resp.status == 200) {
        alert("복구 완료!");
        selectDeleteBoardList();
      }

    } catch (error) {
      console.error("삭제된 게시글 복구 중 에러 발생 : ", error);
    }
  }

  // Restore 컴포넌트가 첫 마운트될 때 실행
  useEffect(() => {
    getWithdrawnMemberList();
    selectDeleteBoardList();
  }, [])

  useEffect(() => {

    if (withdrawnMembers != null && deleteBoards != null) {
      setIsLoading(false);
    }

  }, [withdrawnMembers, deleteBoards]);

  if (isLoading) {

    return <h1>Loading...</h1>

  } else {

    return (
      <div className="menu-box">
        <section className="section-border">
          <h2>탈퇴 회원 복구</h2>

          <h3>탈퇴한 회원 목록</h3>

          {withdrawnMembers.length === 0 ? (<p>탈퇴한 회원이 없습니다.</p>) : (
            withdrawnMembers.map((member, index)=>{
              return (
                <ul className="ul-board" key={index}>
                  <li>회원 번호 : {member.memberNo}</li>
                  <li>회원 이메일 : {member.memberEmail}</li>
                  <li>회원 닉네임 : {member.memberNickname}</li>
                  <button className="retoreBtn" onClick={() => restoreMember(member)}>복구</button>
                </ul>
              )
            })
          )}

        </section>

        <section className="section-border">
          <h2>삭제 게시글 복구</h2>

          <h3>삭제된 게시글 목록</h3>

          {deleteBoards.length === 0 ? (<p>삭제된 게시글이 존재하지 않습니다.</p>) : (
            deleteBoards.map((board, index) => (
              <ul className="ul-board" key={index}>
                <li>게시글 번호 : {board.boardNo}</li>
                <li>게시글 제목 : {board.boardTitle}</li>
                <li>게시글 작성일 : {board.boardWriteDate}</li>
                <button className="restoreBtn" onClick={() => restoreBoard(board)}>복구</button>
              </ul>
            ))
          )}

        </section>
      </div>
    );

  }

}
