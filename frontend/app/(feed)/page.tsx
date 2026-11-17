import PostContainer from "@/components/PostContainer";

export default function Home(){
  return(
    <>
      <PostContainer
        username="usertest"
        pubdate="il y a 3j"
        academicyear="BA2"
        pubtag="Student life"
        pubtitle="Titre de la pub"
        pubcontent="Contenu de la pub"
        initalVotes={142}
      />
    </>
  );
}