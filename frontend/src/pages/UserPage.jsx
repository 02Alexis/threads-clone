import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import useShowToast from "../hooks/useShowToast";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
      }
    };
    getUser();
  }, [username, showToast]);

  if (!user) return null;

  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={200}
        replies={489}
        postImg="/post1.jpg"
        postTitle="hablemos de hilos."
      />
      <UserPost
        likes={145}
        replies={35}
        postImg="/post2.jpg"
        postTitle="Me encanta este café."
      />
      <UserPost
        likes={234}
        replies={89}
        postImg="/post3.png"
        postTitle="Generado por IA."
      />
    </>
  );
};

export default UserPage;
