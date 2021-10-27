window.onload = function() {
    var selItem = sessionStorage.getItem("SelItem");  
    $('#sort-item').val(selItem);
    }
    $('#perPage').change(function() { 
        var selVal = $(this).val();
        sessionStorage.setItem("SelItem", selVal);
    });