function updateLocation(id) {
    var confirmUpdate = confirm("Are you sure you want to update this Location?");
    if(confirmUpdate){
        
        $.ajax({
            url: '/locations/'+ id,
            type: 'PUT',
            data: $('#update-location').serialize(),
            success: function(result){
                window.location.replace("./");
                console.log("hello");
            }
        });
    }
};
