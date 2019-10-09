const admin = require("firebase-admin"),
     serviceAccount = require("./music-final-project-e2a3920fdcdd.json");

exports.init = function(){
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://music-final-project.firebaseio.com"
    });
    this.firestore = admin.firestore()
}

exports.addNewUserProfile = function (username, new_profile){
    let profiles_coll = this.firestore.collection("user_profiles")
    profiles_coll.doc(username).set(new_profile).then(r => console.log(r))
}

exports.readUserData = function(username) {
    let user_ref = this.firestore.collection("user_profiles").doc(username);
    return new Promise((resolve, reject) => {
        let myData = {};
        user_ref.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                    resolve(myData)
                } else {
                    console.log('Document data:', doc.data());
                    myData = doc.data();
                    resolve(myData)
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
                reject('Error getting document')
            })
    })
}

exports.readAllUserData = function() {
    let feed_ref = this.firestore.collection("user_profiles");
    return new Promise((resolve, reject) => {
        let myData = [];
        feed_ref.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    console.log(doc.id, '=>',doc.data())
                    myData.push(doc.data());
                });
                resolve(myData)
            })
            .catch(err => {
                console.log('Error getting document', err);
                reject('Error getting document')
            })
    })
}


exports.readFeedData = async function() {
    let feed_ref = this.firestore.collection("top_ten_feed");
    let feed_posts = this.firestore.collection("music_profiles");
    let myData = [];
    feed_list = await feed_ref.get();
    feed_list.forEach(async function(ref) {
        let post = await feed_posts.doc(ref.id).get()
        myData.push(post)
    })
    return myData;
}

exports.getSongData = async function(song_id){
    return await this.firestore.collection("song_data").doc(song_id).get();
}













exports.addMusicToProfile = function (username, song){
    let profiles = this.firestore.collection("music_profiles")
    profiles.doc(username).get().then(function(obj){
        prof = obj.data()
        prof.songs.push(song)
        profiles.doc(username).update(prof)
    })
    let posts = this.firestore.collection("posts")
    posts.add({
        user: username,
        date: song.uploaded,
        itemid: song.itemid
    })
}








// exports.getMostRecentPosts = function (limit){
//     let profiles = this.firestore.collection("music_profiles")
//     let posts = this.firestore.collection("posts")
//     return new Promise((resolve, reject) => {
//         posts.orderBy("date").limit(limit).get().then(function(list){
//             post_list = []
//             list.data().forEach(p => {
//                 profiles.doc(p.user).get().then(function(obj){
//                     prof = obj.data();
//                     song = prof.songs.filter(function(song){
//                         return p.itemid == song.itemid;
//                     })[0];
//                     post_list.push({
//                         user: prof.user,
//                         song: song
//                     });
//                 })
//             })
//             resolve(post_lists)
//         })
//     })
//
// }