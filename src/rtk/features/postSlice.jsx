import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllPosts = createAsyncThunk("post/getAllPosts", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/v1/posts", { withCredentials: true })
    return data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})


export const getUserPosts = createAsyncThunk("post/getUserPosts", async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/v1/users/${id}/posts`, { withCredentials: true })
    return data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})


export const createPost = createAsyncThunk("post/createPost", async (post, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("content", post.content);
    if (post.image) {
      formData.append("image", post.image);
    }
    const { data } = await axios.post("http://localhost:3000/api/v1/posts", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // const { data } = await axios.post("http://localhost:3000/api/v1/posts", { content: post }, { withCredentials: true })
    return data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const likePost = createAsyncThunk("post/likePost", async (postId, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/likes",
      { post: postId },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: 'Network error occurred' });
  }
});

export const unlikePost = createAsyncThunk("post/unlikePost", async (postId, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:3000/api/v1/likes/${postId}`,
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: "Network error occurred" });
  }
});

export const deletePost = createAsyncThunk("post/deletePost", async (postId, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:3000/api/v1/posts/${postId}`,
      { withCredentials: true }
    );
    return { ...data, postId };
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: "Network error occurred" });
  }
});

export const createComment = createAsyncThunk("post/createComment", async ({ postId, content }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/comments",
      { post: postId, content },
      { withCredentials: true }
    )
    return data
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: 'Network error occurred' });

  }
})


export const getUserProfile = createAsyncThunk("user/profile", async ({ id, role }, { rejectWithValue }) => {
  try {
    role = role.toLowerCase() + "s"
    const { data } = await axios.get(`http://localhost:3000/api/v1/${role}/${id}`, { withCredentials: true });
    return data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }

})


const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    userPosts: [],
    status: "",
    message: "",
    loading: false,
    errors: "",
    commentLoading: false,
    commentStatus: "",
    commentMessage: "",
    likeLoading: false,
    likeStatus: "",
    likeMessage: "",
    likeError: "",
    deleteLoading: false,
    deleteStatus: "",
    deleteMessage: "",
    deleteError: "",
    userProfile: null
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload.data
      state.status = action.payload.status
    })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.userPosts = action.payload.data
        state.status = action.payload.status
      })
      .addCase(createPost.pending, (state, action) => {
        state.loading = true
      })



      .addCase(createComment.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.commentStatus = action.payload.status
        state.commentMessage = action.payload.message
        state.loading = false


        if (action.payload.data && action.payload.data.postId) {
          const postIndex = state.posts.findIndex(post => post.id === action.payload.data.postId);
          if (postIndex !== -1 && state.posts[postIndex].comments) {
            state.posts[postIndex].comments.push(action.payload.data);
          }
        }
      })
      // ==============
      .addCase(likePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        state.likeStatus = action.payload.status;
        state.likeMessage = action.payload.message;

        const likedPostId = action.payload?.data?.postId;
        const userId = action.payload?.data?.user;

        if (likedPostId && userId) {
          const postIndex = state.posts.findIndex((post) => post._id === likedPostId);
          if (postIndex !== -1) {
            const post = state.posts[postIndex];
            if (!post.reactions?.likes) post.reactions.likes = [];
            post.reactions.likes.push({ user: userId });
          }
        }
      })

      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.likeError = action.payload?.message || "Something went wrong";
      })

      // ===============
      .addCase(unlikePost.fulfilled, (state, action) => {
        state.loading = false;
        state.likeStatus = action.payload.status;
        state.likeMessage = action.payload.message;

        const unlikedPostId = action.payload?.data?.postId;
        const userId = action.payload?.data?.user;

        if (unlikedPostId && userId) {
          const postIndex = state.posts.findIndex((post) => post._id === unlikedPostId);
          if (postIndex !== -1) {
            const post = state.posts[postIndex];
            if (post.reactions?.likes) {
              post.reactions.likes = post.reactions.likes.filter((like) => like.user !== userId);
            }
          }
        }
      })

      .addCase(unlikePost.pending, (state) => {
        state.loading = true;
      })
      //   ==========
      .addCase(deletePost.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.deleteStatus = action.payload.status;
        state.deleteMessage = action.payload.message;

        state.posts = state.posts.filter(post => post._id !== action.payload.postId);

        state.userPosts = state.userPosts.filter(post => post._id !== action.payload.postId);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload?.message || "Failed to delete post";
      })




      .addCase(createPost.fulfilled, (state, action) => {
        state.status = action.payload.status
        state.message = action.payload.message
        state.loading = false
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = true
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = action.payload.status
        state.userProfile = action.payload.data
        state.loading = false
      })
  }
})

export default postSlice.reducer