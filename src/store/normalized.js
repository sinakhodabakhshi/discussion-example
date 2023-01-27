import init from "../context/initData";

let CommentsNormalizedData = {
  entities: {},
  ids: [],
};
init.forEach((comment) => {
  CommentsNormalizedData.entities = {
    ...CommentsNormalizedData.entities,
    [comment.id]: {
      ...comment,
      replies: [...comment.replies.map(reply => reply.id)]
    },
  };

  CommentsNormalizedData.ids.push(comment.id);
});

let Repleis = {};

init.forEach((comment) => {
  if (comment.replies.length !== 0) {
    comment.replies.forEach((reply) => {
      Repleis = {
        ...Repleis,
        [reply.id]: reply,
      };
    });
  }
});

const initialData = {
  ...CommentsNormalizedData,
  replies: Repleis,
};

export default initialData;
