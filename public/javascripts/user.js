$(function () {
    $('#pwd-modify-btn').on('click', function () {
        let __password1 = $('#password1').val();
        let __password2 = $('#password2').val();
        let __id = $('#userId').val();
        if (__password1 != __password2) {
            $('#error-tips').html('Please confirm twice input is same!')
            
        } else {
            $.ajax({
                type: 'POST',
                url: '/forum/backend/user/password/modify.json',
                data: { _id: __id, password: __password1 },
                success: function(res) {
                    let __html = '';
                    __html += '<h3 class="text-success"><span class="glyphicon glyphicon-ok"></span>';
                    __html += ' Password modify Successfully!';
                    __html += '<a href="/backend/user/password.html" class="text-warning">';
                    __html += ' <span class="glyphicon glyphicon-hand-left" title="go back"></span></a>'
                    __html += '</h3>';
                    $('#info-panel').html(__html);
                },
                error: function(err) {
                    console.log(err.status);
                }
            });
        }
    });
});