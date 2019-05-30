function deleteCustomerProduct(cpid){
    $.ajax({
        url: '/customersproducts/' + cpid,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
            console.log("deleted customer product");
	}
    })
};
