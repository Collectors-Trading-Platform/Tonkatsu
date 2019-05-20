function deleteCustomer(id){
    $.ajax({
        url: '/workers' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
