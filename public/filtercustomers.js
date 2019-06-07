function filterCustomersByHometown() {
    // get the id of the selected location from the filter dropdown
                     var hometown_id = document.getElementById('hometown_filter').value
    //                                                  // construct the URL and redirect to it
                                                                                                                                                                                 window.location = '/customers/filter/' + parseInt(hometown_id)
    
                                                                                                                                                                                                                                               }
