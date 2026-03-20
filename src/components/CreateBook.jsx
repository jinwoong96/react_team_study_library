import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContextPro";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [bookImageName, setBookImageName] = useState("");

  const fileInputRef = useRef(null);

  const navigator = useNavigate();
  const {currentUser} = useAuth();
  // const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!currentUser) {
      alert("로그인 후에 책 추가가 가능합니다");
      navigator("/login");
    }
  }, [currentUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBookImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setBookImage("");
    setBookImageName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit1 = (e) => {
    e.preventDefault();

    try {
      if (!title || !author || !content || !bookImage) {
        throw new Error("모든 정보를 입력해주세요.");
      }
    } catch (error) {
      alert(error.message);
      return;
    }

    let books = JSON.parse(localStorage.getItem("books")) || [];

    const newBook = {
      id: Date.now(),
      title,
      image: bookImage,
      username: currentUser.username,
      author,
      content,
      userid: currentUser.id,
      likes: [],
    };
    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));

    setTitle("");
    setAuthor("");
    setContent("");
    setBookImage("");

    navigator("/");
  };

  const cancel = () => {
    navigator("/");
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mt-5 ml-5 mb-5">책 추가하기</h1>
      <hr className="mb-8 mx-auto max-w-96 h-1 bg-gray-500" />
      <form onSubmit={onSubmit1}>
        <input
          className="bg-gray-100 p-2 w-1/3 rounded-md border border-gray-500"
          placeholder="제목을 입력하세요."
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          className="bg-gray-100 p-2 w-1/3 mt-2 rounded-md border border-gray-500"
          placeholder="작가"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        <textarea
          className="bg-gray-100 p-2 h-96 w-1/3 mt-2 rounded-md border border-gray-500"
          placeholder="내용"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />

        <div className="flex items-center justify-center mx-auto rounded-md border border-gray-500 bg-gray-100 w-1/4 h-40">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium"
          >
            <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
              <svg
                className="w-8 h-8 mt-5 mb-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-md text-gray-700">이미지 업로드</p>
              <p className="text-xs text-gray-500">
                클릭 또는 드래그하여 파일 선택
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            <br />
          </label>
        </div>

        {bookImageName && (
          <div className="flex items-center justify-center mt-2">
            <p className="text-sm text-gray-600">{bookImageName} 업로드 완료</p>
            <button type="button" onClick={() => {setBookImage("");
            setBookImageName("");
                if (fileInputRef.current) fileInputRef.current.value = ""; 
            }}
              className="ml-2 text-red-500 font-bold px-1 rounded hover:bg-gray-200">x
            </button>
          </div>
        )}

        <button
          type="submit"
          className="text-lg bg-blue-500 text-white px-6 py-1 rounded mt-5 mr-2 border border-gray-400"
        >
          추가
        </button>
        <button
          type="button"
          className="text-lg bg-red-500 text-white px-6 py-1 rounded mt-5 ml-2 border border-gray-400"
          onClick={cancel}
        >
          취소
        </button>
      </form>
    </div>
  );
};
export default CreateBook;
