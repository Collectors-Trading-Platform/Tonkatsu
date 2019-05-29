function updateWorker(id) {
    var confirmUpdate = confirm("Are you sure you want to update this Worker?");
    if(confirmUpdate){
        
        $.ajax({
            url: '/workers/'+ id,
            type: 'PUT',
            data: $('#update-worker').serialize(),
            success: function(result){
                window.location.replace("./");
                console.log("hello");
            }
        });
    }
};
