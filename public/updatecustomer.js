function updateCustomer(cid){
    $.ajax({
        url: '/customers/' + cid,
        type: 'PUT',
        data: $('#update-customer').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
