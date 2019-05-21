function filterWorkersByLocation() {
    // get the id of the selected location from the filter dropdown
            var location_id = document.getElementById('locations_filter').value
                // construct the URL and redirect to it
                                window.location = '/workers/filter/' + parseInt(location_id)
}
    
