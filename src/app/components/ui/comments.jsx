import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddComment } from "../common/comments";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
    const { createComment, comments, removeComment } = useComments();

    const handleSubmit = (data) => {
        // api.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments([...comments, data]));
        createComment(data);
    };
    const handleRemoveComment = (id) => {
        removeComment(id);
    };
    useEffect(() => {}, [comments]);
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddComment onSubmit={handleSubmit} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    <CommentsList
                        comments={sortedComments}
                        onRemove={handleRemoveComment}
                    />
                </div>
            </div>
        </>
    );
};

export default Comments;
