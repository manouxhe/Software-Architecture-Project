'use client'

import { useState, SubmitEvent } from "react";

interface PostProps {
    username: string;
    pubdate: string;
    academicyear: string;
    pubtag: string;
    pubtitle: string;
    pubcontent:string;
    initalVotes: number;
}

export default function PostContainer({username, pubdate, academicyear, pubtag, pubtitle, pubcontent, initalVotes}: PostProps) {
    //Votes
    const [votes, setVotes] = useState(initalVotes);
    const [uservote, setUservote] = useState(null);

    //réactions 
    const [like, setLike] = useState(0);
    const [love, setLove] = useState(0);
    const [light, setLight] = useState(0);
    const [party, setParty] = useState(0);

    const isAdmin = useState(true);


    return(
        <article className="main-container">
            <div className="vote-zone">
                <span className="upvote-button"></span>
                <span className="vote-counter"></span>
                <span className="downvote-button"></span>
            </div>

            <div className="right-zone">
                <div className="top-zone">
                    <span className="user-pseudo">{username}</span>
                    <span className="pub-date">{pubdate}</span>
                    <span className="academic-year">{academicyear}</span>
                    <span className="pub-tag">{pubtag}</span>
                </div>

                <div className="main-zone">
                    <h1 className="pub-title">{pubtitle}</h1>
                    <h2 className="pub-content">{pubcontent}</h2>
                    <div className="pub-reaction">
                        {/*Ici il faut mettre les réactions */}
                    </div>
                </div>

                <div className="action-button">
                    <button type="button" className="modify-button">Modifier les catégories</button>
                    <button type="button" className="delete-button">Supprimer l'idée</button>
                </div>
            </div>

        </article>
    );
}