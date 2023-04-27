import React, { useEffect, useState } from "react";
import "./comments.css";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";

// function CommentBox() {
//   return (

//     <>
//     <div>CommentBox</div>

//     <div className='Comment Box'>

// <div class="antialiased mx-auto max-w-screen-sm">
//   <h3 class="mb-4 text-lg font-semibold text-gray-900">Comments</h3>

//   <div class="space-y-4">

//     <div class="flex">
//       <div class="flex-shrink-0 mr-3">
//         <img class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt=""/>
//       </div>
//       <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
//         <strong>Sarah</strong> <span class="text-xs text-gray-400">3:34 PM</span>
//         <p class="text-sm">
//           Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
//           sed diam nonumy eirmod tempor invidunt ut labore et dolore
//           magna aliquyam erat, sed diam voluptua.
//         </p>
//         <div class="mt-4 flex items-center">
//           <div class="flex -space-x-2 mr-2">
//             <img class="rounded-full w-6 h-6 border border-white" src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" alt=""/>
//             <img class="rounded-full w-6 h-6 border border-white" src="https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" alt=""/>
//           </div>
//           <div class="text-sm text-gray-500 font-semibold">
//             5 Replies
//           </div>
//         </div>
//       </div>
//     </div>

//     <div class="flex">
//       <div class="flex-shrink-0 mr-3">
//         <img class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt=""/>
//       </div>
//       <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
//         <strong>Sarah</strong> <span class="text-xs text-gray-400">3:34 PM</span>
//         <p class="text-sm">
//           Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
//           sed diam nonumy eirmod tempor invidunt ut labore et dolore
//           magna aliquyam erat, sed diam voluptua.
//         </p>

//         <h4 class="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs">Replies</h4>

//         <div class="space-y-4">
//           <div class="flex">
//             <div class="flex-shrink-0 mr-3">
//               <img class="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt=""/>
//             </div>
//             <div class="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
//               <strong>Sarah</strong> <span class="text-xs text-gray-400">3:34 PM</span>
//               <p class="text-xs sm:text-sm">
//                 Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
//                 sed diam nonumy eirmod tempor invidunt ut labore et dolore
//                 magna aliquyam erat, sed diam voluptua.
//               </p>
//             </div>
//           </div>
//           <div class="flex">
//             <div class="flex-shrink-0 mr-3">
//               <img class="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt=""/>
//             </div>
//             <div class="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
//               <strong>Sarah</strong> <span class="text-xs text-gray-400">3:34 PM</span>
//               <p class="text-xs sm:text-sm">
//                 Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
//                 sed diam nonumy eirmod tempor invidunt ut labore et dolore
//                 magna aliquyam erat, sed diam voluptua.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
//     </div>

//     </>
//   )
// }

const CommentReply = ({ reply, formatTimestamp }) => {
  let fomartedTimestamp = formatTimestamp(reply.created_at);
  // let avatarUrl = reply.user.avatar_url == null ? "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1725655669.jpg" : reply.user.avatar_url

  // console.log(avatarUrl)

  return (
    <div id="custom-comment">
      <div id="profile-image-container">
        <img
          src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1725655669.jpg"
          alt="profile_img"
        />
      </div>
      <div id="content-box">
        <div id="project-comment">
          <h6 id="timestamp">{fomartedTimestamp}</h6>
          <p id="comment-content">{reply.message}</p>
        </div>
      </div>
    </div>
  );
};

