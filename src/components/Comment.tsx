import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from './Avatar'

import styles from './Comment.module.css'

interface CommentProps{
    content: string;
    onDeleteComment: (comment: string) => void;
}


export function Comment({content, onDeleteComment}: CommentProps){
    const [likeCount, setLikeCount] = useState(0)

    function handleDeleteComment(){
        onDeleteComment(content)
    }

    function handleLikeCount(){
        setLikeCount((state) => {
            return state + 1
        })
    }

    return(
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/joaowictorzanin.png"/>
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>João Zanin</strong>
                            <time title="9 de Junho às 10:22" dateTime="2022-06-09 10:22:52">Cerca de 1h atrás</time>
                        </div>

                        <button onClick={handleDeleteComment} title='Deletar comentario'>
                            <Trash size={24}/>
                        </button>
                    </header>
                    <p>{content}</p>
                </div>
                
                <footer>
                    <button onClick={handleLikeCount}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span> 
                    </button>
                    
                </footer>
            </div>
        </div>
    )
}