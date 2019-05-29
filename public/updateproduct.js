function updateProduct(id) {
    var confirmUpdate = confirm("Are you sure you want to update this Product?");
    if(confirmUpdate){
        
        $.ajax({
            url: '/products/'+ id,
            type: 'PUT',
            data: $('#update-product').serialize(),
            success: function(result){
                window.location.replace("./");
                console.log("hello");
            }
        });
    }
};
