   $(document).ready(function() {
       $('#fullTable').DataTable( {
           "ajax": 'fullOrders.json'
       } );
   } );
   
   
   $(document).ready(function() {
       $('#userTable').DataTable( {
          "ajax": 'userOrders.json'
      } );
  } );