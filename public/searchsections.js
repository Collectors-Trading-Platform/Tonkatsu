function searchSectionByName() {
    //get section name 
              var section_search_string  = document.getElementById('section_search_string').value
    //               //            //        //construct the URL and redirect to it
                                                   window.location = '/sections/search/' + encodeURI(section_search_string)
                                                                                                 }
