function deleteCustomer(cid){
    $.ajax({
        url: '/customers/' + cid,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
            console.log("deleted customer");
	}
    })
};
