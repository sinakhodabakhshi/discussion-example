import moment from "moment";

const ActionTypes = {
  addDiscussion: "discussion/add",
  addReplay: "Reply/add",
  like: "like",
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.addDiscussion:
      return [
        {
          id: payload.id,
          date: moment().unix() * 1000,
          user: payload.user,
          text: payload.text,
          likes: 0,
          iLikedIt: false,
          replies: [],
        },
        ...state,
      ];

    case ActionTypes.addReplay:
      const newState = state.map((comment) => {
        if (comment.id === payload.commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: payload.id,
                date: moment().unix() * 1000,
                user: payload.user,
                text: payload.text,
                likes: 0,
                iLikedIt: false,
                replies: [],
              },
            ],
          };
        }
        return comment;
      });

      return [...newState];

    case ActionTypes.like:
      const newStateLike = state.map((comment) => {
        if (payload.isReply) {
          return {
            ...comment,
            replies: [
              ...comment.replies.map((reply) => {
                if (reply.id === payload.id) {
                  return {
                    ...reply,
                    likes: reply.iLikedIt ? reply.likes-- : reply.likes++,
                    iLikedIt: !reply.iLikedIt,
                  };
                }
                return reply;
              }),
            ],
          };
        }

        if (comment.id === payload.id) {
          return {
            ...comment,
            likes: comment.iLikedIt ? comment.likes-- : comment.likes++,
            iLikedIt: !comment.iLikedIt,
          };
        }

        return comment;
      });

      return [...newStateLike];

    default:
      return state;
  }
};

export const AddDiscussion = (text, id, user) => ({
  type: ActionTypes.addDiscussion,
  payload: {
    text,
    id,
    user,
  },
});

export const addReplay = (commentId, text, id, user) => ({
  type: ActionTypes.addReplay,
  payload: {
    commentId,
    text,
    id,
    user,
  },
});

export const like = (id, isReply) => ({
  type: ActionTypes.like,
  payload: {
    id,
    isReply,
  },
});
