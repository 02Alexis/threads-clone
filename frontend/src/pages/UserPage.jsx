import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return (
    <>
      <UserHeader />
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
