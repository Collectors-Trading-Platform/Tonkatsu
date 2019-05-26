function deleteWorker(wid){
    $.ajax({
        url: '/workers/' + wid,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
