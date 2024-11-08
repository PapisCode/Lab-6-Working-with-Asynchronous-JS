function fetchProfile() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {  
                resolve({ id: 1, name: "The Joker" });
            } else {  
                reject("Unable to fetch profile, try again");
            }
        }, 1000);  
    });
}

function fetchPosts() {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            if (Math.random() > 0.2) {  
                resolve([{ id: 1, content: "Post 2" }, { id: 2, content: "Post 2" }]);
            } else {  
                reject("Error! Unable to fetch posts");
            }
        }, 1000);

    });
}


function fetchComments() {
    return new Promise((resolve, reject) => {


        setTimeout(() => {
            if (Math.random() > 0.2) {  
                resolve([{ commentId: 1, text: " Warning, post subject for further investigation " }, { commentId: 2, text: " Post under investigation " }]);
            } else {  
                reject("Error occured while fetching the commenst");
        
            }
        }, 1000);
    });
}

function fetchDataSequentially() {
    fetchProfile()
        .then(profile => {
            console.log("Profile fetched:", profile);
            return fetchPosts();
        })
        .then(posts => {
            console.log(" Profile Posts fetched:", posts);
            return fetchComments();
        })
        .then(comments => {
            console.log(" Post Comments fetched:", comments);
        })
        .catch(error => console.error("Error occurred while fetching :", error));
}

function fetchDataInParallel() {
    Promise.all([fetchProfile(), fetchPosts(), fetchComments()])
        .then(([profile, posts, comments]) => {
            console.log("User profile:", profile);
            console.log("Posts:", posts);
            console.log("Comments:", comments);
        })
        .catch(error => console.error("Unable to fetch multiple :", error));
}


async function fetchDataSequentiallyAsync() {
    try {
        const profile = await fetchProfile();
        console.log("User profile retrieved:", profile);
        const posts = await fetchPosts();
        console.log("Posts retrieved:", posts);
        const comments = await fetchComments();
        console.log("Comments retrieved:", comments);
    } catch (error) {
        console.error("Error! unable to run async:", error);
    }
}

async function fetchDataInParallelAsync() {
    try {
        console.log("Starting parallel fetch...");

        
        const [profile, posts, comments] = await Promise.all([
            fetchProfile(),
            fetchPosts(),
            fetchComments()
        ]);

       
        console.log("User profile retrieved:", profile);
        console.log("Posts retrieved:", posts);
        console.log("Comments retrieved:", comments);

    } catch (error) {

        console.error("Error! Unable to run parallel:", error);
    }
}

async function getUserContent() {
    try {
        const profile = await fetchProfile();
        console.log("User profile retrieved:", profile);

        const posts = await fetchPosts();
        console.log("Posts retrieved:", posts);

        const comments = await fetchComments();
        console.log("Comments retrieved:", comments);

        console.log("All data fetched successfully:", { profile, posts, comments });
    } catch (error) {
        console.error("Error! unable to get user profile:", error);
    }
}

fetchDataSequentially();
fetchDataInParallel();
fetchDataSequentiallyAsync();
fetchDataInParallelAsync();
getUserContent();



