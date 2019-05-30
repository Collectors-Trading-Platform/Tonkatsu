function deleteProduct(pid){
    $.ajax({
        url: '/products/' + pid,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
            console.log("deleted product");
	}
    })
};

