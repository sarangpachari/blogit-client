
import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverURL";

//REGISTER API
export const registerAPI = async (reqBody) => {
  return await commonAPI(
    "POST",
    `${SERVER_BASE_URL}/api/auth/register`,
    reqBody
  );
};

//LOGIN API
export const loginAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_BASE_URL}/api/auth/login`, reqBody);
};

//CREATE POST API
export const createPostAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${SERVER_BASE_URL}/api/posts/editor/new`,
    reqBody,
    reqHeader
  );
};

//GET USER POSTS
export const getUserPostsAPI = async (reqHeader) => {
  return await commonAPI("GET",`${SERVER_BASE_URL}/api/posts/dashboard`,{}, reqHeader);
}

//GET ALL POSTS API
export const getAllPostsAPI = async()=>{
  return await commonAPI("GET",`${SERVER_BASE_URL}/api/posts/`)
}

//DELETE SINGLE POST API
export const deletePostAPI = async(id,reqHeader)=>{
  return await commonAPI("DELETE", `${SERVER_BASE_URL}/api/posts/${id}/remove`,{},reqHeader)
}

//EDIT POST API
export const editPostAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI("PUT", `${SERVER_BASE_URL}/api/posts/editor/${id}`,reqBody, reqHeader)
}

//LIKE POST API
export const likePostAPI = async (id,reqHeader)=>{
  return await commonAPI("PUT", `${SERVER_BASE_URL}/api/posts/${id}/like`,{},reqHeader)
}

//UNLIKE POST API
export const unlikePostAPI = async(id,reqHeader)=>{
  return await commonAPI("PUT", `${SERVER_BASE_URL}/api/posts/${id}/unlike`,{},reqHeader)
}

//COMMENT POST API
export const commentPostAPI = async (id,reqBody,reqHeader)=>{
  return await commonAPI("POST",`${SERVER_BASE_URL}/api/posts/postView/${id}/comment`,reqBody,reqHeader)
}

//GET A POST COMMENT API
export const getPostCommentAPI = async (id,reqHeader)=>{
  return await commonAPI("GET",`${SERVER_BASE_URL}/api/posts/postView/${id}/comment`,{},reqHeader)
}

//GET A POST DETAILS API
export const getPostDetailsAPI = async (id,reqHeader)=>{
  return await commonAPI("GET",`${SERVER_BASE_URL}/api/posts/postView/${id}`,{},reqHeader)
}

