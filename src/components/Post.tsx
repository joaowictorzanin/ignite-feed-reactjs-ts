import { ChangeEvent, FormEvent, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Comment } from './Comment'
import { Avatar} from './Avatar'

import styles from './Post.module.css'

interface Author{
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content{
    type: 'paragraph' | 'link'
    content: string;
}

export interface PostProps{
    author: Author;
    content: Content[];
    publishedAt: Date;
}

export function Post({author, content, publishedAt}: PostProps){
    const [comment, setComment] = useState<any[]>([])
    const [newCommentText, setNewCommentText] = useState('')

    const publishedTime = format(publishedAt, "d 'de' LLLL 'as' HH:mm'h'", {
        locale: ptBR,
    })

    const publishedTimeRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })
    function handleCreateComment(event: FormEvent) {
        event.preventDefault()
        setComment([...comment, newCommentText])
        setNewCommentText('')
    }

    function handleNewComment(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    function handleInvalidComment(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    function deleteComment(commentToDelete: string){
        const commentWithoutDeleteOne = comment.filter(comment => {
            return (comment !== commentToDelete)
        })
        setComment(commentWithoutDeleteOne)
    }

    const isNewCommentEmpty = newCommentText.length == 0

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl}/>
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedTime} dateTime={publishedAt.toISOString()}>{publishedTimeRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if(line.type == 'paragraph'){
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type == 'link'){
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })

                }             
            </div>

            <form onSubmit={handleCreateComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                    name='comment' 
                    placeholder='Deixe seu comentario' 
                    onChange={handleNewComment}
                    value={newCommentText}
                    onInvalid={handleInvalidComment}
                    required
                />
                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {
                    comment.map(comment => {
                        return (
                            <Comment 
                                key={comment} 
                                content={comment}
                                onDeleteComment={deleteComment}
                            />
                        )
                    })
                }
            </div>
        </article>
    )
}