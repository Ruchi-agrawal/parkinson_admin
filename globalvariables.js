let type = 'pro';
const baseURl = type == 'dev' ? 'http://localhost:5000' : 'https://commit2care4pd.com';
const apiUrl = `${baseURl}/node/api`
var urls = {
    apiurl: `${apiUrl}/`,
    loginUser: `${apiUrl}/user/loginUser`,
    getPosts: `${apiUrl}/posts/get_all_post`,
    getActivePosts: `${apiUrl}/posts/get_active_post`,
    handlePostStatus: `${apiUrl}/posts/handle_post_status`,
    deletePost: `${apiUrl}/posts/delete_post`,
    checkUser: `${apiUrl}/user/check_user_status`,
    handleUser: `${apiUrl}/user/handle_user`
};
export default { urls, baseURl };

