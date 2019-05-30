function deleteLocation(lid){
    $.ajax({
        url: '/locations/' + lid,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
            console.log("deleted location");
	}
    })
};

