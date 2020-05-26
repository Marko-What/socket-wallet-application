Observations explanation 



Typescript strict compilation is specified inside tsconfig.json file at line 26
with following 
 "strict": true,     /* Enable all strict type-checking options. */
parameter value.

Interacting with api could be done using some browser extension or other program executing requests to api.

Do not forget to declare http header
            Content-type:application/json 
otherwise data could not be passed through.


As data model is decoupled from business part of an application application with "dmodal" module, application is more modular.

Input validation is done using joi nodejs module. Parameters could be redefined based on the application context.
As mentioned that there is no need of implementing authentication/authorization functionality there is no logging, requests are executed with playerId value. Could also be done if necessary.


As it was mentioned that pg-promise for db client instead of a query builder is a plus, I used that.
You can clearly understand that I know sql language as well.

Cause of I was developing an application on a localhost maschine I was not using github repository but will execute few commits with comments in order so that will be understandable that I know how to use it.

Transaction concurrency is done using transaction isolation technique with the following sql statement
        begin isolation level serializable sql statement.
   
      

GET /history:
Possible improvements include paging arguments in the request 

  Paginator functionality is in place where first parameter is a reference to playerId and second for a page.
  Url relative path with parameters to a resource looks like
    
        playerId = 19, page = 1

    /history/19/1



On the other hand there is a socket version also completed. As it was mentioned that player balance must be correct at all the time could be true as the data exist inside a database and could not be accessed during the process of making a transaction.
Executing a request throughout socket connection making transaction, all the sockets are notified about new value.
This could be the state of playerId balances but there needs to be some improvements done, cases like there are more than one instance of an application running concurrently. In that case whenever server-socket notify all the clients about new playerId value, concurrent application instances does not get the new value notification. Following issue could be solved simply just be implementing additional functionality and setting up nodejs echo server which could notify all the concurrent running instances about new value.



As I was in a hurry I skipped integration tests, decimals and echo player state functionality for concurrent running applications. Could be done also after negotiating for the job.
