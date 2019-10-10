$(function(){
    $('#comment-publish-btn').on('click', function(){
        let __commentInfo = $('#commentForm').serialize();
        console.log('publish comment: ', __commentInfo);
        $.ajax({
            type: 'POST',
            url: '/forum/comment/publish.json',
            data: __commentInfo,
            success: function(res) {
                console.log(res);
                if (res.code == 200) {
                    $.toast({
                        heading: 'Successfully',
                        text: res.msg,
                        icon: 'success',
                        showHideTransition: 'slide'        // Change it to false to disable loader
                    });
                    setTimeout(function(){
                        window.location.reload();
                    }, 4000);
                } else {
                    $.toast({
                        heading: 'Error',
                        text: res.msg,
                        icon: 'error',
                        showHideTransition: 'fade'        // Change it to false to disable loader
                    });
                }
            },
            error: function(err) {
                console.log(err.status);
            }
        });
        
    });
    // $("html,body").animate({scrollTop: $("#post-panel").offset().top}, 1000);
});