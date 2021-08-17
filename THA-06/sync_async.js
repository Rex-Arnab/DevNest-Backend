function multiply(a,b){
    return a*b
}

function square(a){
    return multiply(a,a)
}

function printSquare(n){

    var squared= square(n);
    console.log(squared);
}

printSquare(6);


//TODO: lets know how things are working under the hood 

/*
 * It start main function and reading lines and decides where store wheather this is in the stack or heap
 +----------------------------+
 !           STACK            |
 !----------------------------+
 !       multiply(a,b)        | this function excutes because we know stack is LIFO(last in first out)
 !----------------------------+
 !         square(a)          | it call to multiply(a,a) function // 6*6= 36
 !----------------------------+
 !       printSquare(6)       | it call to square(n) function 
 !----------------------------+
 !           main()           | first main function in added (it calls function  "printSquare()" )
 +----------------------------+

  
  
 +----------------------------+
 !           STACK            |
 !----------------------------+
 !                            |  now stack become empty
 !----------------------------+
 !                            |  now this square function empty  
 !----------------------------+
 !       printSquare(6)       |  the value of that above square function stored in squared  and "console.log(squared);" print // 36
 !----------------------------+
 !           main()           | 
 +----------------------------+

 */
