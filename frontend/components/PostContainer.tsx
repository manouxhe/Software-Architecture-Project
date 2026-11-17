import { useState, SubmitEvent } from "react";

export default function PostContainer() {
    // Title
    const [username, setUsername] = useState('');
    const [pubdate, setPubdate] = useState('');
    const [academicyear, setAcademicyear] = useState('');
    const [pubtag, setPubtag] = useState('');

    // Main content
    const [pubtitle, setPubtitle] = useState('');
    const [pubcontent, setPubcontent] = useState('');


    return(
        <div className="main-container">
            <div className="vote-zone">
                <span className="upvote-button"></span>
                <span className="vote-counter"></span>
                <span className="downvote-button"></span>
            </div>

            <div className="top-zone">
                <span className="user-pseudo">{username}</span>
                <span className="pub-date">{pubdate}</span>
                <span className="academic-year">{academicyear}</span>
                <span className="pub-tag">{pubtag}</span>
            </div>

            <div className="main-zone">
                <div className="pub-title">{pubtitle}</div>
                <div className="pub-content">{pubcontent}</div>
                <div className="pub-reaction">
                    {/*Ici il faut mettre les réactions */}
                </div>
            </div>

            <div className="action-button">
                <div className="modify-button">Modifier les catégories</div>
                <div className="delete-button">Supprimer l'idée</div>
            </div>

        </div>
    );
}