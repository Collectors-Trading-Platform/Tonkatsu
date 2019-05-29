function updateSection(id) {
    var confirmUpdate = confirm("Are you sure you want to update this Section?");
    if(confirmUpdate){
        
        $.ajax({
            url: '/sections/'+ id,
            type: 'PUT',
            data: $('#update-section').serialize(),
            success: function(result){
                window.location.replace("./");
                console.log("hello");
            }
        });
    }
};
