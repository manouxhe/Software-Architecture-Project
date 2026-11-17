import PostContainer from "@/components/PostContainer";

export default function Home(){
  return(
    <>
      <PostContainer
        username="usertest"
        pubdate="il y a 3j"
        academicyear="BA2"
        pubtag="Student life"
        pubtitle="Première pub sur notre site!"
        pubcontent="Bonjour à tous, voici la première publication sur notre site, n'hésitez pas à donner votre avis et à éventuellement corriger si c'est nécessaire."
        initialVotes={142}
      />
    </>
  );
}