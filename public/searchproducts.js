function searchProductsByName() {
    //get pname
             var products_search_string  = document.getElementById('products_search_string').value
    //               //            //        //construct the URL and redirect to it
                                                   window.location = '/products/search/' + encodeURI(products_search_string)
                                                              }