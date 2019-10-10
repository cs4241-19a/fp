var ue = UE.getEditor('editor');
$(function() {
    $('#publish-btn').on('click', function(){
        let __info = $('#postForm').serialize();
        console.log(__info);
        $.ajax({
            type: 'POST',
            url: '/forum//backend/post/save.json',
            data: __info,
            success: function(res) {
                console.log('result: ', res);
                let __html = '';
                if (res.code == 200) {
                    __html += '<h2 class="text-success"><span class="glyphicon glyphicon-ok"></span>';
                    __html += ' Post has been published successfully</h2>';
                } else {
                    __html += '<h2 class="text-danger"><span class="glyphicon glyphicon-remove"></span>';
                    __html += ' Fail to publish post!<h2>';
                }
                $('#post-panel').html(__html);
                setTimeout(function(){
                    window.location.replace("/backend/post/list.html");
                }, 3000);
            },
            error: function(err) {
                console.log(err.status);
            }
        });
    });
});