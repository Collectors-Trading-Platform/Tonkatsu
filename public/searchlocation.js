function searchLocationByCity() {
    //get city 
           var city_search_string  = document.getElementById('city_search_string').value
    //            //        //construct the URL and redirect to it
                                window.location = '/locations/search/' + encodeURI(city_search_string)
                                              }
