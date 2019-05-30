function deleteSection(sid){
    $.ajax({
        url: '/sections/' + sid,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
            console.log("deleted section");
	}
    })
};

