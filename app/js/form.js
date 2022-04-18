var _clicked = 0,
    _data = {},
    _info = {};
var ggAPI = 'https://script.google.com/macros/s/AKfycbxksLG2hIEc43sAkxWLPs-r1cGJm2n6tQpBoPRLmZCKvxZraT3ihDuDEaDYESG51jErRw/exec';

$(document).ready(function () {

    $(".f-number").keypress(function(e){
        if(8!=e.which&&0!=e.which&&(e.which<48||57<e.which)){
            return!1
        }
    });
    // send
    $('.btn_send').on('click', function() {
        console.log('you are here');
        if (_clicked == 0) {
            _clicked = 1;
            var $name = $('input[name="fullname"]').val();
            var $phone = $('input[name="phone"]').val();
            var $email = $('input[name="email"]').val();
            var emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
            var $organizers = $('select[name="organizers"]').val();

            if ($name == '') {
                _clicked = 0;
                Swal.fire({
                    icon: 'error',
                    title: 'Vui lòng điền đầy đủ họ tên',
                    confirmButtonText: 'Đóng',
                    onAfterClose: () => $('input[name="fullname"]').focus()
                }).then((result) => {
                    if (result.isConfirmed) {
                        $('input[name="fullname"]').focus();
                    }
                });
                return false;
            }else if ($phone == '') {
                _clicked = 0;
                Swal.fire({
                    icon: 'error',
                    title: 'Vui lòng điền đầy đủ số điện thoại',
                    confirmButtonText: 'Đóng'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $('input[name="phone"]').focus();
                    }
                });
                return false;
            }else if ($email == '') {
                _clicked = 0;
                Swal.fire({
                    icon: 'error',
                    title: 'Vui lòng điền đầy đủ email',
                    confirmButtonText: 'Đóng'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $('input[name="email"]').focus();
                    }
                });
                return false;
            }else if ($organizers == '') {
                _clicked = 0;
                Swal.fire({
                    icon: 'error',
                    title: 'Vui lòng chọn Đăng ký nhà tổ chức',
                    confirmButtonText: 'Đóng'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $('select[name="organizers"]').focus();
                    }
                });
                return false;
            }else {
                if ($phone != '') {
                    var letters = /[a-zA-Z]/g;
                    if($phone.match(letters))
                    {
                        _clicked = 0;
                        Swal.fire({
                            icon: 'error',
                            title: 'Số điện thoại không đúng định dạng',
                            confirmButtonText: 'Đóng'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                setTimeout(function(){
                                    $('input[name="phone"]').focus();
                                },200)
                            }
                        });
                        return false;
                    }
                }

                if ($email != '') {
                    _clicked = 0;
                    if (!emailRegex.test($email)) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Email không đúng định dạng',
                            confirmButtonText: 'Đóng'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                setTimeout(function(){
                                    $('input[name="email"]').focus();
                                },200)
                            }
                        });
                        return false;
                    }
                }

                $(this).find('.fas').attr('class','loader');
                _info['Họ và Tên'] = $name.trim();
                _info['Số điện thoại'] = $phone.trim();
                _info['email'] = $email.trim();
                _info['Đăng ký nhà tổ chức'] = $organizers;
                _data = $.extend({}, _info);
                
                sendForm(_data);
                $('.loader').addClass('show');
            }

        }
    });
});


function sendForm(_data) {
    $('.btn_send .loader').addClass('show');

    $.ajax({
        url: ggAPI,
        type: "post",
        data: $.param(_data),
        success: function (data) {
            if (data.result == 'success') {
                $('.btn_send .loader').removeClass('show');
                document.getElementById('form-contact').reset();

                Swal.fire({
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    icon: 'success',
                    title: 'Gửi thông tin thành công!',
                    showCloseButton: true,
                    confirmButtonText: 'Đóng'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // window.location.href = "https://expo.vnexpress.net/";
                        Swal.close();
                    }
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Gửi không thành công!'
                })
            }
        }
    });
}