const Comment = ({ comment, replies, formatTimestamp }) => {
  const token = localStorage.getItem("jwt"); //store token in localStorage
  const userId = localStorage.getItem("userId");

  const [replyContent, setReplyContent] = useState("");

  let commentReplies = replies.filter(
    (rep) => rep.parent_comment_id === comment.id
  );

  const [filteredReplies, setFilteredReplies] = useState(commentReplies);

  const handleReplyingToComment = (value) => {
    let replyObj = {
      comment_id: comment.id,
      user_id: userId,
      message: replyContent,
      created_at: new Date(),
    };

    setFilteredReplies([...filteredReplies, replyObj]);

    commentReplies.push(replyObj);
    console.log(commentReplies);

    let obj = {
      comment_id: comment.id,
      user_id: userId,
      message: replyContent,
    };

    fetch("http://localhost:3000/comments/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(obj),
    }).then((response) => {
      console.log(response.json());
    });

    setReplyContent("");
  };

  let commentRepliesList = filteredReplies.map((reply) => {
    return (
      <CommentReply
        formatTimestamp={formatTimestamp}
        reply={reply}
        key={reply.id}
      />
    );
  });

  let areRepliesAvailable = commentRepliesList.length > 0;

  let fomartedTimestamp = formatTimestamp(comment.created_at);

  let handleReplyToggle = (e) => {
    const replyBox = e.target.nextSibling;
    const replyBoxClass = replyBox.classList;
    const viewMoreTitle = e.target.firstElementChild;
    const viewMoreIcon = e.target.children[1];

    if (replyBoxClass.contains("reply-box-inactive")) {
      replyBoxClass.replace("reply-box-inactive", "reply-box-active");
      viewMoreTitle.textContent = "View less";
      viewMoreIcon.textContent = "expand_less";
    } else if (replyBoxClass.contains("reply-box-active")) {
      replyBoxClass.replace("reply-box-active", "reply-box-inactive");
      viewMoreTitle.textContent = "View all replies";
      viewMoreIcon.textContent = "expand_more";
    }
  };

  const [isReplying, setIsReplying] = useState(false);

  let toggleReplyForm = () => {
    setIsReplying(!isReplying);
  };

  let replyWord = commentRepliesList.length === 1 ? "reply" : "replies";
  // let avatarUrl = comment.user.avatar_url === null ? "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1725655669.jpg" : comment.user.avatar_url

  return (
    <div id="custom-comment">
      <div id="profile-image-container">
        <img
          src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1725655669.jpg"
          alt="profile_img"
        />
      </div>
      <div id="content-box">
        <div id="project-comment">
          <h6 id="timestamp">{fomartedTimestamp}</h6>
          <p id="comment-content">{comment.message}</p>
          <div id="comment-details">
            <div>
              <i className="material-symbols-outlined">favorite</i>
              &nbsp;
              <h6>0</h6>
            </div>
            <div>
              <h6>
                {commentRepliesList.length} {replyWord}
              </h6>
              &nbsp;&nbsp;
              <i className="material-symbols-outlined">chat</i>
            </div>
            <div
              onClick={() => {
                toggleReplyForm();
              }}
            >
              <h6>reply</h6>
              &nbsp;&nbsp;
              <i className="material-symbols-outlined">chat</i>
            </div>
          </div>
        </div>

        {isReplying && (
          <div id="reply-input-box">
            <textarea
              onChange={(e) => {
                setReplyContent(e.target.value);
              }}
              placeholder="what are your thoughts?"
              value={replyContent}
            ></textarea>
            <div id="reply-controls">
              <button
                onClick={() => {
                  toggleReplyForm();
                }}
                id="cancel-btn"
              >
                <i className="material-symbols-outlined">close</i>
              </button>
              <button
                onClick={() => {
                  handleReplyingToComment();
                }}
                id="reply-btn"
              >
                <i className="material-symbols-outlined">send</i>
              </button>
            </div>
          </div>
        )}

        {areRepliesAvailable && (
          <div
            onClick={(e) => {
              handleReplyToggle(e);
            }}
            id="view-more"
          >
            <h6>View all replies</h6>
            <i className="material-icons">expand_more</i>
          </div>
        )}

        <div id="reply-box" className="reply-box-inactive">
          {commentRepliesList}
        </div>
      </div>
    </div>
  );
};

const CommentForm = ({ formatTimestamp }) => {

  const token = localStorage.getItem("jwt"); //store token in localStorage


  const projectId = localStorage.getItem("projectId");
  const userId = localStorage.getItem("userId");

  const [message, setMessage] = useState("");

  let handleCommenting = (message) => {
    setMessage(message);
    console.log(message);
  };

  let handlePosting = () => {
    let commentBox = document.getElementById("comments-box");

    let comment = {
      message: message,
      created_at: new Date(),
    };

    let comment_obj = {
      message: message,
      project_id: projectId,
      user_id: userId,
    };

    fetch("http://localhost:3000/comments/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify(comment_obj),
    }).then((response) => {
      console.log(response.json());
    });

    const newComment = (
      <Comment
        comment={comment}
        formatTimestamp={formatTimestamp}
        replies={[]}
      />
    );

    const newCommentContainer = document.createElement("div");
    newCommentContainer.classList.add("custom-comment");
    ReactDOM.render(newComment, newCommentContainer);

    commentBox.appendChild(newCommentContainer);

    setMessage("");
  };

  return (
    <div id="custom-comment-form">
      <input
        onChange={(e) => {
          handleCommenting(e.target.value);
        }}
        type="text"
        placeholder="Start typing..."
        value={message}
      ></input>
      <button
        onClick={() => {
          handlePosting();
        }}
      >
        <i className="material-icons">rocket_launch</i>
      </button>
    </div>
  );
};

function CommentBox() {

  const project_id = localStorage.getItem("projectId");

  let formatTimestamp = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " yrs ago";
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hrs ago";
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 60) {
      return "1 hour ago";
    } else if (interval === 0) {
      return "just now";
    } else {
      return interval + " mins ago";
    }

    return Math.floor(seconds) + " s ago";
  };

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/comments/project_comments/${project_id}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      });
  }, [project_id]);

  console.log(comments);

  let rootComments = comments.filter(
    (comment) => comment.parent_comment_id === null
  );

  let rootCommentsList = rootComments.map((comment) => {
    return (
      <Comment
        formatTimestamp={formatTimestamp}
        comment={comment}
        key={comment.id}
        replies={comment.replies}
      />
    );
  });
  return (
    <section id="comment-section">
      <div id="comments-box">{rootCommentsList}</div>
      <CommentForm project_id={project_id} formatTimestamp={formatTimestamp} />
    </section>
  );
}

export default CommentBox;
