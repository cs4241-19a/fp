$(function () {
    $('#register').on('click', function () {
        let __email = $('#email').val();
        console.log('email: ', __email);
        $.ajax({
            type: 'POST',
            url: '/forum/emailCheck.json',
            data: { email: __email },
            success: function(res) {
                let __code = res.code;
                let __msg = res.msg;
                console.log('code: ', __code);
                if (0 != __code) {
                    $('#error-tip').html(__msg);
                } else {
                    let __html = '';
                    __html += '<div class="panel panel-success">';
                    __html += '<div class="panel-heading">Email is valid</div>';
                    __html += '<div class="panel-body">';
                    __html += '<h1 class="text-success">' + res.title + '</h1>';
                    __html += res.info;
                    __html += '</div></div>';
                    $('#register-panel').html(__html);
                }
                console.log('success status: ', res);
            },
            error: function(err) {
                console.log(err.status);
            }
        });
    });
});